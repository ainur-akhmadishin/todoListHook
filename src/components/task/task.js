import React, {useState,  useEffect, useCallback}  from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

const Task =  ({ active, edit, id, text, onDelete, sec, editForm, onEdit, onActive, addTime})=>{
	
	Task.defaultProps = {
  text: '',
sec: 0,
  id: 1,
  addTime: new Date(),
  active: true,
  edit: false,
  onDelete: () => {},
  onActive: () => {},
  onEdit: () => {},
  editForm: () => {},
};

	


	const [value, setValue] = useState('');
	const [formatData, setFormatData] = useState('');
	const [flag, setFlag] = useState(true);
	const [secund, setSecund] = useState(sec);
	

	


 

	
useEffect(() => {
	let ind = null
	if (!flag){
     ind = setInterval(() => {
      setSecund(secund + 1);
    }, 1000);}
    return () => {
		clearInterval(ind)
	 
				 }
	
  }, [flag, secund]);
	
	
	
	
	
	
	
  const editTask = event => setValue(event.target.value)
    

  const onSubmit = (event) => {

    event.preventDefault();
    editForm(id, value);
 	setValue(value);
  };

  const newState = () => {
setValue(text)
  };

  const editClick = () => {
   newState();
    onEdit();
  };

  const btnPlay = () => {
   
    if (!flag) {
      return;
    }
    
     setFlag(false);
	
  };

  const btnStop = () => {
   
    setFlag(true)

  };

  const actives = () => {
    btnStop();
    onActive();
  };
	
  const minuts = useCallback(() => {
  setFormatData( formatDistanceToNow(addTime))
}, [addTime])
  
  
  useEffect (()=>{
	const timerID = setInterval(() => minuts(), 1000);
	  
	  return () => {
        clearTimeout(timerID);
      
      };
 

}, [minuts])
	
	
	
	


	
    let se = secund % 60;
    let min = (secund - se) / 60;
    if (se < 10) {
      se = `0${se}`;
    }

    if (min < 10) {
      min = `0${min}`;
    }

    let liClass = '';
    if (!active) {
      liClass = 'completed';
    }
    if (edit) {
      liClass = 'editing';
    }

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={actives} />
          <label htmlFor={id}>
            <span className="title" onKeyUp={() => {}} aria-hidden="true">
              {text}
            </span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={btnPlay} label="Play" />
              <button className="icon icon-pause" type="button" onClick={btnStop} label="Stop" />
              {min}:{se}
            </span>

            <span className="description"> created {formatData} ago </span>
          </label>

          <button type="button" className="icon icon-edit" label="Редактировать" onClick={editClick} />
          <button type="button" className="icon icon-destroy" onClick={onDelete} label="Удалить" />
        </div>

        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={value} onChange={editTask} />
        </form>
      </li>
    );
	
	
}



Task.propTypes = {
  text: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'string') return null;
    return TypeError(`${value} не является строкой`);
  },
	
  sec: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'number') return null;
    return TypeError(`${value} не является числом`);
  },

  id: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'number') return null;
    return TypeError(`${value} не является числом`);
  },

  addTime: (props, propsName) => {
    const value = props[propsName];
    if (value.getTime) return null;
    return TypeError(`${value} не является датой`);
  },

  active: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'boolean') return null;
    return TypeError(`${value} не является boolean`);
  },
  edit: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'boolean') return null;
    return TypeError(`${value} не является boolean`);
  },
  onDelete: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  onActive: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  onEdit: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  editForm: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
};


export default  Task;