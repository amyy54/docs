# Ocarina of Time: Randomizer Development

Ocarina of Time Randomizer is a rom hack of regular Ocarina of Time, which
involves utilizing a combination of C and Python to place items randomly
throughout the world. The main repository being used for development is managed
by the [OoTRandomizer](https://github.com/OoTRandomizer/OoT-Randomizer) team.

## Compiling

The project is split into two unique parts: the C code and the Python code.

### Compiling Assembly and C on macOS

Getting the N64 development tools is required, see
[Building N64 Development Tools for macOS](n64.md) for more details on obtaining
the tools.

An [assembly program](https://github.com/Kingcom/armips) for MIPS is also
required for the assembly code. The build instructions work completely fine on
macOS, just make sure CMake is installed (brew).

A base uncompressed rom is required to compile the assembly and C code. A
decompressor program is included in the repository at `bin/Decompress`. After
decompressing the rom, put it at `ASM/roms/base.z64`.

Once all of this is configured, run `python3 ASM/build.py --compile-c`.

### Running Python on macOS

Everything works as described in the README, minus the GUI. As of writing, the
GUI requires electron version 7.3.3. This version does not have a proper release
for Apple Silicon, meaning during the setup process it cannot find an electron
version for 7.3.3 built for `darwin-arm64`. It is still possible to get the GUI
working in macOS on Apple Silicon under Rosetta 2 by specifying `--arch=x64`.
For version 7.3.3, the command would be `npm i --arch=x64  electron@7.3.3`.
Outside of this, everything else installs correctly by simply using
`npm install`.

This does mean the standard GUI application will run under Rosetta 2, but
running the server by running server.js in `GUI/webTest` will still work. Note
that the GUI will need to be launched at least once before running the server.
