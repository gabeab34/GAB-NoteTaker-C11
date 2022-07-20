import express from "express";

const app = express();
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));