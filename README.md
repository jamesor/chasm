# Chasm - A Text Adventure Game Engine

Chasm is a simple text adventure game engine inspired by the classics such as Zork, Hitchhiker's Guide to the Galaxy and Ballyhoo.


## The Engine

The engine is written in ES6 using a basic MVC design pattern and compiled to ES5 using [Bable](https://babeljs.io/) with [Gulp](http://gulpjs.com/).

The Structure:
+ commands - Commands are classes for each acceptable action a user can take. Commands are created on demand through a factory and injected with the dependencies it needs to perform the action. 
+ controllers - Controllers are the middle man between views and the application. They handle user interaction, dispatch events for commands to handle, listen for events and provide views with data it needs to render.
+ models - Base classes for different types of objects used in the engine
+ proxies - Classes that provide easier to use interfaces to models
+ utils - Static utility functions
+ views - Simple classes that proxy DOM elements and provide and API to the app
+ BaseApp.js - The application


### Input

+ `n`, `north`, `e`, `east`, `s`, `south`, `w`, `west`, `u`, `up`, `d` and `down` are commands you can use to travel from one location to another.
+ `i` or `inventory` will list the items you are currently carrying.
+ `l` or `look` will redisplay the description of the location you are currently in.
+ `look in` will let you see the contents of an item that may contain other items.
+ `look at` will give you a more detailed explaination of an item.
+ `examine` will work that same at `look at`.
+ `take` and `drop`
+ `put ... in` will let you put an item inside another item.
+ `lock ... with` and `unlock ... with`
+ `open` and `close`
+ `tie` and `untie`


## The Demo

You will find a simple demo of the engine as a game in the demo folder. Open `demo/index.html` in a web browser. The demo will only run in browsers with good support for ES6 such as the lastest browsers.

The goal of the game is to reach a total of **25 points**. Currently, a "you've won" state has not been implemented and you will be able to continue to move after reaching your goal. It's up to you to build a more completed game.

### Starting the Game

At the C64 Basic screen, type `RUN` and press the ENTER key. To restart the game, simply use the browser's reload button.

### Banner

The banner across the top of the screen will show you:
+ Your current location
+ Your current score
+ Your total number of moves taken so far

### Image

The image is a depiction of the location you are currently at.

#### Creating Images for New Locations

Images have been created using the online service from [http://c64.superdefault.com/](http://c64.superdefault.com/), saving the image as 1200x800 then cropping it down to 853x240. The image whould be a PNG and the name should match the location's name using all lowercase letters and spaces substituted with hyphens. (e.g. Toll Room becomes `troll-room.png`)


## License

The MIT License (MIT)

Copyright (c) 2015 James O'Reilly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.