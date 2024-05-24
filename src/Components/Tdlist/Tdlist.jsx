import React, { useState, useEffect, useRef } from 'react';
import './Tdlist.css';
import { auth, db } from '../Firebase/Firebase';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

const Tdlist = () => {
  const [mainSections, setMainSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState({ sectionId: null, todoId: null });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addSection = () => {
    if (sectionName !== '') {
      setMainSections([...mainSections, { id: Date.now(), name: sectionName, pendingTodos: [], completedTodos: [] }]);
      setSectionName('');
    }
  };

  const addTodo = (sectionId) => {
    if(todo !== ''){
      const currentTime = new Date().toLocaleString();
    const newTodo = { list: todo, id: Date.now(), status: false, createdTime: currentTime, updatedTime: '' };

    setMainSections(mainSections.map(section => {
      if (section.id === sectionId) {
        if (edit.todoId) {
          const updatedPendingTodos = section.pendingTodos.map(t => t.id === edit.todoId ? { ...t, list: todo, updatedTime: currentTime } : t);
          return { ...section, pendingTodos: updatedPendingTodos };
        } else {
          return { ...section, pendingTodos: [...section.pendingTodos, newTodo] };
        }
      }
      return section;
    }));

    setEdit({ sectionId: null, todoId: null });
    setTodo('');
    }
  };

  const onDeleteTodo = (sectionId, todoId) => {
    setMainSections(mainSections.map(section => {
      if (section.id === sectionId) {
        const pendingTodos = section.pendingTodos.filter(t => t.id !== todoId);
        const completedTodos = section.completedTodos.filter(t => t.id !== todoId);
        return { ...section, pendingTodos, completedTodos };
      }
      return section;
    }));
  };

  const onToggleTodoStatus = (sectionId, todoId) => {
    const currentTime = new Date().toLocaleString();

    setMainSections(mainSections.map(section => {
      if (section.id === sectionId) {
        const pendingTodo = section.pendingTodos.find(t => t.id === todoId);
        if (pendingTodo) {
          const pendingTodos = section.pendingTodos.filter(t => t.id !== todoId);
          const completedTodos = [...section.completedTodos, { ...pendingTodo, status: true, updatedTime: currentTime }];
          return { ...section, pendingTodos, completedTodos };
        } else {
          const completedTodo = section.completedTodos.find(t => t.id === todoId);
          const completedTodos = section.completedTodos.filter(t => t.id !== todoId);
          const pendingTodos = [...section.pendingTodos, { ...completedTodo, status: false, updatedTime: currentTime }];
          return { ...section, pendingTodos, completedTodos };
        }
      }
      return section;
    }));
  };

  const onEditTodo = (sectionId, todoId) => {
    const section = mainSections.find(section => section.id === sectionId);
    const todo = section.pendingTodos.find(t => t.id === todoId);
    setTodo(todo.list);
    setEdit({ sectionId, todoId });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!!");
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1>Todo List</h1>
          <div className="section-input">
          <input 
            type="text" 
            placeholder="Add main section" 
            value={sectionName} 
            onChange={(e) => setSectionName(e.target.value)} 
          />
         <button onClick={addSection}>Add Section</button>
         <button className="btn2" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        {mainSections.map(section => (
          <div key={section.id} className="section">
            <h2 id="Section-name" >{section.name}</h2>
            <form onSubmit={handleSubmit}>
              <div id="in-bu-section">
                <div className="input-section-place">
                  <input 
                    type="text" 
                    placeholder='Add todo' 
                    value={todo} 
                    onChange={(event) => setTodo(event.target.value)} 
                  />
                  <button onClick={() => addTodo(section.id)}>{edit.todoId && edit.sectionId === section.id ? 'Edit' : 'Add'}</button>
                </div>
                <h3 id='pending-todos'>Pending Todos</h3>
                <ul>
                  {section.pendingTodos.map(to => (
                    <li className='li' key={to.id}>
                      <div className='lit'>{to.list}</div>
                      <div className='timestamp'>
                        <div>Created: {to.createdTime }|</div>
                        {to.updatedTime && <div>  Updated: {to.updatedTime}</div>}
                      </div>
                      <MdModeEdit className='icons' id='edit' title='Edit' onClick={() => onEditTodo(section.id, to.id)} />
                      <MdDelete className='icons' id='del' title='Delete' onClick={() => onDeleteTodo(section.id, to.id)} />
                      <IoMdDoneAll className='icons' id='done' title='Done' onClick={() => onToggleTodoStatus(section.id, to.id)} />
                    </li>
                  ))}
                </ul>
                <h3 id='completed-todos'>Completed Todos</h3>
                <ul>
                  {section.completedTodos.map(to => (
                    <li className='li' key={to.id}>
                      <div className='lit' id='lt'>{to.list}</div>
                      <div className='timestamp'>
                        <div>Created: {to.createdTime}</div>
                        {to.updatedTime && <div> | Updated: {to.updatedTime}</div>}
                      </div>
                      <MdDelete className='icons' id='del' title='Delete' onClick={() => onDeleteTodo(section.id, to.id)} />
                      <IoMdDoneAll className='icons' id='done' title='Undo' onClick={() => onToggleTodoStatus(section.id, to.id)} />
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tdlist;

