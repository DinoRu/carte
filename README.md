---

## 📍 Yandex Map Visualizer - Geographic Coordinates Visualization from an Excel File

This project visualizes geographic coordinates from an Excel file (`.xlsx`) directly on a Yandex map. With this application, you can upload a file with coordinates and instantly see each point marked on the map with custom icons.

### 🗂️ Features
- **Excel File Upload**: Supports `.xlsx` files containing geographic coordinates.
- **Custom Icons**: The first entry in the file has a unique icon, while other locations are marked with a default icon.
- **Hover Info Display**: Each location shows additional information (`hintContent`) when you hover over the icon.
- **CSV and Excel Support**: Automatically formats coordinates, whether separated by commas or dots.

### 🚀 How to Use
1. Clone the repository and open the `index.html` file.
2. Click on the "Upload File" button in the top-right corner of the map.
3. Select your Excel file, and the points will automatically display on the Yandex map with icons.

### 📥 Installation
- No installation required: simply open `index.html` in your browser.

### 🛠️ Technologies Used
- **JavaScript** for file handling and integration with Yandex Maps API.
- **Yandex Maps API** for map display and interactivity.
- **XLSX.js** for reading and processing Excel files.

### 📄 Notes
- Files should be in `.xlsx` format, with coordinates (latitude, longitude) in columns A and B, and description content in column D.
- Latitude and longitude values should be comma-separated in the Excel file.

### 🌐 Demo

<img width="1440" alt="Capture d’écran 2024-10-29 à 15 10 03" src="https://github.com/user-attachments/assets/e4cfd673-de0a-4a96-b29d-86a4e092881e">

---
