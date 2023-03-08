const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Router 1

router.get('/fetchallnotes' , fetchuser , async (req , res) =>{
       console.log("Hello it's running allright")
       const notes = await Notes.find({user : req.user.id});
       res.json(notes);
})

// Router 2

router.post('/addnote' , fetchuser , [
    body('title' , 'Enter the valid title').isLength({ min: 3 }),
    body('description' , 'Enter the valid description').isLength({ min: 5 }),
] ,  async(req , res) =>{    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

    let {title , description , tag} = req.body;

     title = title.toString();
     description = description.toString();
  //  if(!tag) tag = "default";

    const note = new Notes({
        title , description , tag , user: req.user.id
    })

    const saveNote = await note.save();

    res.json(saveNote);

} catch(error){
    console.log(error);
    res.status(500).send("Some error occured");
 }
    
})


//Router 3

router.put('/updatenote/:id' , fetchuser , async(req , res) =>{
       try{
       const {title , description , tag} = req.body;

       // create new note

       const newNote = {};

       if(title){
          newNote.title = title.toString();
       }
       if(description){
        newNote.description = description.toString();
       }

       if(tag){
        newNote.tag = tag.toString();
       }

    //    console.log("...................." + newNote.title + "........." + newNote.description + ".........");
    //    console.log("---------" + req.params.id);

       // Find the note to be updated

       let note = await Notes.findById(req.params.id);

       if(!note){return res.status(404).send("Not Found")}

       if(note.user.toString() !== req.user.id){
           return res.status(401).send("Not allowed");
       }

      // console.log("^^^^^^^^^^" + note.title);
       note = await Notes.findByIdAndUpdate(req.params.id  , newNote , {new : true})
       res.json({note});
    }catch(error){
        console.log(error);
        res.status(500).send("Some internal error");    
    }
})

//Router 4

router.delete('/deletenote/:id' , fetchuser , async(req , res) =>{
    try{
    const {title , description , tag} = req.body;   

    let note = await Notes.findById(req.params.id);

    if(!note){return res.status(404).send("Not Found")}

    // console.log(note.user.toString());
    // console.log(req.user.id);
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }


    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Sucess" : "Note has been deleted"})
  }catch(error){
     console.log(error);
     res.status(500).send("Some internal Error");
  }
})

module.exports = router;