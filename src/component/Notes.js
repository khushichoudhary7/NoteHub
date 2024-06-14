import React, { useContext, useEffect , useRef ,useState} from 'react';
// import NoteState from '../Context/notess/NoteStates';
import NoteContext from '../Context/notess/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  let navigate=useNavigate();
  const context = useContext(NoteContext);
  const { notes, getData ,editNote} = context;
  useEffect(() => {
   
    if(localStorage.getItem('token')){
    getData();
    }
    else{
      navigate('/logup')
    }
    // eslint-disable-next-line
  }, [])
  const [note, setnotes] = useState({id:"", utitle: "", udescription: "", utag: "" });
  const update = (currentnote) => {
      ref.current.click();
      setnotes({id:currentnote._id,utitle: currentnote.title , udescription:currentnote.description, utag:currentnote.tag})
      
  }
  const ref = useRef(null);
  const refclose=useRef(null)
  
  const handleclick = (e) => {
    console.log("updating the note....",note)
    editNote(note.id,note.utitle,note.udescription,note.utag)
    props.showalert("Successfully updated the Note","success")
    refclose.current.click()

    // e.preventDefault();
    // addNote(notes.title,notes.description,notes.tag);
    // setnotes({title: "", description: "", tag: ""})
  }
  const onchange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>

      <Addnote showalert={props.showalert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="utitle" name='utitle' value={note.utitle} placeholder="Enter Your Title" onChange={onchange} />
          </div>
         
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="udescription" rows="3" name='udescription' value={note.udescription} onChange={onchange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" id="utag" name='utag' placeholder="Enter Your Tag" value={note.utag} onChange={onchange} />
          </div>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.utitle.length<3 || note.udescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>update changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>your Notes</h2>
        <div className='container'>
        {notes.length===0 && 'No Notes are there to Display'}
        
        </div>
        {notes.map((note) => {
          return <NoteItem keys={note._id} update={update} showalert={props.showalert} note={note} />;
        })}
      </div>


    </>
  );
}

export default Notes
