import express from "express";

const app = express();
const port = process.env.port || 3003

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);