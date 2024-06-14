import React, { useContext } from 'react';
import NoteContext from '../Context/notess/NoteContext';
const NoteItem = (props) => {
    const context= useContext(NoteContext);
    const{deleteNote}=context;
    const { note , update } = props;
    const handledelete=()=>{
            deleteNote(note._id)
            props.showalert("Successfully deleted the Note","success")
    }
    const handleedit=()=>{
            update(note);
           
    }

    return (
       
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                    <h5 className="card-title ">{note.title}</h5>
                    <i className="fa-regular fa-trash-can mx-3" onClick={handledelete}></i>
                    <i className="fa-regular fa-pen-to-square mx-3" onClick={handleedit}></i>
                    </div>
                    <p className="card-text">{note.description} </p>
                    

                </div>
            </div>

        </div>
    );
}

export default NoteItem;
