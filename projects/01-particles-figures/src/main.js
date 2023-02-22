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

let controls = new OrbitControls(camera);
controls.update();

let particleCount = numberOfParticles;

let spherePoints, cubePoints, rocketPoints, spacemanPoints;

let particles = new THREE.Geometry();
let sphereParticles = new THREE.Geometry();
let cubeParticles = new THREE.Geometry();
let rocketParticles = new THREE.Geometry();
let spacemanParticles = new THREE.Geometry();

let pMaterial = new THREE.PointCloudMaterial({
  color: particleColor,
  size: particleSize,
  map: THREE.ImageUtils.loadTexture(particleImage),
  blending: THREE.AdditiveBelnding,
  transparent: true
});

let geometry = new THREE.SphereGeometry(5, 30, 30);

spherePoints = THREE.GeometryUtils.randomPointsInGeometry(geometry, particleCount);

geometry = new THREE.BoxGeometry(9, 9, 9);

cubePoints = THREE.GeometryUtils.randomPointsInGeometry(geometry,particleCount);

const codepenAssetUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605067/';

let objLoader = new THREE.OBJLoader();
objLoader.setPath(codepenAssetUrl);
objLoader.load('CartoonRocket.obj', function(object){
  object.traverse(function(child){
    if(child instanceof THREE.Mesh) {
      let scale = 2.1;
      let area = new THREE.Box3();
      area.setFromObject(child);
      let yOffset = (area.max.y * scale) / 2;
      
      child.geometry.scale(scale, scale, scale);
      rocketPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
      createVertices(rocketParticles, rocket,Points, yOffset, 2); 
    }
  });
});