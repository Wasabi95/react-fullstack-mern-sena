// //server.mjs
// import express from "express";
// import cors from "cors";
// import "./loadEnvironment.mjs";
// import records from "./routes/record.mjs";

// const PORT = process.env.PORT || 5050;
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/record", records);

// // start the Express server
// app.listen(PORT, () => {
// console.log(`Server is running on port: ${PORT}`);
// console.log('Server is now running and ready to accept requests.');
// });
// app.get('/', (req, res) => {
// res.send('Welcome to the homepage!');
// });

import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import helmet from "helmet"; 
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import compress from 'compression';

dotenv.config();
// Retrieve environment variables
const PORT = process.env.PORT || 5050;
const ATLAS_URI = process.env.ATLAS_URI;
const app = express();

app.use(cors());
app.use(express.json());
app.use(compress());
if(process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
  }));
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}

app.use("/record", records);

// start the Express server
// Modify the server's listen method to bind to both IPv4 and IPv6 addresses
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log('Server is now running and ready to accept requests.');
});

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});


// // Helmet Content Security Policy (CSP) Middleware:
// // Content Security Policy (CSP) is a security feature 
// // that helps prevent various types of attacks, including cross-site scripting (XSS) attacks, 
// // by specifying which content sources are allowed to be loaded by the browser.