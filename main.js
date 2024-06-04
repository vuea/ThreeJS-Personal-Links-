class Main {
    constructor() {
        this.createFormElements();
        
        this.scene = new THREE.Scene();
        this.gltfModel = null; // Variable to store the loaded GLTF model

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const loader = new THREE.GLTFLoader();
        loader.load('model.gltf', (gltf) => {
            this.gltfModel = gltf.scene;
            this.gltfModel.position.x = -5;

            // Add a point light to illuminate the model
            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(0, 10, 0);
            this.gltfModel.add(pointLight);

            this.scene.add(this.gltfModel);
        }, undefined, (error) => {
            console.error(error);
        });

        this.createTextElements();

        document.addEventListener('wheel', (event) => this.onScroll(event));
        this.minCameraX = -10; 
        this.maxCameraX = 0; 
        
        this.gltfRotation = { x: 0, y: 0, z: 0 };
        this.renderer.setClearColor(0x000000); // Set background color to black
        this.shootingImages = [];

        // Create shooting images
        this.createShootingImages(10); // Adjust the number of shooting images as needed
        this.scrollDirection = 0; // 0: No scroll, 1: Scrolling down, -1: Scrolling up
        this.animate();
    }

    createFormElements() {
        const form = document.createElement('form');
        form.id = 'submissionForm';
        form.style.position = 'absolute';
        form.style.top = '70%';
        form.style.left = '50%';
        form.style.transform = 'translate(-50%, -50%)';
        form.style.color = 'white';

        const label = document.createElement('label');
        label.htmlFor = 'textbox';

        const textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.id = 'textbox';
        textbox.name = 'textbox';
        textbox.placeholder = 'enter your rizz';
        //textbox.required = true;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = '🖤';

        form.appendChild(label);
        form.appendChild(textbox);
        form.appendChild(submitButton);

        const output = document.createElement('div');
        output.id = 'output';
        output.style.position = 'absolute';
        output.style.top = '73%';
        output.style.left = '50%';
        output.style.transform = 'translate(-50%, -50%)';
        output.style.color = 'white';

        document.body.appendChild(form);
        document.body.appendChild(output);

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            const text = textbox.value;
            output.innerText = `Brah I can check who sent it lol`;

            // Optionally, you can clear the textbox after submission
            textbox.value = '';

            setTimeout(() => {
                output.innerText = '';
            }, 2000);
        });
    }

    createTextElements() {
        const title = document.createElement('h1'); 
        title.textContent = 'We Are Here To Get Better'; 
        title.style.position = 'absolute'; 
        title.style.top = '25%'; 
        title.style.left = '50%'; 
        title.style.transform = 'translate(-50%, -50%)'; 
        title.style.color = 'white'; 
        document.body.appendChild(title);

        const instagramText = document.createElement('a');
        instagramText.href = 'https://www.instagram.com/alxvue/';
        instagramText.textContent = 'Instagram';
        instagramText.style.position = 'absolute';
        instagramText.style.top = '48%';
        instagramText.style.left = '50%';
        instagramText.style.transform = 'translate(-50%, -50%)';
        instagramText.style.color = 'white';
        instagramText.style.backgroundColor = '#808080'; // Background color
        instagramText.style.opacity = '50%';
        instagramText.style.padding = '10px 20px'; // Padding: top & bottom, left & right
        instagramText.style.borderRadius = '5px'; // Rounded corners
        instagramText.style.textAlign = 'center'; // Ensure text is centered within the padding
        document.body.appendChild(instagramText);

        const githubText = document.createElement('a');
        githubText.href = 'https://github.com/vuea';
        githubText.textContent = 'Github';
        githubText.style.position = 'absolute';
        githubText.style.top = '55%'; // Adjusted positioning due to padding
        githubText.style.left = '50%';
        githubText.style.transform = 'translate(-50%, -50%)';
        githubText.style.color = 'white';
        githubText.style.backgroundColor = '#808080'; // Background color
        githubText.style.opacity = '50%'; 
        githubText.style.padding = '10px 20px'; // Padding
        githubText.style.borderRadius = '5px'; // Rounded corners
        githubText.style.textAlign = 'center'; // Center text
        document.body.appendChild(githubText);

        const music = document.createElement('button');
        music.textContent = 'Press Play';
        music.style.position = 'absolute';
        music.style.top = '65%'; // Adjust the positioning if needed
        music.style.left = '50%';
        music.style.transform = 'translate(-50%, -50%)';
        music.style.color = 'white';
        music.style.backgroundColor = '#808080';
        music.style.opacity = '50%';
        music.style.padding = '10px 20px'; 
        music.style.borderRadius = '5px'; 
        // Initially hide the button
        music.style.display = 'none'; 
        document.body.appendChild(music);

        // Add an event listener to the button for the 'click' event
        music.addEventListener('click', () => {
            // Remove the GLTF model from the scene
            if (this.gltfModel) {
                this.scene.remove(this.gltfModel);
            }

            // Create an <img> element to show the GIF
            const gif = document.createElement('img');
            gif.src = 'todo.gif'; // Set the source to your GIF path
            gif.style.position = 'absolute';
            gif.style.top = '50%';
            gif.style.left = '50%';
            gif.style.transform = 'translate(-50%, -50%)';
            gif.style.maxWidth = '80%'; // Adjust the size as needed
            gif.style.maxHeight = '80%';
            document.body.appendChild(gif);
            
            // Optionally, hide or remove the button after clicking
            music.style.display = 'none'; // Hide the button
        });

        this.instagramText = instagramText;
        this.githubText = githubText;
        this.musicButton = music;
    }

    createShootingImages(numImages) {
        const imageUrls = [
            'Alex Vue.png',
            // Add more image paths as needed
        ];

        for (let i = 0; i < numImages; i++) {
            const texture = new THREE.TextureLoader().load(imageUrls[i % imageUrls.length]);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);

            sprite.scale.set(2, 2, 1); // Adjust the scale (width, height, depth) as needed

            sprite.position.set(
                Math.random() * 20 - 10, // X position within a range
                Math.random() * 20 - 10, // Y position within a range
                Math.random() * 20 - 10  // Z position within a range
            );

            this.shootingImages.push(sprite);
            this.scene.add(sprite);
        }
    }

    onScroll(event) {
        const scrollSpeed = 0.1;

        if (event.deltaY > 0) {
            // Scrolling down (or to the left in the X-axis context)
            this.scrollDirection = 1;
            this.camera.position.x = Math.max(this.camera.position.x - scrollSpeed, this.minCameraX);
        } else {
            // Scrolling up (or to the right in the X-axis context)
            this.scrollDirection = -1;
            this.camera.position.x = Math.min(this.camera.position.x + scrollSpeed, this.maxCameraX);
        }
    
        // Update the visibility for Instagram and GitHub links based on the camera's position
        this.updateCameraAndElements();
        this.rotateGltfModel();
    }

    rotateGltfModel() {
        const rotationThresholdStart = -3; // Start rotating when camera position is -3
        const rotationThresholdEnd = -6; // Stop rotating when camera position is -6
        const maxRotation = Math.PI; // 180 degrees
    
        if (this.camera.position.x <= rotationThresholdStart && this.camera.position.x >= rotationThresholdEnd) {
            const rotationFactor = (rotationThresholdStart - this.camera.position.x) / (rotationThresholdStart - rotationThresholdEnd);
            this.gltfRotation.y = rotationFactor * maxRotation;
        } else if (this.camera.position.x < rotationThresholdEnd) {
            this.gltfRotation.y = maxRotation; // Keeps the GLTF model rotated in the y direction
        } else {
            this.gltfRotation.y = 0;
        }
    
        if (this.gltfModel) {
            this.gltfModel.rotation.y = this.gltfRotation.y;
        }
    }
    

    updateCameraAndElements() {
        const instagramScrollThreshold = -5;
        const githubScrollThreshold = -8;

        if (this.camera.position.x < instagramScrollThreshold) {
            this.instagramText.style.display = 'none';
            this.instagramText.style.pointerEvents = 'none'; // Disable click events
        } else {
            this.instagramText.style.display = 'block';
            this.instagramText.style.pointerEvents = 'auto'; // Enable click events
        }

        if (this.camera.position.x < githubScrollThreshold) {
            this.githubText.style.display = 'none';
            this.githubText.style.pointerEvents = 'none'; // Disable click events
        } else {
            this.githubText.style.display = 'block';
            this.githubText.style.pointerEvents = 'auto'; // Enable click events
        }

        // Adjust the "Press Play" button visibility to only display at max left scroll (minCameraX)
        this.musicButton.style.display = this.camera.position.x === this.minCameraX ? 'block' : 'none'; 

        // Prevent excessive scrolling
        if (this.camera.position.x === this.maxCameraX || this.camera.position.x === this.minCameraX) {
            event.preventDefault();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update shooting image positions
        this.shootingImages.forEach((sprite) => {
            sprite.position.z += 0.1; // Adjust the speed of the shooting images (slower speed)
            if (sprite.position.z > 5) {
                // If a shooting image is too close to the camera, reset its position
                sprite.position.z = -10;
                sprite.position.x = Math.random() * 20 - 10;
                sprite.position.y = Math.random() * 20 - 10;
            }
        });

        // Rotate the GLTF model if it exists
        if (this.gltfModel) {
            // Add rotation code here if needed
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Instantiate the Main class
const app = new Main();
