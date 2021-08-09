import React, {useState, useCallback} from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

const App = () => {
  

	
	const [todoData, setTodoData] = useState([]);
	const [filters, setFilters] = useState(['all']);
	const [numID, setNumID] = useState(100);

	


	
 const  onFilter = (item, value) => {
    if (value === 'active') return item.filter((el) => el.active);
    if (value === 'complected') return item.filter((el) => !el.active);
    return item;
  };

 const  deleteItem = (id) => {
    
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
	  setTodoData(newData)
    
  };

 const onActive = (id) => {
   
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        active: !oldItem.active,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

     setTodoData(newData)
  };

 const  editForm = (id, text) => {
    if (text.length === 0) {
      return;
    }

   
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        text,
        edit: !oldItem.edit,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
	 
	  setTodoData(newData)
  };

  const onEdit = (id) => {
   
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
	  
	  setTodoData(newData)

  };
	

	
	
	
	 const addTask = useCallback((text, sec = 0) => {
    if (text.length === 0) {
      return;
    }
		 setNumID(numID+1);

		 
			 
    const newTask = {
      id:numID,
      text,
      active: true,
      edit: false,
      addTime: new Date(),
      sec,
    };
		
      const newData = [newTask, ...todoData];
      setTodoData(newData)
  }, [todoData, numID]);
	



  const btnClear = () => {
    
      const activeData = todoData.filter((item) => item.active);
	  
	   setTodoData(activeData)

  };

 const  btnFilter = (filter) => {
    setFilters( filter );
  };

	



	   
    const countComplected = todoData.filter((item) => item.active).length;
    const filter = onFilter(todoData, filters);

    return (
      <div className="todoapp">
        <NewTaskForm addTask={addTask} />

        <TaskList
          todos={filter}
          onDelete={deleteItem}
          onActive={onActive}
          onEdit={onEdit}
          addTask={addTask}
          editForm={editForm}
        />
        <Footer
          count={countComplected}
          filter={filter}
          btnFilter={btnFilter}
          todos={todoData}
          btnClear={btnClear}
        />
      </div>
    );


}


export default  App ;