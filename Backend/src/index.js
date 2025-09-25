// import { app } from "./app.js";
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";

// dotenv.config();

// connectDB()
//   .then(() => {
//     const PORT = process.env.PORT || 9000;
//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("DB Connection Failed", err);
//   });



// src/index.js

import dotenv from "dotenv";
import connectDB from "./db/index.js"; 
import { app } from "./app.js"; // Import the main Express app instance

// NOTE: You must install the dotenv package: npm install dotenv

// Load environment variables from .env file
dotenv.config({
    path: './.env' 
});

// Define the port, defaulting to 8000
const port = process.env.PORT || 8000;

// Connect to MongoDB
// connectDB()
// .then(() => {
//     // START THE SERVER ONLY AFTER DB CONNECTION IS SUCCESSFUL
//     app.listen(port, () => {
//         console.log(`Server running at http://localhost:${port}`);
//     });
// })
// .catch((err) => {
//     console.error("MONGO DB connection failed !!! ", err);
// });

// // The previous duplicate port listening code is REMOVED from here.


// ... (rest of the code remains the same)

// Connect to MongoDB
connectDB()
.then(() => {
    // START THE SERVER ONLY AFTER DB CONNECTION IS SUCCESSFUL
    const server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

    // 💡 IMPROVEMENT: Add listener for server errors (e.g., port conflict)
    server.on('error', (err) => {
        console.error("Server failed to start:", err.message);
        // You might want to exit the process here:
        // process.exit(1); 
    });
})
.catch((err) => {
    console.error("MONGO DB connection failed !!! ", err);
});