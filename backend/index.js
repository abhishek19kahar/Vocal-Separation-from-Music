import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import Moises from 'moises/sdk.js';
import AuthRouter from './Routes/AuthRouter.js';
import contactRouter from './Routes/ContactRouter.js';
import './Models/db.js';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { type } from 'os';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: "http://localhost:3000", // Allow requests only from your React app's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Configure Multer for file uploads (only audio files)
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/audio';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const audioFilter = (req, file, cb) => {
  // Accept audio files only
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed!'), false);
  }
};

const upload = multer({ storage: audioStorage, fileFilter: audioFilter });
// const audioDir = path.join(__dirname, 'processed-files');
// Initialize Moises SDK
const moises = new Moises({ apiKey: process.env.MOISES_API_KEY });

// API endpoint for uploading and processing audio files
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file uploaded' });
    }

    const filePath = path.resolve(req.file.path);
    console.log('File path:', filePath); // Log the file path

    // Upload the file to Moises
    const downloadUrl = await moises.uploadFile(filePath);
    console.log('Download URL:', downloadUrl); // Log the download URL

    // Create a job
    const jobId = await moises.addJob('audio-processing', 'untitled-workflow-10c9379', {
      inputUrl: downloadUrl,
    });
    console.log('Job ID:', jobId); // Log the job ID

    // Wait for the job to complete
    const job = await moises.waitForJobCompletion(jobId);
    console.log('Job Status:', job.status); // Log the job status

    if (job.status === 'SUCCEEDED') {
      // Download processed results
      const results = await moises.downloadJobResults(job, './processed-files');
      console.log('Processed results:', results); // Log the processed results for debugging

      // Ensure results is an array before using map
      const processedFiles = Array.isArray(results) ? results.map(file => ({
        fileName: file.name,
        downloadLink: `/files/${file.name}`,
      })) : [];

      res.json({ success: true, results: processedFiles });
    } else {
      console.error('Job failed:', job); // Log the job failure details
      res.json({ success: false, message: 'Job failed', jobDetails: job });
    }
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/ping', (req, res) => {
  res.send("PONG");
  console.log('Client has reached the site');
});
const AUDIO_DIR = path.join(path.resolve(), "processed-files");
app.get("/api/audio-files", (req, res) => {
  fs.readdir(AUDIO_DIR, (err, files) => {
    if (err) {
      console.error("Error reading the directory:", err);
      return res.status(500).json({ success: false, message: "Error reading directory." });
    }

    const audioFiles = files.filter((file) => file.endsWith(".wav") || file.endsWith(".mp3"));
    if (audioFiles.length === 0) {
      return res.status(404).json({ success: false, message: "No audio files found." });
    }

    const fileList = audioFiles.map((file) => ({
      fileName: file,
      url: `http://localhost:${PORT}/audio/${file}`, // URL for each file
    
    }));

    res.status(200).json({ success: true, files: fileList });
  });
});

// API to serve an audio file
app.get("/audio/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(AUDIO_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found.");
  }

  res.setHeader("Content-Type", "audio/wav");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Explicitly allow your React app's origin
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());
app.use('/auth', AuthRouter);
app.use('/auth', contactRouter);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
