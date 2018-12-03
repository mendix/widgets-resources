[![Build Status](https://travis-ci.org/mendix/video-player.svg?branch=master)](https://travis-ci.org/mendix/video-player)
[![Dependency Status](https://david-dm.org/mendix/video-player.svg)](https://david-dm.org/mendix/video-player)
[![Dev Dependency Status](https://david-dm.org/mendix/video-player.svg#info=devDependencies)](https://david-dm.org/mendix/video-player#info=devDependencies)
[![codecov](https://codecov.io/gh/mendix/video-player/branch/master/graph/badge.svg)](https://codecov.io/gh/mendix/video-player)
![badge](https://img.shields.io/badge/mendix-7.20.2-green.svg)

# Video Player
Mendix widget to play videos from Youtube, Vimeo, Dailymotion and external Mp4 files.

## Features
* Identify the provider and auto load the right player
* Enable and disable controls bar
* Loop the video when it finishes
* Starts the video on mute
* Auto play the video when it ready
* Define poster image for external Mp4 files
* Set static URL & Poster when the dynamic data is not specified


## Dependencies
 Mendix 7.20

## Usage
 Place the widget inside or outside a context of an object that has a value attribute.
 If you don`t place the widget inside a context, you need to provide a static URL otherwise the player will not render.
 
 ![Picure 1](/assets/pic1.png)
 ![Picture 2](/assets/pic2.png)
 ![Picture 3](/assets/pic3.png)

## Demo project

[https://videoplayer.mxapps.io/](https://videoplayer.mxapps.io/)

![demo](/assets/demo.png)

## Issues, suggestions and feature requests

We are actively maintaining this widget, please report any issues or suggestion for improvement at
https://github.com/mendix/video-player/issues.

## Development and contribution
Please follow [development guide](/development.md).
