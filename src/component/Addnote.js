import React, { useContext, useState } from 'react';
import NoteContext from '../Context/notess/NoteContext';
import Alert from './Alert';


const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote  } = context;
  const [notes, setnotes] = useState({ title: "", description: "", tag: "default" });
  const handleclick = (e) => {
    // <Alert messsage=""/>
    e.preventDefault();
    addNote(notes.title,notes.description,notes.tag);
    props.showalert("Your Note is Successfully added in Your NoteHub🧧 Enjoy","success")
    setnotes({title: "", description: "", tag: ""})
  }
  const onchange = (e) => {
    setnotes({ ...notes, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className='container my-3'>
        <h2>Add Notes</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' placeholder="Enter Your Title"  value={notes.title} onChange={onchange} />
          </div>
         
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="3" name='description' value={notes.description} onChange={onchange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" id="tag" name='tag' placeholder="Enter Your Tag" value={notes.tag} onChange={onchange} />
          </div>
          <div className="col-auto">
            <button disabled={notes.title.length<3 || notes.description.length<5} type="submit" className="btn btn-primary mb-3" onClick={handleclick}>Add It</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Addnote;
