# LiveSplit on macOS and Linux with Wine

Archive from Pastebin. LiveSplit, despite being built with .NET, which is cross
platform, it still requires Windows to normally work. However, using Wine, it’s
possible to get it working on other operating systems.

To my knowledge the only things that will 100% not work are autosplitters or
anything that has to read game memory. Windows is so dramatically different
memory-wise compared to macOS or Linux that the basic compatibility Wine
provides won’t be enough.

## macOS

Firstly, install [brew](https://brew.sh/). Copy the install line and paste that
into the terminal.

Then the following commands should be typed in the terminal in order:

- `brew install winetricks`
- `sudo rm -rf ~/.wine` (Note: This might fail if the directory doesn’t exist.
  It’s fine, the reason for doing this is to make sure the directory does not
  exist.)
- `WINEARCH=win32 winetricks dotnet461` (Note: Multiple windows will be created
  that ask the user to accept Microsoft licenses and install. Agree to the terms
  and follow the prompts, but when asked to restart select “restart later.”)
- `winetricks corefonts`
- `winetricks gdiplus`

Once everything is finished, download
[LiveSplit](https://livesplit.org/downloads/) and unzip the files. Then, still
in the terminal, type `wine LiveSplit.exe` (make sure you are in the folder
containing the LiveSplit executable. You can get there with the `cd` command
(google is your friend)).

## Linux

Platforms Tested: - Ubuntu 20.04 LTS (apt) - Arch (pacman)

According to a friend, using `dotnet45` instead of `dotnet461` for the install
works perfectly fine. They were on Arch. On Ubuntu I could not get it working
without using `dotnet461`, which makes logical sense because .NET 4.6.1 is the
most recent version LiveSplit is using. Didn’t test this on my install of Arch,
should do eventually.

Download and install `winetricks` with whatever package manager your
distribution uses (apt, pacman, etc). After that, the steps are identical to the
macOS setup:

- `sudo rm -rf ~/.wine` (Note: This might fail if the directory doesn’t exist.
  It’s fine, the reason for doing this is to make sure the directory does not
  exist.)
- `WINEARCH=win32 winetricks dotnet461` (Note: Multiple windows will be created
  that ask the user to accept Microsoft licenses and install. Agree to the terms
  and follow the prompts, but when asked to restart select “restart later.”)
- `winetricks corefonts`
- `winetricks gdiplus`

Once everything is finished, download
[LiveSplit](https://livesplit.org/downloads/) and unzip the files. Then, still
in the terminal, type `wine LiveSplit.exe`.
