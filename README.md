# Vocal Separation from Music

## Overview

This project focuses on creating an innovative web application designed to separate vocals from instrumentals in audio tracks. By leveraging cutting-edge audio processing techniques, the system integrates a robust backend for efficient file management and processing, alongside a dynamic frontend for seamless user interaction.

## Features

- **Audio Upload**: Allows users to upload audio files in MP3 or WAV formats.
- **Vocal Separation**: Utilizes advanced algorithms to extract vocals from instrumental components.
- **User Notifications**: Alerts users upon successful completion of audio processing.
- **Dashboard**: Features an intuitive interface for tracking uploads and processing statuses.

## Tech Stack

### Backend

- **Node.js**
- **Express.js**
- **Multer**: For handling file uploads.
- **dotenv**: For managing environment variables.
- **Audio Processing API**: Moises API or equivalent services.
- **MongoDB**: For database storage.

### Frontend

- **React.js**
- **CSS Modules**: For modular and reusable styling.

## Folder Structure

### Backend

```
backend/
|-- Controllers/           # Handles application logic
|-- Middlewares/           # Middleware functions for requests
|-- Models/                # Database schemas and models
|-- Routes/                # API route definitions
|-- processed-files/       # Directory for processed audio files
|-- uploads/audio/         # Directory for storing uploaded audio files
|-- .env                   # Configuration for environment variables
|-- index.js               # Entry point for the backend server
|-- package.json           # Backend dependencies and scripts
```

### Frontend

```
melody-maker-frontend/
|-- src/
    |-- Css/               # Modular CSS stylesheets
    |-- pages/             # React components for each application page
    |-- App.js             # Main application component
    |-- index.js           # React entry point
|-- public/                # Publicly accessible assets
|-- package.json           # Frontend dependencies and scripts
```

## Installation and Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB server set up.
- API key for the audio processing service (e.g., Moises API).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/abhishek19kahar/Vocal-Separation-from-Music.git
   cd Vocal_Separation_From_Music
   ```

2. Install dependencies:

   **Backend:**

   ```bash
   cd backend
   npm install
   ```

   **Frontend:**

   ```bash
   cd ../melody-maker-frontend
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the `backend` directory and include:

   ```env
   PORT=8080
   MONGO_URI=<your_mongodb_connection_string>
   API_KEY=<your_audio_processing_api_key>
   ```

4. Launch the development servers:

   **Backend:**

   ```bash
   cd backend
   npm start
   ```

   **Frontend:**

   ```bash
   cd ../melody-maker-frontend
   npm start
   ```

5. Access the application in your browser at `http://localhost:3000`.

## Usage

1. Log in or create an account within the application.
2. Navigate to the dashboard to upload audio files.
3. Monitor the processing status. Notifications will indicate completion.
4. Download the separated tracks as needed.

## Troubleshooting

### Common Errors

- **Missing API Key**: Ensure that the `.env` file contains a valid API key for the audio processing service.
- **File Upload Issues**: Confirm that the `uploads/audio/` directory exists and is writable.
- **Frontend Data Display Problems**: Use browser developer tools and backend logs to identify potential errors.

## Contributing

Contributions are encouraged! Fork the repository, implement your changes, and submit a pull request for review.

## Acknowledgments

- **Moises API Team**: For their exceptional audio processing services.
- **Inspiration**: Addressing the growing demand for advanced tools in music production and audio editing.

## BSc IT  Final year project
- **College Name**: Mulund college of commerce
- **Name**: Abhishek Jaykumar Kahar

## For any Queries
- **Email**: DM at these Email:abhishekgithub19@gmail.com

