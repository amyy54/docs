# Nintendo 64/Wii Development Toolchains

This guide follows the rough installation steps of both the Nintendo 64
toolchain and the Wii toolchain on macOS. The initial purpose of obtaining these
tools was for compiling the Ocarina of Time Practice ROM, known as GZ, however
these tools will work for any N64/Wii project, including N64 romhacks, Wii
homebrew tools, etc.

It's important to note that brew formulas exist for both of these toolchains.
The formulas will require compiling the binaries yourself, including building
GCC, but this process isn't too long, and homebrew integration makes it much
easier to handle pathing and whatnot. The purpose of this guide is to walk
through the manual installation process, issues encountered, and showcase some
oddities of macOS.

- **The brew formula for the N64 toolchain is `ootrandomizer/tap/n64`, pulling
  from [glankk/n64](https://github.com/glankk/n64)
  ([n64.rb](https://github.com/OoTRandomizer/homebrew-tap/blob/main/Formula/n64.rb))**
- **The brew formula for the Wii toolchain is `amyy54/taps/wii`, pulling from
  [amyy54/wii-toolchain](https://github.com/amyy54/wii-toolchain)
  ([wii.rb](https://github.com/amyy54/homebrew-taps/blob/main/wii.rb))**

Both of these installs require the `--HEAD` flag, as no release numbering
exists. The Wii toolchain will likely never change and just includes
instructions for building GCC and some standard libraries, but the N64 toolchain
still sees active work and may update in the future. Ultimately though, as the
N64 toolchain development is not given release numbers, assigning versions to
brew packages becomes a lot more work.

## Building N64 Development Tools

On macOS, the only native compiler included with Xcode development tools is
`clang`. While macOS will pretend to have GCC, as `/usr/bin/gcc` does exist as a
valid path, that GCC simply links to `clang`, and only exists for backwards
compatibility reasons. As such, when building the N64 tools, I've found that
actual GCC works far better and is less fussy than clang. As such, the very
first step will be to install `gcc`, and ensure `gcc` and `g++` have path
priority to the links provided by Apple.

While you're installing `gcc`, I also generally recommend `gmake` instead of
Apple's included `make`, as most developers for this software are targeting
Linux first, and thus are more likely to be using GNU make instead of anything
more BSD-like that Apple provides. The N64 installation process also recommends
having `gnu-sed` have path priority instead of Apple's own `sed`, as, like with
`make`, there are incompatibility issues between GNU software and the BSD-like
software Apple ships with. Brew installs `gnu-sed` as `gsed`, so make sure it's
located in path as `sed` for scripting reasons.

There is also a laundry list of dependencies that need to be installed as well
to build it. the `install_deps` script in the repository does work, but I prefer
manual installations. Either way, the following dependencies are as such:
`diffutils gcc gmp gnu-sed jansson libusb lua make texinfo wget zlib`. Brew can
locate all the packages with the names provided.

Finally, with the path configured appropriately to reference `sed` and `gcc`,
there's one more thing we need to do. Several preprocessor flags need to be set
for installation to work, notably we need to add brew's include and library
folders so that the compiler can locate them (otherwise it will only search
Apple's SDK, which doesn't include what we've installed), and we need to add
some flags to reference how `lua` and `libusb` is imported. Either set the
following `CPPFLAGS` when running `./configure`, or add it as an environment
variable:

- `-I/opt/homebrew/include -L/opt/homebrew/lib` - Adds homebrew headers and
  libraries to path so the dependencies we've downloaded will actually be found
- `-DHAVE_LUA5_4_LUA_H -llua5.4` - Defines how lua exists in brew's path
- `-DHAVE_LIBUSB_1_0_LIBUSB_H -lusb-1.0` - Same thing with `lua`, just defines
  how `libusb` exists in brew's path

To repeat, the checklist of what needs to be done before continuing:

- `gcc` and `g++`, **not clang**, exists in path
- `gsed` or `gnu-sed` is simply referred to as `sed` in path and has priority
  over `/usr/bin/sed`
- The necessary dependencies have been downloaded with brew
- The `CPPFLAGS` above have been set either through environment variables or
  through `./configure`

After all this is set up, the documented installation process in the README can
be continued. `./configure` includes the `--prefix` flag, which defines where
all the tools will be installed. On macOS this can be something like
`~/.local/bin`, but I prefer just creating a folder called `out` in the
repository folder and doing the installation there. Either way, run configure,
then `gmake toolchain-all && gmake toolchain-install`, `gmake && gmake install`,
and `gmake install-sys`. It should all go off without a hitch, at which point
all the necessary files will be in `<prefix>/bin`.

## Building Wii Development Tools

To preface, "development tools" might be pushing it. This repository will
install GCC targeting the PowerPC architecture the Nintendo Gamecube/Wii used,
and some standard library stuff to make that GCC install useful. Other
development tools are not covered, this section is basically only concerned with
getting a functional GCC up and running to compile targeting a Wii.

Unlike the N64 section, I found that in my experience using clang to compile GCC
is perfectly serviceable, and has better support on macOS than using GCC to
compile GCC. Why this is I'm not entirely sure, but it likely has to do with the
standard library macOS provides, which, at least on my machine running macOS
Tahoe on M1, fails to include the necessary libraries for GCC to compile GCC.
But it does have enough to compile GCC with clang. So, if coming from the N64
section, remove `gcc` from path. Do note that `/usr/bin/gcc` is `clang`, so if
that is the result of `which gcc`, it can be left there.

If using [amyy54/wii-toolchain](https://github.com/amyy54/wii-toolchain), then
everything else is set up already. Just run `./configure` with the desired
installation path set with `--prefix`, and it should just work. However, this
repository is a fork containing modifications I made to the original scripts by
[krimtonz](https://github.com/krimtonz/wii-toolchain), so the rest of this guide
will walk through the changes made to *that* repository.

Before doing anything, edit the `Makefile` to add `--with-system-zlib` to all
`./configure` lines contained within it. I could never get `zlib` to compile
nicely, as macOS seemed to regularly complain about redundant function creation
that I could never find a good solution for. Using the system `zlib` doesn't
cause issues anyway.

During this setup, brew is useless. Any dependency added through brew will not
help us as any attempt clang will make to reference from brew headers will fail.
As such, the three dependencies GCC requires: GMP, MPFR, and MPC all have to be
compiled with GCC itself. Without modifying the `Makefile` or configure scripts,
this is really annoying (I would highly recommend just using
[amyy54/wii-toolchain](https://github.com/amyy54/wii-toolchain)), so the steps I
took when debugging was interrupting `gmake` when GCC failed, going into the
`gcc/` folder, and downloading the source code for the three requirements. They
have to be stored in folders of their name, so `gcc/<gmp,mpfr,mpc>/configure`
has to be a valid path. Do not include the version number in the folder name.
Once those are added back, GCC will detect them and compile them with no issue.

Adding those dependencies is the main issue, but a lot of minor problems will
show up when trying to compile `newlib`. A lot of these have to do with weird
function definitions in `libgloss/rs6000` that seem to never get resolved, and
these I chose to just tackle as they appeared one by one. I'm unsure how much
this part of the codebase is even interacted with during regular usage, so
modifications were solely made just to make the compiler happy. The changes are
self-explanatory, usually just adding an include line when it tries to resolve
implicitly, and creating function definitions when there weren't any it could
find. The patch is shown and can be applied in
[amyy54/wii-toolchain/newlib.diff](https://github.com/amyy54/wii-toolchain/blob/master/newlib.diff),
but fixing everything by hand also isn't much work.
