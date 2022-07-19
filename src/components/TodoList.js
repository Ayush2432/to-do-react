import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'


const TodoList = () => {
    const [modal, setModal] = useState(false); //state is created

  /*creating another state which would be an array that will save all the tasks we have entered,
firstly it would be an empty array*/

const [taskList, setTaskList] = useState([])


//using the use effect hook to fetch the data from localstorage
  
useEffect(() => {
  let arr = localStorage.getItem("taskList")
 
  if(arr){
      let obj = JSON.parse(arr)
      setTaskList(obj)
  }
}, [])



  const toggle = () => {                    // creating toggle function we r just changing the modal state
    setModal(!modal);
  }

/*a function would be created that will update the array with the task user has
 created and initially it will take an object and then we will push this taskobj to the tasklist array 
1.first we would grab the initial array
2.then in the temporarylist lets push the taskobj
3.when temporary list is updated then lets update our initial tasklist
4.initialise setmodal with false so that afte creating the popup must be closed
5.pass this savetask function in the childcomponent so that child component can use this function*/

const saveTask = (taskObj) => {
  let tempList = taskList
  tempList.push(taskObj)
  localStorage.setItem("taskList", JSON.stringify(tempList))
  setTaskList(taskList)
  setModal(false)
}

  return (                                // one div  for the header & other div for the task container
    <>
      <div className = "header text-center">
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className = "task-container">
            { taskList.map((obj ) => <li>{obj.Name}</li> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>                                //  2 props are passed and funtion is created
  );
};

export default TodoList;
