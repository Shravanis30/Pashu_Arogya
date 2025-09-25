// // app.js
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();


// const allowedOrigins = ["http://localhost:5173"];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));




// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());



// export { app };




import express from "express";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { HttpRequest } from "@aws-sdk/protocol-http";
import fetch from "node-fetch"; // Assuming node-fetch is the polyfill used, which is common in Node environments
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- AWS Credentials (MANDATORY: Load from Environment Variables) ---
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = "eu-north-1";

// --- Lambda host ---
const LAMBDA_HOST = process.env.LAMBDA_HOST_KEY;

// --- Function to sign requests ---
async function signedFetch(path, method = "GET", body = null, query = null) {
  const request = new HttpRequest({
    protocol: "https:",
    hostname: LAMBDA_HOST,
    method,
    path,
    query: query || undefined,
    headers: { "content-type": "application/json", host: LAMBDA_HOST },
    body: body ? JSON.stringify(body) : undefined
  });

  const signer = new SignatureV4({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION,
    service: "lambda",
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

  // Build full URL including query string if any
  const url = new URL(`https://${LAMBDA_HOST}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));
  }

  const response = await fetch(url.toString(), {
    method: signedRequest.method,
    headers: signedRequest.headers,
    body: signedRequest.body,
  });

  return response.json();
}

// --- Frontend API Routes ---
app.get("/states", async (req, res) => {
  try {
    // This calls the Lambda function /api/country/in
    const data = await signedFetch("/api/country/in");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all states data." });
  }
});

app.get("/state/:state_id", async (req, res) => {
  try {
    const stateId = req.params.state_id;
    // This calls the Lambda function /api/state?state_id=...
    const data = await signedFetch("/api/state", "GET", null, { state_id: stateId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data for state ${req.params.state_id}.` });
  }
});

// --- Start server ---
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app instance (as requested, though typically not needed if app.listen is used)
export { app };

/*
    *** IMPORTANT ***
    To run this file in Node.js, you must add "type": "module" 
    to your package.json file.
*/