const { RP2040, ConsoleLogger, LogLevel, USBCDC, Simulator } = require('rp2040js');
const { loadUF2 } = require('./load-uf2');
const { bootromB1 } = require('./bootrom');
const { GDBTCPServer } = require('rp2040js/gdb-tcp-server');

const simulator = new Simulator();
const mcu = simulator.rp2040;
mcu.loadBootrom(bootromB1);
mcu.logger = new ConsoleLogger(LogLevel.Error);
loadUF2('firmware/yarg-lang-pico-v0.5.0.uf2', mcu);

const cdc = new USBCDC(mcu.usbCtrl);
cdc.onSerialData = (value) => {
  process.stdout.write(value);
};

// Yarg's current repl doesn't like raw mode, so we leave it commented out.
//process.stdin.setRawMode(true);

process.stdin.on('data', (chunk) => {
  // 24 is Ctrl+X
  if (chunk[0] === 24) {
    process.exit(0);
  }
  for (const byte of chunk) {
    cdc.sendSerialByte(byte);
  }
});

// The following patch skips the 1 second boot delay, but we always start in safe mode:
mcu.sramView.setUint32(0x40000, 0xad0005af, true);

// Configure GDB
const gdbServer = new GDBTCPServer(mcu, process.env.GDB_PORT || 3333);

console.log('Starting Yarg Pico simulator. Press Ctrl+X then Enter to exit.');
console.log(`GDB server listening on TCP port ${gdbServer.port}`);
mcu.core.PC = 0x10000000;
simulator.execute();
