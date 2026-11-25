# Yarg Pico Command-line Simulator

A simple Yarg on Raspberry Pi Pico simulator, built on top of the [rp2040js](https://github.com/wokwi/rp2040js) library.

You can use this simulator to run the release firmware of Yarg on your computer, even if you don't have access to the physical hardware.

If you are looking for upstream, please check out:

 -  [Wokwi](https://wokwi.com): The underlying Simulator. Supports many MCUs and Languages
 - [Yarg-Lang](https://yarg-lang.dev): The Yarg Language, a dynamic programming language for microcontroller firmware.

## Usage

You'll need [Node.js](https://nodejs.org/en/download/) and npm (which comes bundled with Node.js). Clone this repo, and then:

```
npm install
npm start
```

To run the simulator. You should see output similar to this:

```
> rp2040js-yarg@1.0.0 start
> node src/index.js

Starting Yarg Pico simulator. Press Ctrl+X then Enter to exit.
GDB server listening on TCP port 3333
yarg>
```

Use "Ctrl+X", then Enter to exit from the simulator.

### Alternative images

Supply an alternative Yarg image:

```
npm start -- --image relative/path/to/a/image.uf2
```

## GDB Server

The simulator listens for GDB connections on port 3333. Use the following command to connect the GDB debugger to the simulator:

```
target remote localhost:3333
```

You can change the port number by setting the `GDB_PORT` environment variable.

This is untested in yarg.
