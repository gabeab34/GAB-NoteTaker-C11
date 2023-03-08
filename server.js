import express from "express";
import path from "path";
import fs from "fs";
import dbNotes from "./db/db.json" assert { type:'json' };
import uniqid from "uniqid"

const app = express();
const PORT = process.env.PORT || 3003
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/notes.html'))
);

// Added this line per the "getting started" instructions but it screws up the paths if active
// app.get('*', (req, res) =>
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.get('./api/notes/', (req, res) =>
    res.json(dbNotes)
);

app.post('./api/notes', (req, res) => 
    {const newNote = req.body;
    newNote['id'] = uniqid();
    dbNotes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), err => 
    {if(!err)
        {console.log('New note written');
    } else 
        {console.log('There was an error writing your note')
    }
    res.json(dbNotes);
})});

app.delete('./api/notes/:id', (req, res) => 
    {const del = dbNotes.find((newNote) => { newNote.id === req.params.id });
    dbNotes.splice(del, 1);
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), err => 
    {if(!err)
        {console.log('Note has been deleted');
    } else 
        {console.log('There was an error deleting your note')
    }
    res.json(dbNotes);
})});

     


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);