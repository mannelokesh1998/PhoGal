# PhoGal - Cherish Memories

PhoGal is an **offline photo gallery application** that allows you to browse images stored on your local drive. It provides a RealTime Photos-like interface with features such as face detection, date-based grouping, dark mode, and more.

---

## Features

- **Google Photos-like UI**: Clean and intuitive interface for browsing images.
- **Face Detection**: Detects faces in photos and displays the most appeared faces in a scrolling row.
- **Date Grouping**: Groups images by date and month for easy navigation.
- **Dark Mode**: Toggle between dark and light modes for better visibility.
- **Folder Navigation**: Navigate through folders and subfolders on your local drive.
- **Search**: Search for images by name.
- **Slideshow**: Click on an image to view it in a full-screen slideshow.
- **Up Button**: Scroll to the top of the page with a single click.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Face Detection**: [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- **Styling**: Custom CSS with gradient backgrounds and responsive design.

---

## Folder Structure
![Folder Structure](https://github.com/user-attachments/assets/c2bb6129-3353-422d-9d45-0989dc5383bb)

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
2. **face-api.js Models**: Download the required models from the [face-api.js GitHub repository](https://github.com/justadudewhohacks/face-api.js) and place them in the `public/models` folder.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mannelokesh1998/PhoGal
   cd PhoGal
   ```

2. **Install Dependencies**:

  ```bash
  npm install express
  ```

3. **Start the Server**:

  ```bash
  node server.js
```

4. **Access the Application**:

  Open your browser and go to http://localhost:3000

**Usage**

1. **Load Images**:
  Enter the path to your local drive (e.g., D: / ) and click "Load Images".

2. **Browse Images**:
  Images are grouped by date and displayed in a grid layout.
  Click on an image to view it in a full-screen slideshow.

3. **Face Detection**:
  Detected faces are displayed in a scrolling row at the top.
  Click on a face to view all images containing that face.

4. **Search**:
  Use the search bar to filter images by name.

5. **Toggle Dark Mode**:
  Click the dark mode button at the bottom-left corner to toggle between dark and light modes.

6. **Scroll to Top**:
  Use the Up button at the bottom-right corner to scroll to the top of the page.

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

  1. Fork the repository.
  
  2. Create a new branch ( git checkout -b feature/YourFeatureName ).
  
  3. Commit your changes ( git commit -m 'Add some feature' ).
  
  4. Push to the branch ( git push origin feature/YourFeatureName ).
  
  5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
face-api.js for face detection and recognition.

Express.js for the backend server.


## Contact
For any questions or feedback, feel free to reach out:

**Email**: manne.lokesh@outlook.com

**GitHub:** https://github.com/mannelokesh1998
