import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1); 
const boxMaterial = new THREE.MeshBasicMaterial({color: "lightblue", wireframe: true});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
const axeHelper = new THREE.AxesHelper();
const clock = new THREE.Clock();
scene.add(boxMesh);
scene.add(axeHelper);

const cameraSize = {
    width: window.innerWidth,
    height: window.innerHeight //
};
const cursor = {
    x: 0,
    y: 0
};
const camera = new THREE.PerspectiveCamera(90, cameraSize.width/cameraSize.height, 0.1, 1000);
camera.position.z = 3;
camera.lookAt(boxMesh.position);
scene.add(camera);
const controls = new OrbitControls(camera, canvas);

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

window.addEventListener('dblclick', (event) => {
    console.log('double clicked');
    if(!document.fullscreenElement) {
        canvas.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
});

window.addEventListener('resize', (event) => {
    console.log('resize');
    cameraSize.width = window.innerWidth;
    cameraSize.height = window.innerHeight;
    camera.aspect = cameraSize.width / cameraSize.height;
    camera.updateProjectionMatrix();
    renderer.setSize(cameraSize.width, cameraSize.height);
});

window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / cameraSize.width - 0.5;
    cursor.y = -1* (event.clientY / cameraSize.height - 0.5);
});
