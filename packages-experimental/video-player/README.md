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
 
 ![General Tab](/assets/general_tab_configuration.png)
 ![Behavior Tab](/assets/behavior_tab_configuration.png)
 ![Size Tab](/assets/size_tab_configuration.png)

## Development project

[https://videoplayer-sandbox.mxapps.io/](https://videoplayer-sandbox.mxapps.io/)

![demo](/assets/demo.png)

## Issues, suggestions and feature requests

Please report any issue and bugs to https://support.mendix.com/

## Development and contribution
Please follow [development guide](/development.md).
