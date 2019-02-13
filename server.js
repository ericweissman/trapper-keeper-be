const express = require('express');
const app = express();
app.use(express.json())

app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}`)
})

app.locals.title = 'Trapper Keeper';
app.locals.notes = [{ id: 1550017862941, title:"Eric is gone"}];
app.locals.items = [];

//NOTES
//Get all notes
app.get('/api/v1/notes', (request, response) => {
  const notes = app.locals.notes;
  return response.json({notes})
});

//add a new note
app.post('/api/v1/notes', (request, response) => {
  // const id = Date.now();
  const { id, title } = request.body;

  if (!title) {
    return response.status(422).send({
      error: 'No note title provided'
    });
  } else {
    app.locals.notes.push({ id, title })
    return response.status(201).json( { id, title });
  }
});


//get a specific note
app.get('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const note = app.locals.notes.find(note => note.id == id);
  if (note) {
    return response.status(200).json(note)
  } else {
    return response.sendStatus(404)
  }
});

//delete a specific note
app.delete('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const updatedNotes = app.locals.notes.filter((note) => {
    return note.id != id
  })
  app.locals.notes = updatedNotes
  response.status(202).json(`Note ${id} has been deleted`)
});

//edit a specific note
app.put('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const updatedNotes = app.locals.notes.map((note) => {
    if (note.id == id) {
      note.title = request.body.title
    } 
      return note
  })
  app.locals.notes = updatedNotes
  response.status(202).json(`${request.body.title} has been updated`)
});

//ITEMS
app.get('/api/v1/items', (request, response) => {
  const items = app.locals.items;
  return response.json({ items })
});

app.post('/api/v1/items', (request, response) => {
  const id = Date.now();

  const { description, isComplete, noteID } = request.body;

  if (!title) {
    return response.status(422).send({
      error: 'No note title provided'
    });
  } else {
    app.locals.notes.push({ id, title })
    return response.status(201).json({ id, title });
  }
});

app.get('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const note = app.locals.notes.find(note => note.id == id);
  if (note) {
    return response.status(200).json(note)
  } else {
    return response.sendStatus(404)
  }
});

app.delete('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const updatedNotes = app.locals.notes.filter((note) => {
    return note.id != id
  })
  app.locals.notes = updatedNotes
  response.status(202).json(`Note ${id} has been removed`)
});

app.put('/api/v1/notes/:id', (request, response) => {
  const { id } = request.params;
  const updatedNotes = app.locals.notes.map((note) => {
    if (note.id == id) {
      note.title = request.body.title
    }
    return note
  })
  app.locals.notes = updatedNotes
  response.status(202).json(`${request.body.title} has been updated`)
});