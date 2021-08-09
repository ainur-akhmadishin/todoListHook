import React, { useState} from 'react';
import './new-task-form.css';

 const  NewTaskForm   = ({addTask}) =>{
	 
  NewTaskForm.defaultProps = {
    addTask: () => {},
  };

  
  const  [text, useText] = useState('');
  const  [min, useMin] = useState('');
  const  [sec, useSec] = useState('');
	  

  const AddText = event =>  useText(event.target.value);
  const AddMin = event =>  useMin(event.target.value);
  const AddSec = event =>  useSec(event.target.value);
        


  const toSecund = (minut, secund) => +minut * 60 + +secund;

  const OnSubmit = (event) => {
  const toSec = toSecund(min, sec);
    event.preventDefault();
    addTask(text, toSec);
	useText('');
	useMin('');
	useSec('');
 
  };


    return (
      <header className="header">
        <h1>todos</h1>
        <div className="new-todo-form">
          <form className="new-todo-form" onSubmit={OnSubmit}>
            <input
              type="text"
              className="new-todo"
              placeholder="Task"
              value={text}
              onChange={AddText}
              name="text"
            />
          </form>
          <form className="new-todo-form" onSubmit={OnSubmit}>
            <input
              type="number"
              className="new-todo-form__timer"
              placeholder="Min"
              value={min}
              onChange={AddMin}
              name="min"
            />
          </form>
          <form className="new-todo-form" onSubmit={OnSubmit}>
            {' '}
            <input
              type="number"
              className="new-todo-form__timer"
              placeholder="Sec"
              value={sec}
              onChange={AddSec}
              name="sec"
            />
          </form>
        </div>
      </header>
    );
}
 
 
NewTaskForm.propTypes = {
    addTask: (props, propsName) => {
      const value = props[propsName];

      if (typeof value === 'function') return null;
      return TypeError(`${value} должен быть функцией`);
    },
  };

 
export default NewTaskForm;
