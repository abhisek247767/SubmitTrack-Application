# Slidely Form Backend

## Description
This project is a backend server for handling form submissions. It provides endpoints for submitting, reading, deleting, editing, and searching submissions. The server is built using Express and TypeScript, and it uses a JSON file (`db.json`) to store the submission data.

## Prerequisites
- Node.js (>= 12.x)
- npm (>= 6.x)

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repository-url.git
   cd your-repository
## Install dependencies:

```bash
npm install
```
## Start the server:
```bash
npm start
```
The server will run on http://localhost:3000


## API Endpoints
### 1. Check Server Status
- URL: /ping
- Method: GET
- Description: Checks if the server is running.
- Response: { "success": true }
### 2. Submit Data
- URL: /submit
- Method: POST
- Description: Submits new form data.
- Body:
json
```bash
{
    "Name": "Gautam Gambhir",
    "Email": "GautamG@example.com",
    "Phone": "1234567890",
    "GitHubLink": "https://github.com/GautamGambhir",
    "StopwatchTime": "00:01:19"
}
```

Response: { "success": true }

### 3. Read Submission
- URL: /read?index=0
- Method: GET
- Description: Reads the submission at the specified index. If no index is provided, all submissions are returned.
- Response: JSON object of the submission or an array of all submissions.

### 4. Delete Submission
- URL: /delete?index=0
- Method: DELETE
- Description: Deletes the submission at the specified index.
- Response: { "success": true }
### 5. Edit Submission
- URL: /edit?index=0
- Method: PUT
- Description: Edits the submission at the specified index.
- Body:
```bash
{
    "Name": "Saurabh Netravalkar",
    "Email": "sourabhN@example.com",
    "Phone": "0987654321",
    "GitHubLink": "https://github.com/saurabh",
    "StopwatchTime": "00:02:30"
}
```

- Response: { "success": true }
