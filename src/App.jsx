import { useReducer, useState } from 'react';
import Todo from './components/Todo';

export const ACTIONS = {
  // Add a new to do the list
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo;
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }
}

function App() {

  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  function handleSubmit(e) {
    // to prevent refrshing the page
    e.preventDefault();
    // Add a new to do the list
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    // clear out the name
    setName('');
  }

  console.log(todos);

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        {/* create an input to write a new to do */}
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </form>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      })}
    </div>
  )
}

export default App;
