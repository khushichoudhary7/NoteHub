const express = require('express')
const Notes=require('../models/Notes')
const router = express.Router();
const getuser=require('../middleware/getuser')
const { body, validationResult } = require('express-validator');
// Route 1 : get all the notes from user "get : /api/notes/fetchnotes " login required 
router.get('/fetchnotes', getuser,async(req,res)=>{
    try{
const notes=await Notes.find({user:req.user.id})
res.json({notes})
    }
catch(error){
    console.error(error.message);
    res.status(500).send("may be some error occur check it")
  }
})

// Route 2 : add new notes for user "post : /api/notes/addnote " login required 
router.post('/addnote', getuser,[
    body('title','Enter the valid title').isLength({min:3}),
    body('description','Enter the description with minimum 5 length').isLength({min:5})
],async(req,res)=>{

    
    // if error occur return bad error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    const {title,description,tag}=req.body
    const note = new Notes({
title,description,tag,user:req.user.id
})
const savednote = await note.save() 
    res.json(savednote)
}catch(error){
    console.error(error.message);
    res.status(500).send("may be some error occur check it")
  }
    })

 // Route 3 : update notes for user "post : /api/notes/updatenote " login required 

 router.put('/updatenote/:id', getuser,async(req,res)=>{
  const{title,description,tag}=req.body;
  try{
  // create new note object
  const newNote={}
  if(title){
    newNote.title=title;
  }
  if(description){
    newNote.description=description;
  }
  if(tag){
    newNote.tag=tag;
  }

  //find the node to be updated and update it
  let note= await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
  }
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})
}catch(error){
  console.error(error.message);
  res.status(500).send("may be some error occur check it")
}
})
// Route 4 : delete notes for user "delete : /api/notes/deletenote " login required 

router.delete('/deletenote/:id', getuser,async(req,res)=>{
  // const{title,description,tag}=req.body;
 try{

  //find the node to be updated and update it
  let note= await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("not found")
  }
  // allowing user to delete only his own notes
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
  }
note=await Notes.findByIdAndDelete(req.params.id)
res.json({ "successfully note is deleted ":note})
}catch(error){
  console.error(error.message);
  res.status(500).send("may be some error occur check it")
}
})
module.exports=router