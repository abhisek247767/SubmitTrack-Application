import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable all CORS requests
app.use(cors());

// JSON file to store submissions
const dbFilePath = path.join(__dirname, 'db.json');

// Ensure the db file exists and is valid JSON
try {
    if (!fs.existsSync(dbFilePath)) {
        fs.writeFileSync(dbFilePath, JSON.stringify([]));
    } else {
        const fileContent = fs.readFileSync(dbFilePath, 'utf8');
        JSON.parse(fileContent); // Check if it's valid JSON
    }
} catch (error) {
    console.error('Error initializing db.json:', error);
    fs.writeFileSync(dbFilePath, JSON.stringify([])); // Reset file if invalid
}

// Endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
    res.json({ success: true });
});

// Endpoint to submit data
app.post('/submit', (req, res) => {
    const { Name, Email, Phone, GitHubLink, StopwatchTime } = req.body;

    // Log received data
    console.log('Received submission:', req.body);

    // Validate data
    if (!Name || !Email || !Phone || !GitHubLink || !StopwatchTime) {
        console.error('Validation failed: missing fields');
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Read existing submissions
        const fileContent = fs.readFileSync(dbFilePath, 'utf8');
        const submissions = JSON.parse(fileContent);

        // Add new submission
        submissions.push({ Name, Email, Phone, GitHubLink, StopwatchTime });

        // Write updated submissions back to db.json
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

        // Respond with success message
        res.json({ success: true });
    } catch (error) {
        console.error('Error processing submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to read data
app.get('/read', (req: Request, res: Response) => {
    const { index } = req.query;
    try {
        const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

        if (index !== undefined) {
            if (isNaN(Number(index)) || Number(index) < 0 || Number(index) >= submissions.length) {
                return res.status(400).json({ error: 'Invalid index' });
            }
            res.json(submissions[Number(index)]);
        } else {
            res.json(submissions);
        }
    } catch (error) {
        console.error('Error reading submissions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Endpoint to delete a submission
app.delete('/delete', (req: Request, res: Response) => {
    const { index } = req.query;
    try {
        const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

        if (index === undefined || isNaN(Number(index)) || Number(index) < 0 || Number(index) >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        submissions.splice(Number(index), 1);

        fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to edit a submission
app.put('/edit', (req: Request, res: Response) => {
    const { index } = req.query;
    const { Name, Email, Phone, GitHubLink, StopwatchTime } = req.body;

    try {
        const submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

        if (index === undefined || isNaN(Number(index)) || Number(index) < 0 || Number(index) >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        // Validate data
        if (!Name || !Email || !Phone || !GitHubLink || !StopwatchTime) {
            console.error('Validation failed: missing fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        submissions[Number(index)] = { Name, Email, Phone, GitHubLink, StopwatchTime };

        fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error editing submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
