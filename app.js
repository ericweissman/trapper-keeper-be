import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json())

app.locals.title = 'Trapper Keeper';
app.locals.notes = [{ id: 1550017862941, title: "Eric is gone" }, { id: 15500222, title: "Matt is here" }];
app.locals.items = [{ description: 'sup and stuff', noteID: 1550017862941, id: 6 }, { description: 'new2', noteID: 1550017862941, id: 7 }, { description: 'new3', noteID: 1550017862941, id: 8 },
{ description: 'sup aff', noteID: 15500222, id: 2 }, { description: '2222', noteID: 15500222, id: 3 }];

//NOTES
//Get all notes
app.get('/api/v1/notes', (request, response) => {
  const notes = app.locals.notes;
  const items = app.locals.items;
  return response.status(200).json({ notes, items })
});

//add a new note
app.post('/api/v1/notes', (request, response) => {
  const { id, title, items } = request.body;

  if (!title) {
    return response.status(422).json('No note title provided');
  } else {
    app.locals.notes.push({ id, title })
    app.locals.items.push(...items)
    return response.status(201).json({ id, title, items });
  }
});


//get a specific note
app.get('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const note = app.locals.notes.find(note => note.id == id);
  const items = app.locals.items.filter(item => item.noteID == id)

  if (note) {
    return response.status(200).json({ note, items })
  } else {
    return response.status(404).json('That note does not exist!')
  }
});

//delete a specific note
app.delete('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const updatedNotes = app.locals.notes.filter(note => note.id != id)
  const updatedItems = app.locals.items.filter(item => item.noteID != id)

  if (updatedNotes.length !== app.locals.notes.length) {
    app.locals.notes = updatedNotes
    app.locals.items = updatedItems
    return response.status(202).json(`Note ${id} has been deleted successfully`)
  } else {
    return response.status(404).json('That note does not exist, nothing was deleted')
  }
});

//edit a specific note
app.put('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const { title, items } = request.body
  const note = app.locals.notes.find(note => note.id == id);
  if(note) {
    const updatedNotes = app.locals.notes.map((note) => {
      if (note.id == id) {
        note.title = title
      }
      return note
    })
    app.locals.notes = updatedNotes

    const cleanedItems = app.locals.items.filter(item => item.noteID != id)
    app.locals.items = [...cleanedItems, ...items]
    return response.status(202).json(`Note ${id} has been updated`)
  } else {
    return response.status(404).json('That note does not exist, nothing was edited')
  }
  
});

export default app