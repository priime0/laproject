const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let camera_distance = 1;

const updateCameraPosition = () => {
    camera.position.set( 
        camera_distance * Math.sin(camera_distance), 
        camera_distance + Math.sin(camera_distance), 
        camera_distance + Math.cos(camera_distance)
    );
    camera.lookAt( 0, 0, 0 );
}
updateCameraPosition();

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const unit_vectors = [];

unit_vectors.push(new THREE.Vector3( 1, 0, 0 ));
unit_vectors.push(new THREE.Vector3( 0, 1, 0 ));
unit_vectors.push(new THREE.Vector3( 0, 0, 1 ));

const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1;
const red_hex = 0xff0000;
const green_hex = 0x00ff00;
const blue_hex = 0x0000ff;

const arrow_helpers = [];

arrow_helpers.push(new THREE.ArrowHelper(unit_vectors[0], origin, length, red_hex));
arrow_helpers.push(new THREE.ArrowHelper(unit_vectors[1], origin, length, blue_hex));
arrow_helpers.push(new THREE.ArrowHelper(unit_vectors[2], origin, length, green_hex));

arrow_helpers.forEach(arrow_helper => {
    scene.add(arrow_helper);
});

const animate = () => {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

animate();

const onScroll = (y) => {
    if (y > 0) {
        camera_distance += 0.1;
    }
    else {
        camera_distance -= 0.1;
    }
    updateCameraPosition();
    console.log(`Camera distance: ${camera_distance}`);
};

let ticking = false;

window.addEventListener('scroll', e => {
    const scroll = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            onScroll(scroll);
            ticking = false;
        });
    }
    ticking = true;
});
