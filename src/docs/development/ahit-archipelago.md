publish_date: 2026-06-01
standard_site: at://did:plc:ly7i5volax46sx4dnix3rbhs/site.standard.document/3mnbrxpk57q2h

# A Hat in Time Archipelago on macOS With CrossOver

The Hat in Time build for macOS has not been updated in forever, and is
massively out of date with the Windows version of the game. While the game runs
well in CrossOver with little issue, getting a mod like the Archipelago mod
working requires a bit of tinkering. The archipelago mod requires a different
build of Hat in Time and integrates through a network connection, which
CrossOver can muddy if Steam is connected. Why this happens I'm still unsure,
but disconnecting Steam from the process entirely makes the mod work perfectly
(as perfect as games can run in CrossOver to begin with).

Everything is run within the "Steam" prebuilt bottle in CrossOver.

## Download Workshop Mod and `tcplink`

First, launch the CrossOver steam installation with the console active. The best
way to do this is to "Run with options" and add `-console` to the command-line
options. From here, the `tcplink` depot needs to be downloaded. While it could
be downloaded with the Steam install (i.e., going to game properties and "Game
Versions and Betas"), though this would override the existing install.

Through the console, run the command below. All IDs were taken from the
[steamdb](https://steamdb.info/app/253230/depots/?branch=tcplink) page.

`download_depot 253230 253232 363046749924510332`

- `253230` - Application ID for "A Hat in Time"

- `253232` - Depot ID for the Windows build

- `363046749924510332` - Most recent manifest on the `tcplink` branch

While this is downloading, navigate to the workshop and subscribe + download the
[Archipelago mod](https://steamcommunity.com/sharedfiles/filedetails/?id=3026842601)
on the workshop. The mod will download to
`C:\Program Files (x86)\Steam\steamapps\workshop\content\253230\3026842601`.

When the download is finished, the files will be downloaded to
`C:\Program Files (x86)\Steam\steamapps\content\app_253230/depot_253232`. To
make it easier to find, I would recommend moving this directory into the
CrossOver user directory, though this is optional.

## Disconnect Steam

To disconnect Steam from the Hat in Time depot, two changes have to be made.

Firstly, as is well-documented when disconnecting Steam, the file
`steam_appid.txt` needs to be created containing the Steam Application ID. For A
Hat in Time, this file must be placed in `Binaries\Win64`, the same directory
where `HatinTimeGame.exe` resides. The file `steam_appid.txt` should contain the
text "253230".

While this would normally work fine on Windows, CrossOver requires an additional
step. `steam_api[64].dll` is the library Hat in Time uses to interface with
Steam. While in Windows leaving this untouched works without issue, CrossOver
requires that this library and its endpoints to return safe values. Otherwise,
the game will crash when loading the file select screen. To create these safe
endpoints, the
[Goldberg Emulator](https://mr_goldberg.gitlab.io/goldberg_emulator/) is
recommended. While many files are included in the build, Hat in Time only uses
`steam_api64.dll`, and so only that file needs to be replaced. Like
`steam_appid.txt`, this file is located in `Binaries\Win64`.

Following these changes, the game should boot up without issue.

## Manual Installation of Archipelago Mod

Thankfully, the Archipelago mod works by interfacing over internet protocols,
something that works irrespective of what environment the client and server are
run under. As such, the Hat in Time client can run just fine in the standard
macOS Archipelago build.

The load the mod without Steam, copy the workshop files into
`HatinTimeGame\Mods\3026842601`.

```
HatinTimeGame\Mods
└── 3026842601
    ├── Classes
    ├── CompiledScripts
    ├── CookedPC
    ├── icon.png
    ├── modinfo.ini
    ├── Shadercache
    └── uploader.xml
```

After this, the mod should be enabled and work without issue! The archipelago
connection is made when a game file is selected.
