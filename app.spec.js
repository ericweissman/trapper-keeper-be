import request from 'supertest'
import '@babel/polyfill'
import app from './app'

describe('api', () => {

  let notes
  let items
  beforeEach(() => {
    notes = [{ id: 1, title: "Eric is gone" }, { id: 2, title: "Matt is here" }];
    items = [{ description: 'sup and stuff', noteID: 1, id: 1 }, { description: 'new2', noteID: 1, id: 2 }, { description: 'new3', noteID: 1, id: 3 },
    { description: 'sup aff', noteID: 2, id: 1 }, { description: '2222', noteID: 2, id: 2 }];
    app.locals.notes = notes
    app.locals.items = items
  })

  describe('get /api/v1/notes', () => {
    it('should respond with a response of 200 and all current notes and items', async () => {
      //execution
      const response = await request(app).get('/api/v1/notes')
      //expectation
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ notes, items })
    })
  })

  describe('post /api/v1/notes', () => {
    it('should add a new note with associated items and give response of 201', async () => {
      //setup
      const newNote = { id: 3, title: 'title', items: [{ id: 1, description: 'whatever text', noteID: 3 }] }
      expect(app.locals.items.length).toEqual(5)
      //execution
      const response = await request(app).post('/api/v1/notes').send(newNote)
      //expectation
      expect(response.status).toBe(201)
      expect(response.body).toEqual(newNote)
      expect(app.locals.notes[2]).toEqual({ id: newNote.id, title: newNote.title })
      expect(app.locals.items.length).toEqual(5 + newNote.items.length)
      expect(app.locals.items[app.locals.items.length - 1]).toEqual(newNote.items[0])
    })

    it('should return a response of 422 if no title is given', async () => {
      //setup
      const newNote = { id: 3, title: '', items: [{ id: 1, description: 'whatever text', noteID: 3 }] }
      expect(app.locals.notes.length).toEqual(2)
      //execution
      const response = await request(app).post('/api/v1/notes').send(newNote)
      //expectation
      expect(response.status).toBe(422)
      expect(response.body).toEqual('No note title provided')
      expect(app.locals.notes.length).toEqual(2)
    })
  })

  describe('get /api/v1/notes/:id', () => {
    it('should return status of 200 and the correct note and items associated with note', async () => {
      //setup
      const responseItems = app.locals.items.filter(item => item.noteID == 1)
      const responseNote = app.locals.notes[0]
      //execution
      const response = await request(app).get('/api/v1/notes/1')
      //expectation
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ note: responseNote, items: responseItems })
    })
    it('should return status of 404 if note does not exist', async () => {
      //execution
      const response = await request(app).get('/api/v1/notes/3')
      //expectation
      expect(response.status).toBe(404)
      expect(response.body).toEqual('That note does not exist!')
    })
  })

  describe('delete /api/v1/notes/:id', () => {
    it('should return status of 202 and remove note and associated items', async () => {
      //execution
      const response = await request(app).delete('/api/v1/notes/1')
      //expectation
      expect(response.status).toBe(202)
      expect(response.body).toEqual('Note 1 has been deleted successfully')
    })

    it('should return status of 404 if note does not exist', async () => {
      //execution
      const response = await request(app).delete('/api/v1/notes/3')
      //expectation
      expect(response.status).toBe(404)
      expect(response.body).toEqual('That note does not exist, nothing was deleted')
    })
  })

  describe('put /api/v1/notes/:id', () => {
    it('should return status of 202 and message with note at that id has been updated', async () => {
      //setup
      const currentNote = { id: 1, title: "Eric is gone", items: [{ description: 'sup and stuff', noteID: 1, id: 1 }, { description: 'new2', noteID: 1, id: 2 }, { description: 'new3', noteID: 1, id: 3 }] }
      const expectedNote = { id: 1, title: "Eric is here", items: [{ description: 'changed description', noteID: 1, id: 1 }, { description: 'new2', noteID: 1, id: 2 }, { description: 'new3', noteID: 1, id: 3 }, { description: 'new added note', noteID: 1, id: 4 }] }
      expect(app.locals.notes[0]).toEqual({ id: currentNote.id, title: currentNote.title })
      expect(app.locals.items.slice(0, 3)).toEqual(currentNote.items)
      //execution
      const response = await request(app).put('/api/v1/notes/1')
        .send({ title: expectedNote.title, items: expectedNote.items })
      //expectation
      expect(response.status).toBe(202)
      expect(app.locals.notes[0]).toEqual({ title: expectedNote.title, id: expectedNote.id })
      expect(app.locals.items.slice(-4)).toEqual(expectedNote.items)
    })

    it('should return status of 404 if note does not exist', async () => {
      //execution
      const response = await request(app).put('/api/v1/notes/3')
      //expectation
      expect(response.status).toBe(404)
      expect(response.body).toEqual('That note does not exist, nothing was edited')
    })
  })
})
