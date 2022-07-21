import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


/*this edit task will also be same as create task a pop will occur with the same enteries as entered before
and then we can edit this as per our need */

const EditTaskpopup = ({modal,toggle,updateTask,taskObj }) => {         // destructuring we will pass modals and toggle through todolist.js
  
const [taskName, setTaskName] = useState('');
const [description, setDescription] = useState('');

  const handleChange = (e) => {   
     const{name,value}=e.target   

    if(name==="taskName")
    {
      setTaskName(value)
    }else{
        setDescription(value)
    }
  }

  useEffect((obj) => {
    setTaskName(taskObj.Name)
    setDescription(taskObj.Description)
},[])

  const handleUpdate = (e) =>
  {
    e.preventDefault();
    let taskObj = {}     //temporary object will have property of name and description to save taskname and descriiption
    taskObj['Name'] = taskName
    taskObj['Description'] = description
    updateTask(taskObj) 
  }  
   

  
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Task</ModalHeader>
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
        <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
  </Modal>
);
};

export default EditTaskpopup;