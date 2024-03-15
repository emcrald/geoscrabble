import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const router = Router();

const imageFolder = 'maps/all';

app.use('/build', express.static('views/build'));

app.use(cors());

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});

router.get('/randomImage', (req, res) => {
    fs.readdir(imageFolder, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            res.status(500).send('Internal server error');
            return;
        }
        const folderNames = files
            .filter(file => file.isDirectory())
            .map(folder => folder.name);
        if (folderNames.length === 0) {
            console.error('No folders found');
            res.status(404).send('No folders found');
            return;
        }
        const randomFolderName = folderNames[Math.floor(Math.random() * folderNames.length)];
        const folderPath = path.join(imageFolder, randomFolderName);
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(`Error reading files in folder ${randomFolderName}:`, err);
                res.status(500).send('Internal server error');
                return;
            }
            const imageFiles = files.filter(file => /\.(png|jpe?g|gif)$/i.test(file));
            if (imageFiles.length === 0) {
                console.error(`No image files found in folder ${randomFolderName}`);
                res.status(404).send(`No image files found in folder ${randomFolderName}`);
                return;
            }
            const randomImageFileName = imageFiles[Math.floor(Math.random() * imageFiles.length)];
            const randomImagePath = path.join(folderPath, randomImageFileName);
            res.sendFile(randomImagePath);
        });
    });
});

app.use('/', router);

export const handler = serverless(app);
