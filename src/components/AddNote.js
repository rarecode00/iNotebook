import React , {useContext , useState} from 'react'
import NoteContext from "../context/notes/noteContext"
import "../NoteItemCss.css"

const AddNote = (props) => {
   const context = useContext(NoteContext)
   const {addNote} = context;

   const [note, setnote] = useState({title : "" , description: "" , tag: "default"})

   const handleClick = (e) =>{
       e.preventDefault();
       if(note.title.toString().length < 5 || note.description.toString().length < 5){
          props.showAlert("Length of title and description must be at least 5" , "danger");
          return;
       }
       addNote(note.title , note.description , note.tag);
       props.showAlert("Note Added successfully" , "success");
   }

   const onchange = (e) =>{
       setnote({...note , [e.target.name] : [e.target.value]})
   }

  return (
    <div>
     <div className="container mx-3 my-3">
       <h1 className='text-center txt'>Add a New Note</h1>
      </div>
      <form>
     <div className="mb-3 col-sm-6 container">
      <input type="text" className="form-control mx-6" id="title" name = "title" placeholder = "Enter Your Title Here...." aria-describedby="emailHelp" onChange={onchange}/>
    </div>
    <div className="mb-3 col-md-6 container">
      <input type="text" className="form-control" id="description" name = "description" placeholder='Enter Your Description Here...' onChange = {onchange}/>
    </div>
    <button  type="submit" className="add-button btn btn-primary d-grid gap-2 col-2 mx-auto" onClick={handleClick}>Add Note</button>
   </form>
    </div>
  )
}

export default AddNote