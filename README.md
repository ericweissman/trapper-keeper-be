**Show Notes**
----
  Returns json data all of the notes.

* **URL**

  api/v1/notes

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    **notes:** `[{ id: 1, title: "New Title" }]`
    **items:** `[{ id: "56d60a", description: "item 1", noteID: 1, timestamp: 99, isCompleted: false }]`
 
* **Error Response:**

  None

* **Sample Call:**

  ```javascript
     fetch('/api/v1/notes', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(YOUR_DATA),
        "Content-Type": "application/json",
      })
      .then(response => response.json())
  ```
  

**Add New Note**
----
  Returns json data all of the note that was added.

* **URL**

  api/v1/notes

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  Note: id,
  Note: title,
  Note: items

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ [{ id: 1, title: "New Title" }], [{ id: 7, description: "item 1", noteID: 1, timestamp: 99, isCompleted: false }] }`
 
* **Error Response:**

  * **Code:** 422 UNPROCCESSABLE ENTITY <br />
    **Content:** `{ message : "No note title provided" }`

* **Sample Call:**

  ```javascript
      fetch('/api/v1/notes', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(YOUR_DATA),
      "Content-Type": "application/json",
    })
    .then(response => response.json())
  ```


**Get Specific Note**
----
  Returns json data all of a specific note.

* **URL**

  api/v1/notes/:id

* **Method:**

  `GET`
  
*  **URL Params**

  Note: id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ [{ id: 1, title: "New Title" }], [{ id: 7, description: "item 1", noteID: 1, timestamp: 99, isCompleted: false }] }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "That note does not exist!" }`

* **Sample Call:**

  ```javascript
    fetch('/api/v1/notes/:id', {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(YOUR_DATA),
      "Content-Type": "application/json",
    })
    .then(response => response.json())
  ```


**Delete a Note**
----
  Returns the id of the note that was deleted.

* **URL**

  api/v1/notes/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  Note: id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 202 <br />
    **Content:** `{ message: "Note 1 has been deleted successfully" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "That note does not exist, nothing was deleted" }`

* **Sample Call:**

  ```javascript
    fetch('/api/v1/notes/:id', {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(YOUR_DATA),
      "Content-Type": "application/json",
    })
    .then(response => response.json())
  ```


**Edit specific Note**
----
  Returns the id of the note that was updated.

* **URL**

  api/v1/notes/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  Note: id

* **Data Params**

  Note: title,
  Note: items

* **Success Response:**

  * **Code:** 202 <br />
    **Content:** `{ message : "Note 1 has been updated" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "That note does not exist, nothing was edited" }`

* **Sample Call:**

  ```javascript
    fetch('/api/v1/notes/:id', {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(YOUR_DATA),
      "Content-Type": "application/json",
    })
    .then(response => response.json())
  ```

## Contributors
[Matthew Foxwell](https://github.com/foxwellm)

[Travis Gee](https://github.com/geet084)

[Eric Weissman](https://github.com/ericweissman)
