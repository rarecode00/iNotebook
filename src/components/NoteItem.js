import React, { useContext } from 'react'
import NoteContext from "../context/notes/noteContext"
import "../NoteItemCss.css"

const NoteItem = (props) => {
    const {title , description} = props.note;
    const context = useContext(NoteContext);
    const {note , updateNote} = props
    const {deleteNote} = context
  return (
     <div className="col-md-3 card mx-4 my-2">
        <div className="card my-3">
            <div className="card-body">
                <div className='container'>
                    <h5 className="card-title">{title}</h5>   
                </div>
                <div className="d-flex justify-content-end align-self-start">
                <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Note deleted Successfully" , "success")}}></i>
                <i className="fa-solid fa-pen-to-square" onClick={() =>{updateNote(note)}}></i>
                </div>
                <p className="card-text">{description}</p>
            </div>
        </div>
     </div>
  )
}

export default NoteItem