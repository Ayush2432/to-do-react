import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({modal,toggle,save}) => {         // destructuring we will pass modals and toggle through todolist.js
   
/*we have to create state to store whatever is entered in the task bar or description,
create 2 states one for create task and other for the description*/

const [taskName, setTaskName] = useState('');
const [description, setDescription] = useState('');

/*firstly we would not be able to write anything in the bar as we associated it with state 
 this handlechange function will contain the default value event..to update it we will have a handler function 
 onchange describes that whenever changes in the text bars we want to update the state so we can see that 
 what user has entered*/

  const handleChange = (e) => {   //name has to be given as when we would submit the form this name will pass
     const{name,value}=e.target   // this can also be done as const{name,value}=e.target,,,,, this extracts the name and value from the target

    if(name==="taskName")
    {
      setTaskName(value)
    }else{
        setDescription(value)
    }
  }

/* this function will push this taskobject in this array*/

  const handleSave = (e) =>
  {
    e.preventDefault()
    let taskObj = {}
    taskObj["Name"] = taskName
    taskObj["Description"] = description
    save(taskObj) 
  }  
   
 /*now we have to do that create  a function a cardmust be created in parent component
  so that whatever we enter here must be saved in the parent component*/

  
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
        
                <div className = "form-group">
                    <label>Task Name</label>
                    <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                </div>
                <div className = "form-group">
                    <label>Description</label>
                    <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                </div>
            
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={handleSave}>Create</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
  </Modal>
);
};

export default CreateTaskPopup;