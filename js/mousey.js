var {screen} = require('electron');
//initial mouse position variables.
var mousePosition = getCurrentMousePosition();
var mouseSpeedPosition = getCurrentMousePosition();

//function returns a boolean value representing whether or not the mouse is moving
function isMouseMoving() {
    let currentMousePosition = getCurrentMousePosition();

    if (currentMousePosition.x == mousePosition.x && currentMousePosition.y == mousePosition.y) {
        mousePosition = currentMousePosition;
        return false;
    } else if (currentMousePosition.x !== mousePosition.x || currentMousePosition.y !== mousePosition.y) {
        mousePosition = currentMousePosition;
        return true;
    }
}

//this function returns the number of pixels difference between the previous mouse position recorded, and the current position...or something
function diffInPixels() {
    let currentMousePosition = getCurrentMousePosition();
    let diffInPixels = { x: 0, y: 0 };
    diffInPixels.x = Math.abs((currentMousePosition.x - mouseSpeedPosition.x));
    diffInPixels.y = Math.abs((currentMousePosition.y - mouseSpeedPosition.y));
    mouseSpeedPosition = currentMousePosition;
    return diffInPixels;
}

//this function returns either the x or y value of the diffInPixels return value
function mouseSpeed() {
    let diffInPosition = diffInPixels();
    let rate;
    if (diffInPosition.x >= diffInPosition.y) {
        rate = diffInPosition.x;
        return rate
    } else {
        rate = diffInPosition.y;
        return rate;
    }
}
//helper function to return the current mouse position on the screen
function getCurrentMousePosition() {
    return screen.getCursorScreenPoint();
}

//export object
module.exports = {
    isMouseMoving: isMouseMoving,
    mouseSpeed: mouseSpeed
}
