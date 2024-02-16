"use strict";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, `/.env.${process.env.NODE_ENV}`) })
import connectDB from "./app/config/db.config.js";

import rootRouter from "./app/routes/index.js";
import { responseSend } from "./app/helpers/responseSend.js";

import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

const port = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(cors());
app.use(express.json());
connectDB();

// test if working
app.use("/health", (req, res) => res.send("ok"));

if (NODE_ENV === "development" || NODE_ENV === "local") {
    app.use(morgan("dev"));
}

app.use("/", rootRouter);

app.use('/public', express.static(__dirname + '/public'));

//for errors
app.use((error, req, res, next) => {
    if (!error) {
        return next();
    }
    return responseSend(res, 400, error.message);
});

app.listen(port, () => {
    console.log("== Server running on Port ==", port);
});