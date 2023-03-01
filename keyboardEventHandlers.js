import { cameraPosition } from './app.js';

export function onDocumentKeyDown(event) {
    let keyCode = event.which;
    switch (keyCode) {
        case 37: // left arrow
            cameraPosition.x += 0.1; // rotate camera left
            break;
        case 38: // up arrow
            cameraPosition.applyAxisAngle("right", -Math.PI / 2); // rotate camera up
            break;
        case 39: // right arrow
            cameraPosition.applyAxisAngle("up", -Math.PI / 2); // rotate camera right
            break;
        case 40: // down arrow
            cameraPosition.applyAxisAngle("right", Math.PI / 2); // rotate camera down
            break;
    }
}
