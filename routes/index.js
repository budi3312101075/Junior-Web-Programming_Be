import express from "express";
import auth from "./auth.js";
import ekskul from "./ekskul.js";
import pendaftaran from "./pendaftaran.js";

const app = express();

const api = "/api/v1";

app.use(api, auth);
app.use(api, ekskul);
app.use(api, pendaftaran);

export default app;
