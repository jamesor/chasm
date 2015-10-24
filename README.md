# Chasm - A Text Adventure

Chasm is a simple text adventure game inspired by the classics such as Zork, Hitchhiker's Guide to the Galaxy and Ballyhoo.

## Goal of the Game

The goal of the game is to reach a total of **5 points**. Currently, a "you've won" state has not been implemented and you will be able to continue to move after reaching your goal. This will change with a higher goal and a more rewarding payoff screen.

## Starting the Game

At the C64 Basic screen, type `RUN` and press the ENTER key. To restart the game, simply use the browser's reload button.

## Banner

The banner across the top of the screen will show you:
+ Your current location
+ Your current score
+ Your total number of moves taken so far

## Image

The image is a depiction of the location you are currently at.

### Creating Images for New Locations

Images have been created using the online service from [http://c64.superdefault.com/](http://c64.superdefault.com/), saving the image as 1200x800 then cropping it down to 853x240. The image whould be a PNG and the name should match the location's name using all lowercase letters and spaces substituted with hyphens. (e.g. Toll Room becomes `troll-room.png`)

## Input

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