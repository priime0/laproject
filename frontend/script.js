Vue.component('vector', {
    template: '<div class="vector"><input v-model="vec[0]"><input v-model="vec[1]"><input v-model="vec[2]"></div>',
    props: {
        vec: Array,
    },
});

Vue.component('vector-addition', {
    template: '<div id="vectors"><vector v-for="v in vectors" :key="v.id" :vec="v.vec"></vector><button v-on:click="addVector">Add Vector</button><button v-on:click="showAdd">Show Addition</button></div>',
    props: {
        vectors: Array,
    },
    methods: {
        addVector() {
            this.$emit('addv');
        },
        showAdd() {
            this.$emit('showa');
        },
    }
});

Vue.component('matrix-transformation', {
    template: '<div><input v-model="matrix[0][0]"><input v-model="matrix[0][1]"><input v-model="matrix[0][2]"><br><input v-model="matrix[1][0]"><input v-model="matrix[1][1]"><input v-model="matrix[1][2]"><br><input v-model="matrix[2][0]"><input v-model="matrix[2][1]"><input v-model="matrix[2][2]"><br><button v-on:click="showTransform">Show Transformation</button></div>',
    props: {
        matrix: Array,
    },
    methods: {
        showTransform() {
            this.$emit('showt');
        },
    },
});

const app = new Vue({
    el: '#app',
    data: {
        vectormode: true,
        vectors: [
            { 
                id: 0,
                vec: ["0", "0", "0"]
            }, 
            { 
                id: 1,
                vec: ["0", "0", "0"] 
            },
        ],
        matrix: [["1", "0", "0"], ["0", "1", "0"], ["0", "0", "1"]]
    },
    methods: {
        addVector: function() {
            this.vectors.push({
                id: this.vectors.length,
                vec: [0, 0, 0]
            });
        },
        showAdd: function() {
            reset_scene();
            let x = 0, y = 0, z = 0;
            this.vectors.forEach(vector => {
                x += Number(vector.vec[0]);
                y += Number(vector.vec[1]);
                z += Number(vector.vec[2]);
                const hex = 0xffff00;
                add_vector_to_scene(vector.vec, hex);
            });
            add_vector_to_scene([x, y, z], 0xffffff);
        },
        showTransform: function() {
            reset_scene();
            add_vector_to_scene([Number(this.matrix[0][0]), Number(this.matrix[1][0]), Number(this.matrix[2][0])], 0xff0000);
            add_vector_to_scene([Number(this.matrix[0][1]), Number(this.matrix[1][1]), Number(this.matrix[2][1])], 0x0000ff);
            add_vector_to_scene([Number(this.matrix[0][2]), Number(this.matrix[1][2]), Number(this.matrix[2][2])], 0x00ff00);
        },
    }
});

let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let camera_x = 5;
let camera_y = 5;
let camera_z = 5;
let camera_distance = 1;

const updateCameraPosition = () => {
    camera.position.set( camera_x, camera_y, camera_z );
    camera.lookAt( 0, 0, 0 );
}
updateCameraPosition();

const unit_arrows = [];
const vectors = [];
const arrows = [];

const reset_scene = () => {
    scene = new THREE.Scene();
    const unit_vectors = [];

    unit_vectors.push(new THREE.Vector3( 1, 0, 0 ));
    unit_vectors.push(new THREE.Vector3( 0, 1, 0 ));
    unit_vectors.push(new THREE.Vector3( 0, 0, 1 ));

    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = 1;
    const red_hex = 0xff0000;
    const green_hex = 0x00ff00;
    const blue_hex = 0x0000ff;

    unit_arrows.push(new THREE.ArrowHelper(unit_vectors[0], origin, length, red_hex));
    unit_arrows.push(new THREE.ArrowHelper(unit_vectors[1], origin, length, blue_hex));
    unit_arrows.push(new THREE.ArrowHelper(unit_vectors[2], origin, length, green_hex));

    unit_arrows.forEach(arrow_helper => {
        scene.add(arrow_helper);
    });
}
reset_scene();

const add_vector_to_scene = (vec, hex) => {
    const x = vec[0];
    const y = vec[1];
    const z = vec[2];
    const vector = new THREE.Vector3( x, y, z );
    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = origin.distanceTo(vector);
    scene.add(new THREE.ArrowHelper( vector.normalize(), origin, length, hex ));
};

const animate = () => {
    requestAnimationFrame( animate );
    updateCameraPosition();
    renderer.render( scene, camera );
};

animate();

document.onkeydown = (evt) => {
    evt = evt || window.event;

    const cam_change = 0.1;

    if (evt.keyCode == '38') { // up
        evt.preventDefault();
        camera_z += cam_change;
    }
    else if (evt.keyCode == '40') { // down
        evt.preventDefault();
        camera_z -= cam_change;
    }
    else if (evt.keyCode == '37') { // left
        evt.preventDefault();
        camera_x -= cam_change;
    }
    else if (evt.keyCode == '39') { // right
        evt.preventDefault();
        camera_x += cam_change;
    }
    else if (evt.keyCode == '32') { // space
        evt.preventDefault();
        camera_y += cam_change;
    }
    else if (evt.keyCode == '16') { // shift
        camera_y -= cam_change;
    }
};

let vector_option = 1;
const vbuttons = [...document.getElementsByClassName('voption')];

vbuttons.forEach((button, index) => {
    button.addEventListener("click", e => {
        reset_scene();
        change_area(index+1);
    });
});

const change_to_vector_addition = () => {
    app.vectormode = true;
};

const change_to_matrix_transformation = () => {
    app.vectormode = false;
};

const change_area = (option) => {
    vector_option = option || 1;
    if (vector_option === 1) {
        change_to_vector_addition();
    }
    else if (vector_option === 2) {
        change_to_matrix_transformation();
    }
    else {
        change_to_vector_addition();
    }
};
