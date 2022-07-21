import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';


const TodoList = () => {
    const [modal, setModal] = useState(false); //state is created

  /*creating another state which would be an array that will save all the tasks we have entered,
firstly it would be an empty array*/

const [taskList, setTaskList] = useState([])


//using the use effect hook to fetch the data from localstorage and store all our variables in arr
  
useEffect(() => {
  let arr = localStorage.getItem("taskList")
 
  if(arr){
      let obj = JSON.parse(arr)
      setTaskList(obj)
  }
}, [])   /*passing an empty array  here because if we do not pass it this useeffect will run everytime
          we want to use it only once when the component is re rendered  or while we r refreshing the page then only we want to use it */



/*a function needs to be created because this will delete the index in array in which we have stored the tassk */

const deleteTask = (index) => {

 let tempList=taskList
 tempList.splice(index,1)  // using this function we can do addition ,deletion ,insertion and replacement
localStorage.setItem("taskList",JSON.stringify(tempList))
setTaskList(tempList)
window.location.reload()
}   //we also need to pass this function as a prop to card so that it can be availiable to the card component

const updateListArray=(obj,index)=>{
let tempList=taskList
tempList[index]=obj
localStorage.setItem("taskList",JSON.stringify(tempList))
setTaskList(tempList)
window.location.reload()
}

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
  localStorage.setItem("taskList", JSON.stringify(tempList))   //we cannot store array dirctly in local storage so we have to convert it into string thorough json.stringify
  setTaskList(taskList)                                        //we can see these things in console application
  setModal(false)
}

  return (                    // one div  for the header & other div for the task container
  /*we will take index because of the colors array and when we delete ank object we must know the index od that object*/
    <>                  
      <div className = "header text-center">
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className = "task-container">
            { taskList && taskList.map((obj,index ) => <Card taskObj={obj} index = {index} deleteTask = {deleteTask} updateListArray={updateListArray}/>)} 
            </div>                      
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>                                //  2 props are passed and funtion is created
  );
};

export default TodoList;
