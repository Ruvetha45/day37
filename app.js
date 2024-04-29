const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());

const directoryPath = './day37';

// Ensure the directory exists, create it if it doesn't
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath);
}

// Default route
app.get('/', (req, res) => {
  res.send('Hello, This is Ruvetha, Welcome to your Node.js file system API!');
});

// Endpoint to create a txt file with current time stamp
app.post('/createTimestampedFile', (req, res) => {
  const folderPath = directoryPath;

  const currentDate = new Date();
  const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName); 

  const fileContent = currentDate.toString();

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    } else {
      res.status(201).send('File created successfully');
    }
  });
});

// Endpoint to view the list of timestamped files
app.get('/listTimestampedFiles', (req, res) => {
  const folderPath = directoryPath;

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    } else {
      console.log('Files in directory:', files);
      const textFiles = files.filter((file) => file.endsWith('.txt'));
      res.status(200).json({ files: textFiles });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
