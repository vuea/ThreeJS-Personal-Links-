import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.gltfModel = null; // Variable to store the loaded GLTF model

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    loadModel(modelPath) {
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            this.gltfModel = gltf.scene;

            // Add a point light to illuminate the model
            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(0, 10, 0); // Adjust position to focus on the model
            this.gltfModel.add(pointLight); // Add the point light as a child of the GLTF model

            this.scene.add(this.gltfModel);
        }, undefined, (error) => {
            console.error(error);
        });
    }

    animate() {
        if (this.gltfModel) {
            this.gltfModel.rotation.y += 0.05; // Rotate the model
        }
    }
}


export default scene;