const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1); 
const boxMaterial = new THREE.MeshBasicMaterial({color: "lightblue"});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

const cameraSize = {
    width: 800,
    height: 600
};
const camera = new THREE.PerspectiveCamera(75, cameraSize.width/cameraSize.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(cameraSize.width, cameraSize.height);
renderer.render(scene, camera);
