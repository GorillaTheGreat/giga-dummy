import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Renderer Setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
document.body.appendChild(renderer.domElement);


// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32);;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

// Scene Setup
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00d000 });

function setupLights() {
  const light1 = new THREE.DirectionalLight();
  light1.position.set(1, 1, 1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight();
  light2.position.set(-1, 1, -0.5);
  scene.add(light2);

  const ambient = new THREE.AmbientLight();
  ambient.intensity = 0.1;
  scene.add(ambient);
}

function setupWorld(size) {
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, 0, z);
      scene.add(cube);
    }
  }
}

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);


















  function animate() {
  requestAnimationFrame(animate);

  const speed = 0.1;

  if (character) {
    if (keys.w) character.position.z -= speed;
    if (keys.s) character.position.z += speed;
    if (keys.a) character.position.x -= speed;
    if (keys.d) character.position.x += speed;
  }

  renderer.render(scene, camera);
}

























}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
setupWorld(32);
animate();
for (let i = 0; i < geometry.attributes.position.count; i++) {
  const y = Math.random() * 2; // temporary
  geometry.attributes.position.setY(i, y);
}













const loader = new GLTFLoader();

let character; // we store it so we can move it later

loader.load(
  "../cyber_samurai (1).glb",
  function (gltf) {

    character = gltf.scene;

    // scale it (IMPORTANT — most models are too big/small)
    character.scale.set(5, 5, 5);

    // position it on ground
    character.position.set(0, 0, 0);

    scene.add(character);

    console.log("Character loaded!");
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("Error loading model:", error);
  }
);
geometry.computeVertexNormals();




const keys = {
  w: false,
  a: false,
  s: false,
  d: false
};

window.addEventListener("keydown", (e) => {
  if (e.key === "w") keys.w = true;
  if (e.key === "a") keys.a = true;
  if (e.key === "s") keys.s = true;
  if (e.key === "d") keys.d = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "w") keys.w = false;
  if (e.key === "a") keys.a = false;
  if (e.key === "s") keys.s = false;
  if (e.key === "d") keys.d = false;
});