
import { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import Navbar from './components/Navbar';
import TaskItem from './components/TaskItem';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [taskItem, setTaskItem] = useState("");


  const handleTaskItem = (e) => {
    const isChecked = false;
    const isDeleted = false;
    let task = { name: taskItem, isChecked, isDeleted };
    // console.log(task);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        handleAddTask(data);
      });
  };

  // ////////////////////////////////////////////
  const [tasks, setTasks] = useState([]);
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  // ///////////////////////////////////////////
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [refresh]);
  // //////////////////////  Delete    /////////////////////
  const handleDelete = (id) => {
    console.log(id);
    const newTask = tasks.find((task) => task._id === id);
    const updatedTask = { ...newTask, isDeleted: !newTask?.isDeleted };

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRefresh(!refresh);
        }
      });
  };
  // ////////////////////////// Update  ///////////////////////////
  const handleUpdate = (id) => {
  
    const newTask = tasks.find((task) => task._id === id);
    const updatedTask = { ...newTask, isChecked: !newTask?.isChecked };
    console.log(updatedTask);
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTaskItem(updatedTask);
          setRefresh(!refresh);
        }
      });
  };



  return (
    <div className="App">
      <Navbar></Navbar>
      <InputField
      handleTaskItem={handleTaskItem}
      setTaskItem={setTaskItem}

      ></InputField>
      {/* <TaskItem></TaskItem> */}
      {
      tasks?.map((item) => (
        <TaskItem
        handleTaskItem={handleTaskItem}
          refresh={refresh}
          setRefresh={setRefresh}
          handleDelete={handleDelete}
          tasks={tasks}
          key={item?._id}
          handleUpdate={handleUpdate}
          item={item}
          
        ></TaskItem>
      ))
      
      }
      
      
      
    </div> 
  );
}

export default App;
