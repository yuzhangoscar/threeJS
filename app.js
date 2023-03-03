
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
const cursor = {
    x: 0,
    y: 0
};
const camera = new THREE.PerspectiveCamera(75, cameraSize.width/cameraSize.height, 0.1, 1000);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(cameraSize.width, cameraSize.height);

function tick() {
    const elapsedTime = clock.getElapsedTime();

    camera.position.z = Math.cos(cursor.x * Math.PI * 3);
    camera.position.x = Math.sin(cursor.x * Math.PI * 3);
    //camera.position.y = -1*(event.clientY/cameraSize.height-0.5)*2;
    camera.lookAt(boxMesh.position);

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / cameraSize.width - 0.5;
    cursor.y = -1* (event.clientY / cameraSize.height - 0.5);
});
