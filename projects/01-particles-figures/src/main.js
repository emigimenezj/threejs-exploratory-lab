import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

import './index.css'

const numberOfParticles = 6000;

const particleImage = 'https://motionarray.imgix.net/preview-34649aJ93evd9dG_0008.jpg?w=660&fit=max&auto=format';
const particleColor = '0xFFFFFF';
const particleSize = 0.2;

const defaultAnimationSpeed = 1;
const morphAnimationSpeed = 3;

const [triggersContainer] = document.getElementsByClassName('triggers');
const triggers = triggersContainer.querySelectorAll('span');

let stats = new Stats();
stats.showPanel(0);

let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function fullScreen() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', fullScreen, false);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10_000);

camera.position.y = 25;
camera.position.x = 36;


