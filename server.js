const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve face-api.js from node_modules
app.use('/face-api.js', express.static(path.join(__dirname, 'node_modules', 'face-api.js', 'dist', 'face-api.min.js')));

// Endpoint to get images from a specified drive
app.get('/get-images', (req, res) => {
    const drivePath = req.query.path;
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];

    if (!drivePath || !fs.existsSync(drivePath)) {
        return res.status(400).json({ error: 'Invalid drive path' });
    }

    const images = [];
    const scanDirectory = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                scanDirectory(filePath); // Recursively scan directories
            } else if (allowedExtensions.includes(path.extname(filePath).toLowerCase())) {
                // Add image path relative to the drive
                images.push({
                    path: `/image?path=${encodeURIComponent(filePath)}`,
                    created: stat.birthtime || stat.mtime // Use creation or modification date
                });
            }
        });
    };

    try {
        scanDirectory(drivePath);
    } catch (error) {
        return res.status(500).json({ error: 'Error scanning directory' });
    }
    res.json(images);
});

// Endpoint to serve individual images
app.get('/image', (req, res) => {
    const imagePath = decodeURIComponent(req.query.path);
    if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
    }
    res.sendFile(imagePath);
});

// Endpoint to list folders
app.get('/get-folders', (req, res) => {
    const drivePath = req.query.path;
    if (!drivePath || !fs.existsSync(drivePath)) {
        return res.status(400).json({ error: 'Invalid drive path' });
    }

    let folders;
    try {
        folders = fs.readdirSync(drivePath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        return res.status(500).json({ error: 'Error reading directory' });
    }

    res.json(folders);
});

// Load face-api.js models
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('D:/image-viewer/node_modules/face-api.js/src"');
    await faceapi.nets.faceLandmark68Net.loadFromUri('D:/image-viewer/node_modules/face-api.js/build/commonjs/faceLandmarkNet"');
    await faceapi.nets.faceRecognitionNet.loadFromUri('D:/image-viewer/node_modules/face-api.js/build/commonjs/faceRecognitionNet"');
}

// Detect faces in an image
async function detectFaces(imageElement) {
    const detections = await faceapi.detectAllFaces(imageElement)
        .withFaceLandmarks()
        .withFaceDescriptors();
    return detections;
}

// Add face to the faces row
function addFaceToRow(faceDescriptor, imageSrc) {
    const facesRow = document.getElementById('facesRow');
    const descriptorKey = JSON.stringify(faceDescriptor);

    // Store face descriptor and associated images
    if (!facesMap.has(descriptorKey)) {
        facesMap.set(descriptorKey, []);
    }
    facesMap.get(descriptorKey).push(imageSrc);

    // Sort faces by occurrence
    const sortedFaces = Array.from(facesMap.entries()).sort((a, b) => b[1].length - a[1].length);

    // Clear and update faces row
    facesRow.innerHTML = '';
    sortedFaces.forEach(([descriptor, images]) => {
        const faceCard = document.createElement('div');
        faceCard.className = 'face-card';

        const faceImage = document.createElement('img');
        faceImage.src = images[0]; // Use the first image as a representative
        faceImage.alt = 'Face';

        faceCard.appendChild(faceImage);
        facesRow.appendChild(faceCard);

        // Add click event to show images for this face
        faceCard.addEventListener('click', () => showFaceImages(descriptor));
    });
}

// Initialize face detection
async function initializeFaceDetection() {
    await loadModels();
    const images = document.querySelectorAll('.image-card img');
    images.forEach(async imageElement => {
        const detections = await detectFaces(imageElement);
        detections.forEach(detection => {
            addFaceToRow(detection.descriptor, imageElement.src);
        });
    });
}

// Fetch images from the new location
async function loadImages() {
    const drivePath = document.getElementById('drivePath').value;
    currentPath = drivePath;
    const response = await fetch(`/get-images?path=${encodeURIComponent(drivePath)}`);
    const images = await response.json();

    const container = document.getElementById('imageContainer');
    container.innerHTML = ''; // Clear previous images

    // Group images by date
    const groupedImages = groupImagesByDate(images);
    function filterImages() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const dateFilter = document.getElementById('dateFilter').value;
    
        const images = document.querySelectorAll('.image-card');
    
        images.forEach(imageCard => {
            const imageName = imageCard.querySelector('img').alt.toLowerCase();
            const imageDate = new Date(imageCard.querySelector('img').dataset.created).toISOString().split('T')[0];
    
            const matchesSearch = imageName.includes(searchQuery);
            const matchesDate = dateFilter === '' || imageDate === dateFilter;
    
            if (matchesSearch && matchesDate) {
                imageCard.style.display = 'block';
            } else {
                imageCard.style.display = 'none';
            }
        });
    }
    

    // Render grouped images
    for (const [date, images] of Object.entries(groupedImages)) {
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-header';
        dateHeader.textContent = date;
        container.appendChild(dateHeader);

        const imageGroup = document.createElement('div');
        imageGroup.className = 'image-group';

        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'image-card';

            const imgElement = document.createElement('img');
            imgElement.src = image.path;
            imgElement.alt = image.path.split('/').pop(); // Use image name as alt text
            imgElement.dataset.created = new Date(image.created).toISOString().split('T')[0]; // Ensure consistent format

            imgElement.addEventListener('click', () => openSlideshow(image.path));

            card.appendChild(imgElement);
            imageGroup.appendChild(card);
        });

        container.appendChild(imageGroup);
    }
    
    // Initialize face detection
    initializeFaceDetection();

    loadFolders(drivePath);
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
