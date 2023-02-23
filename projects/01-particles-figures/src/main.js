import { gsap, Power4, Power2, Elastic } from 'gsap';
import * as Stats from 'stats.js';

const NUMBER_OF_PARTICLES = 6000;

const PARTICLE_TEXTURE_URL = 'https://motionarray.imgix.net/preview-34649aJ93evd9dG_0008.jpg?w=660&fit=max&auto=format';
const PARTICLE_COLOR = 'rgb(255,0,255)';
const PARTICLE_SIZE = 0.2;

const DEFAULT_ANIMATION_SPEED = 1;
const MORPH_ANIMATION_SPEED = 3;

const triggers = document
  .getElementsByClassName('triggers')[0]
  .querySelectorAll('span');

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10_000);
camera.position.y = 25;
camera.position.z = -25;


function fullScreen() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', fullScreen, false);

const controls = new THREE.OrbitControls(camera);
controls.update();

const particleCount = NUMBER_OF_PARTICLES;

const particles = new THREE.Geometry();
const sphereParticles = new THREE.Geometry();
const cubeParticles = new THREE.Geometry();
const rocketParticles = new THREE.Geometry();
const spacemanParticles = new THREE.Geometry();

const pMaterial = new THREE.PointsMaterial({
  color: PARTICLE_COLOR,
  size: PARTICLE_SIZE,
  map: new THREE.TextureLoader().load(PARTICLE_TEXTURE_URL),
  blending: THREE.AdditiveBlending,
  transparent: true
});

const spherePoints = THREE.GeometryUtils.randomPointsInGeometry(
  new THREE.SphereGeometry(5, 30, 30),
  particleCount
);

const cubePoints = THREE.GeometryUtils.randomPointsInGeometry(
  new THREE.BoxGeometry(9, 9, 9),
  particleCount
);

function createVertices(emptyArray, points, yOffset = 0, trigger = null) {
  for (let p = 0; p < particleCount; p++) {
    const vertex = new THREE.Vector3();
    vertex.x = points[p]['x'];
    vertex.y = points[p]['y'] - yOffset;
    vertex.z = points[p]['z'];

    emptyArray.vertices.push(vertex);
  }

  if (trigger !== null)
    triggers[trigger].setAttribute('data-disabled', true);
}

createVertices(sphereParticles, spherePoints, null, null);
createVertices(cubeParticles, cubePoints, null, 1);

function assetLoader({ url, name, scale, particles }) {
  const objLoader = new THREE.OBJLoader();
  objLoader.setPath(url);
  objLoader.load(name, object => { // 'CartoonRocket.obj' // 'Astronaut.obj'
    object.traverse( child => {
      if(child instanceof THREE.Mesh) {
        // let scale = 2.1; (rocket) // let scale = 4.6; (astronaut)
        let area = new THREE.Box3();
        area.setFromObject(child);
        let yOffset = (area.max.y * scale) / 2;
        
        child.geometry.scale(scale, scale, scale);
        const rocketPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
        createVertices(particles, rocketPoints, yOffset, 2); 
      }
    });
  });  
}

const CODEPEN_ASSET_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605067/';
assetLoader({
  url: CODEPEN_ASSET_URL,
  name: 'CartoonRocket.obj',
  scale: 2.1,
  particles: rocketParticles
});
assetLoader({
  url: CODEPEN_ASSET_URL,
  name: 'Astronaut.obj',
  scale: 4.6,
  particles: spacemanParticles
});

for (let p = 0; p < particleCount; p++) {
  const vertex = new THREE.Vector3();
  vertex.x = 0;
  vertex.y = 0;
  vertex.z = 0;

  particles.vertices.push(vertex);
}

const scene = new THREE.Scene();

const particleSystem = new THREE.Points(particles, pMaterial);
particleSystem.sortParticles = true;
scene.add(particleSystem);

const SPEED = {
  NORMAL: (DEFAULT_ANIMATION_SPEED / 100),
  FULL: (MORPH_ANIMATION_SPEED / 100)
}

const animationVars = { speed: SPEED.NORMAL };

function animate() {
  stats.begin();
  particleSystem.rotation.y += animationVars.speed;
  particles.verticesNeedUpdate = true;
  stats.end();

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

function slowDown() {
  gsap.to(animationVars, {
    ease: Power2.easeOut,
    speed: SPEED.NORMAL,
    delay: 1,
    duration: 4
  });
}

function morphTo(newParticles, color = '0xffffff') {
  gsap.to(animationVars, {
    ease: Power4.easeIn,
    speed: SPEED.FULL,
    onComplete: slowDown,
    duration: 0.3
  });
  particleSystem.material.color.setHex(color);

  for (let i = 0; i < particles.vertices.length; i++) {
    gsap.to(particles.vertices[i], {
      ease: Elastic.easeOut.config(1, 0.75),
      x: newParticles.vertices[i].x,
      y: newParticles.vertices[i].y,
      z: newParticles.vertices[i].z,
      duration: 4
    });
  }
}

function toSphere() {
  handleTriggers(0);
  morphTo(sphereParticles);
}

function toCube() {
  handleTriggers(1);
  morphTo(cubeParticles);
}

function toRocket() {
  handleTriggers(2);
  morphTo(rocketParticles);
}

function toSpaceman() {
  handleTriggers(3);
  morphTo(spacemanParticles);
}

setTimeout(toSphere, 500);

triggers[0].addEventListener('click', toSphere);
triggers[1].addEventListener('click', toCube);
triggers[2].addEventListener('click', toRocket);
triggers[3].addEventListener('click', toSpaceman);

function handleTriggers(disable) {
  for (let x = 0; x < triggers.length; x++) {
    if (disable === x) {
      triggers[x].setAttribute('data-disabled', false);
    } else {
      triggers[x].setAttribute('data-disabled', true);
    }
  }
}
