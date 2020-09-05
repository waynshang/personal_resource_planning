import React, { useState } from 'react';
import "./app.css";
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
        
        if (!text) {alert('please filled in product name') 
        return; }
        if (!startDate) {alert('please filled in start date')
        return }
        if (!endDate) {alert('please filled in end date')
        return;}
        console.log(text)
        addTodo(text, startDate, endDate);
        setText('')
        setStartDate('')
        setEndDate('')
        return false;
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' className="input" value={text} onChange={e => setText(e.target.value)} placeholder='product name'/>
            <input type='text' className="input" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder='start date'/>
            <input type='text' className="input" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder='end date'/>
            <input type = 'submit' value="Submit"/>
        </form>
    )
}

function App() {
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
      <div className='app' >
          <div className='todo-list'>
            {todos.map((todo, index)=>(
                <Todo key={index} index ={index} todo = {todo}/>
            )
            )}
            <TodoForm addTodo={addTodo}/>
          </div>
      </div>
  )
}
export default App