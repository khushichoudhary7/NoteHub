import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { json } from "react-router-dom";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialnote = []

  const [notes, setnotes] = useState(initialnote);
  
  //  Fetching notes
  const getData = async () => {
    // ADD API
    const response = await fetch('http://localhost:5000/api/notes/fetchnotes', {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') 
       }
 
    });
    const json = await response.json();
    console.log(json);
    setnotes(json.notes)
  }
  // Add a note
  const addNote = async (title, description, tag) => {
    // ADD API
    
    const response = await fetch('http://localhost:5000/api/notes/addnote', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token') 
       },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    console.log("adding a new note")
    const note = await response.json();
    setnotes(notes.concat(note))
    
  }


  // Deleting a Note
  const deleteNote = async(id) => {

    //API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')  },
    });
     const json = await response.json();
     console.log(json)
    console.log("deleting a note with id " + id)
    const newNotes = notes.filter((note) => {
      return note._id !== id

    })
    setnotes(newNotes)
  }

  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')  },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
     const json = await response.json();
     console.log(json)
let newnote=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description= description;
        newnote[index].tag = tag;
        break;
      }

    }
    setnotes(newnote)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote ,getData, editNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;