import React, { useState } from 'react';
import "../css/timelineListPage.css";
import "w3-css/w3.css";

function Todo({todo, index}){
    return (
        <div className="w3-light-grey w3-round-xlarge">
            <div className = 'todo'>{todo.text}</div>
            <div className="w3-container w3-blue w3-round-xlarge" style={{width:"70%", marginBottom:'10px'}}>{todo.startDate} - {todo.endDate}</div>
        </div>
        
    );
}

function TodoForm({addTodo}) {
    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) =>{
        console.log('tttt')
        e.preventDefault();
        
        addTodo(text, startDate, endDate);
        setText('')
        setStartDate('')
        setEndDate('')

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' className="input" value={text} onChange={e => setText(e.target.value)} placeholder='product name' required/>
            <input type='text' className="input" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder='start date' 
                    onFocus={e => e.target.type = 'date'} onBlur={e => e.target.type = 'text'}required/>
            <input type='text' className="input" value={endDate} 
                    min = {startDate} onChange={e => setEndDate(e.target.value)} placeholder='end date'
                    onFocus={e => e.target.type = 'date'} onBlur={e => e.target.type = 'text'}/>
            <input type = 'submit' value="Submit"/>
        </form>
    )
}

export default function TimeLineList() {
  // 宣告一個新的 state 變數，我們稱作為「count」。
  const [todos, setTodos]= useState([
      {
          text: 'apple watch',
          startDate: '2020-05-01',
          endDate: '2020-06-01'
      },
      {
          text: 'apple mac pro',
          startDate: '2020-05-01',
          endDate: '2020-06-01'
      }
  ]);


  const addTodo = (text,startDate, endDate )=> {
      const newTodos = [...todos, {text, startDate, endDate}];
      setTodos(newTodos);
  }
  return (
        <div className='todo-list'>
            {todos.map((todo, index)=>(
                <Todo key={index} index ={index} todo = {todo}/>
            )
            )}
            <TodoForm addTodo={addTodo}/>
        </div>
  )
}