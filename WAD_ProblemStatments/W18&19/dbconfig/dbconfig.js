const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

/*
useNewUrlParser: true: Uses the modern MongoDB connection string parser (recommended).
useUnifiedTopology: true: Uses the new server discovery and monitoring engine (avoids old warnings).
*/

