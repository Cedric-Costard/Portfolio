import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Resize
window.addEventListener( 'resize', onWindowResize );

renderer.render(scene, camera);


// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  
  const [x, y, z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load('jeff.png');

// const jeff = new THREE.Mesh(new THREE.CircleGeometry(3, 32), new THREE.MeshBasicMaterial({ map: jeffTexture }));

// scene.add(jeff);


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);


// Terre 

//Genèse

   //Création geometry and material Terre

   var earthGeometry = new THREE.SphereGeometry( 5, 50, 50 );

   var earthMaterial = new THREE.MeshPhongMaterial({

       map: new THREE.TextureLoader().load("2_no_clouds_4k.jpg"),

       color: 0xaaaaaa,

       specular: 0x333333,

       shininess: 25

   });

   //Création geometry and material Nuages

   var cloudGeometry = new THREE.SphereGeometry(5.05,  50, 50);

   var cloudMaterial = new THREE.MeshPhongMaterial({

       map: new THREE.TextureLoader().load("fair_clouds_4k.png"),

       transparent: true,

       opacity: 0.8

   });

   //Création geometry and material Bump

   var bumpGeometry = new THREE.SphereGeometry(5,  50, 50);

   var bumpMaterial = new THREE.MeshPhongMaterial({

       map: new THREE.TextureLoader().load('elev_bump_4k.jpg'),

       transparent: true,

       opacity: 0.2,

   });

   //Construction & Ajout du mesh Terre Nuages Bump (le mix entre la structure géométrique et la texture) à la scène

   var earth = new THREE.Mesh(earthGeometry, earthMaterial);

   scene.add(earth);

   var clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);

   scene.add(clouds);

   var bump = new THREE.Mesh(bumpGeometry, bumpMaterial);

   scene.add(bump);

// test pour le style

// const waterTexture = new THREE.TextureLoader().load('space.jpg');

// const styleGeometry = new THREE.TorusKnotGeometry(3, 0.3, 140, 10, 6, 15);
// const styleMaterial = new THREE.MeshStandardMaterial( { color: 0xfefefe, map: waterTexture, normalMap: normalTexture});
// const torusKnot = new THREE.Mesh( styleGeometry, styleMaterial );
// scene.add( torusKnot );


moon.position.z = 30;
moon.position.setX(-10);

// jeff.position.z = -5;
// jeff.position.x = 3;

// torusKnot.position.z = -5;
// torusKnot.position.x = 3;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// Resize
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;


  earth.rotation.y += .015;
  clouds.rotation.y += .025;
  clouds.rotation.z += .0125;
  bump.rotation.y += .015;

  moon.rotation.x += 0.005;

  // torusKnot.rotation.z -= 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
