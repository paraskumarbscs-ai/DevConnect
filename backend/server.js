import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`DevConnect API running on port ${PORT}`));
}).catch((error) => {
  console.error("Database connection failed:", error.message);
  process.exit(1);
});
