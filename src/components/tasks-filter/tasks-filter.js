import React from 'react';
import './tasks-filter.css';

const TasksFilter =({ filter, btnFilter })=> {
	
	TasksFilter.defaultProps = {
  filter: [],
  btnFilter: () => {},
};

 const  button = [
    { name: 'all', value: 'All' },
    { name: 'active', value: 'Active' },
    { name: 'complected', value: 'Complected' },
  ];
	
	    const buttons = button.map((el) => {
       let classNm = '';
      if (filter === el.name) classNm += 'selected';
      return (
        <li key={el.name}>
          <button type="button" className={classNm} onClick={() => btnFilter(el.name)}>
            {el.value}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }

 




TasksFilter.propTypes = {
  filter: (props, propsName) => {
    const value = props[propsName];
    if (Array.isArray(value)) return null;
    return TypeError(`${value} должен быть массивом`);
  },

  btnFilter: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
};

export default TasksFilter;
