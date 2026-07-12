
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import assetFlowRouter from "./routes/assetFlow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

app.use(cookieParser());

app.use("/api", assetFlowRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

export { app };
