const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shuttingdown due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} `);
});

//unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shuttingdown due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
