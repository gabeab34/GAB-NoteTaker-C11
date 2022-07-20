import express from "express";
import path from "path";

const app = express();
const port = process.env.port || 3003
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile((__dirname + '/public/index.html'))
);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);