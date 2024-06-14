import React ,{ useContext }from 'react';
import Notes from './Notes';
import Addnote from './Addnote';

const Home = (props) => {
  const {showalert}=props
  return (
    <div>
     
      <Notes showalert={showalert}/>
    </div>
    
  );
}

export default Home;
