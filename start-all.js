const { FrontendPort } = require('./frontend/components/constants.js');
const { exec } = require('child_process');
const open = require('open');

// Start the backend
const backend = exec('node index.js', { cwd: './backend/src' });
backend.stdout.pipe(process.stdout);
backend.stderr.pipe(process.stderr);

// Start the frontend with the specified port
const frontend = exec(`npx expo start --web --port ${FrontendPort}`, { cwd: './frontend' });
frontend.stdout.pipe(process.stdout);
frontend.stderr.pipe(process.stderr);
