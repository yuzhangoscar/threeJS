import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from "lil-gui";
import gsap from "gsap";
import imageSource from "./color.jpg"

//load an image
const image = new Image();
image.onload = () => {
    console.log("loaded");
};
image.src = imageSource;

const gui = new dat.GUI();

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();

const count = 2;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random()-0.5);
}
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);

geometry.setAttribute("position", positionAttribute);


const material = new THREE.MeshBasicMaterial({color: "lightblue", wireframe: true});
const mesh = new THREE.Mesh(geometry, material);
const axeHelper = new THREE.AxesHelper();
const clock = new THREE.Clock();
scene.add(mesh);
scene.add(axeHelper);

// Debug
const parameters = {
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y : mesh.rotation.y + 10});
    }
};
gui.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name("elevation");

gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(material, "color");
gui.add(parameters, "spin");

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
camera.lookAt(mesh.position);
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
