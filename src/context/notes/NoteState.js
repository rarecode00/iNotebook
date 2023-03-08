import React , {useState} from 'react'
import NoteContext from './noteContext'

const NoteState = (props) =>{
   const host = "http://localhost:5000";
   const notesInitial = []

  const [notes, setnotes] = useState(notesInitial)

  const getNotes = async() =>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
      
    const json = await response.json()
    console.log(json) 
     setnotes(json);
  }

  const addNote = async(title , description , tag) =>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title , description , tag})
    });
    
    const json =  await response.json();
    console.log(json);
    getNotes();
     //setnotes(notes.concat(json));
  }

  const editNote = async(id , title , description , tag) =>{

     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title , description , tag})
    });
    
    const json =  await response.json();
    console.log(json);
    getNotes();
  }

  const deleteNote = async(id) =>{
     //console.log("Deleting the note id" + id);
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    
     const json = await response.json();
    console.log(json);
     getNotes();
  }



    return (
        <NoteContext.Provider value = {{notes ,getNotes, setnotes , addNote , editNote , deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState