
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1); 
const boxMaterial = new THREE.MeshBasicMaterial({color: "lightblue", wireframe: true});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
const axeHelper = new THREE.AxesHelper();
const clock = new THREE.Clock();
let cameraPosition = new THREE.Vector3();
scene.add(boxMesh);
scene.add(axeHelper);

const cameraSize = {
    width: 800,
    height: 600
};
const camera = new THREE.PerspectiveCamera(75, cameraSize.width/cameraSize.height);
camera.position.z = 3;
scene.add(camera);

document.addEventListener('keydown', onDocumentKeyDown, false);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(cameraSize.width, cameraSize.height);

function tick() {
    const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

window.addEventListener("mousemove", (event) => {
    camera.position.x = event.clientX/cameraSize.width;
    camera.position.y = -1*event.clientY/cameraSize.height;
});

function onDocumentKeyDown(event) {
    let keyCode = event.which;
    switch (keyCode) {
        case 37: // left arrow
            camera.rotation.x += 0.1; // rotate camera left
            break;
        case 38: // up arrow
            camera.rotation.z += 0.1
            break;
        case 39: // right arrow
            camera.rotation.x -= 0.1
            break;
        case 40: // down arrow
            camera.rotation.y += 0.1
            break;
    }
}
