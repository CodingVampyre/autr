# Autr

Autr is a tool to write and export novels.
It separates the novel into chapters and scenes and let's you work on them independently.
This allows you to quickly order your work and to be flexible.

## Features
* AUTR supports exporting a novel as PDF-Norm-Pages, which are usually used to hand them to publishers and to proof-read a novel.
* (Soon) AUTR allows you to have a list of characters, places and objects and connect them to your novel.

## Installation
Just download the binaries provided in this repository or on http://autr-writing.com.

## Installation for Developers

1. Download or Clone this repository
1. Install `NodeJS` and `NPM`
1. run `npm run build:electron:<os>` wits `<os>` being your operating system:
    * `linux` for Linux
    * `win` for Windows
    * `osx` for MacOS
1. Move to the binary folder: `cd build-bin/autr-<os>-x64`; with os being either linux, win32 or darwin for MacOS
1. run `./autr`
