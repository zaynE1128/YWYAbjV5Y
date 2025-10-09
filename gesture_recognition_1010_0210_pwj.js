// 代码生成时间: 2025-10-10 02:10:25
// Import necessary modules
const EventEmitter = require('events');

// Define the Gesture class that will handle gesture recognition
class Gesture extends EventEmitter {
    constructor() {
        super();
        this.touches = [];
    }

    // Method to handle touch start events
    onTouchStart(e) {
        // Prevent default touch behavior
        e.preventDefault();
        // Add the touch point to the array
        this.touches.push({ identifier: e.touches[0].identifier, x: e.touches[0].clientX, y: e.touches[0].clientY });
        // Emit the 'gesture-start' event with the touch data
        this.emit('gesture-start', this.touches);
    }

    // Method to handle touch move events
    onTouchMove(e) {
        // Prevent default touch behavior
        e.preventDefault();
        // Update the touch points in the array
        for (let i = 0; i < this.touches.length; i++) {
            const touch = this.touches[i];
            const currentTouch = e.touches.find(t => t.identifier === touch.identifier);
            if (currentTouch) {
                touch.x = currentTouch.clientX;
                touch.y = currentTouch.clientY;
            }
        }
        // Emit the 'gesture-move' event with the updated touch data
        this.emit('gesture-move', this.touches);
    }

    // Method to handle touch end events
    onTouchEnd(e) {
        // Prevent default touch behavior
        e.preventDefault();
        // Remove the touch points from the array
        this.touches = this.touches.filter(t => !e.changedTouches.find(ct => ct.identifier === t.identifier));
        // Emit the 'gesture-end' event with the remaining touch data
        this.emit('gesture-end', this.touches);
    }

    // Method to bind touch event listeners
    bindTouchListeners(element) {
        // Bind touch start, move, and end events to the element
        element.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        element.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        element.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    }
}

// Function to create a new gesture recognizer
function createGestureRecognizer(element) {
    // Create a new instance of the Gesture class
    const gesture = new Gesture();

    // Bind touch listeners to the element
    gesture.bindTouchListeners(element);

    // Return the gesture instance
    return gesture;
}

// Export the createGestureRecognizer function for use in other modules
module.exports = createGestureRecognizer;