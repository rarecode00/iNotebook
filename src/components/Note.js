import { useContext , useEffect, useRef , useState} from "react"
import NoteContext from "../context/notes/noteContext"
import React from 'react'
import NoteItem from "./NoteItem"
import AddNote from "./AddNote"
import { useNavigate } from "react-router-dom"
import "../NoteItemCss.css"
const Note = (props) => {
  const context = useContext(NoteContext)
  const {notes , getNotes , editNote} = context;
  
  const [note, setnote] = useState({id : "" , etitle : "" , edescription: "" , etag: ""})

  const navigate = useNavigate("");

  useEffect(() =>{
    if(localStorage.getItem('token')){
      getNotes();
    }else{
       navigate("/login");
    }
    // eslint-disable-next-line
  } , [])

  const onchange = (e) =>{
    setnote({...note , [e.target.name] : [e.target.value]})
  }
 
  const updateNote = (currentNote) =>{
      ref.current.click()
      setnote({id: currentNote._id , etitle : currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
  }

  const editNote1 = () =>{
      editNote(note.id , note.etitle , note.edescription , note.etag)
      props.showAlert("Note Updated Successfully" , "success");
      ref1.current.click()
  }

  const ref = useRef(null)
  const ref1 = useRef(null)


  return (
    <>
      <AddNote showAlert = {props.showAlert}/>

      <button ref = {ref} type="button" className="add-button btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
              <button type="button" className="add-button btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {/* ------------------------------Body of the modal----------------------------------------------- */}
            <form className='mx-4'>
               <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value = {note.etitle} name = "etitle" aria-describedby="emailHelp" minLength={5} onChange={onchange}/>
              </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="desc" className="form-control" id="description" value = {note.edescription} name = "edescription" minLength={5} onChange = {onchange}/>
                  </div>
            </form>
            {/*----------------------------- End of the modal--------------------------------------------------- */}
            </div>
            <div className="modal-footer">
              <button type="button" className=" add-button btn btn-secondary" ref={ref1} data-bs-dismiss="modal">Close</button>
              <button type="button" className="add-button btn btn-primary" onClick={editNote1}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row my-4 mx-3">
           {notes.map((note) =>{
           // console.log(note);
            return <NoteItem key = {note._id} showAlert = {props.showAlert} updateNote = {updateNote} note = {note}/>;
          })}
      </div>
  </>
  )
}

export default Note