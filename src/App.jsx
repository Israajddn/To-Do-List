import { useReducer, useState } from 'react';
import Todo from './components/Todo';

export const ACTIONS = {
  // Add a new to do the list
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  EDIT_TODO: 'edit-todo'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo;
      })
    case ACTIONS.EDIT_TODO:
    // todos.filter(todo => todo.id !== action.payload.id);
    // const todo = todos.find(todo => todo.id === action.payload.id);
    // console.log(todo);
    // return {...todo, title: };
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, completed: false }
}

function App() {

  const initialState = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    },
    {
      "userId": 1,
      "id": 4,
      "title": "et porro tempora",
      "completed": true
    },
    {
      "userId": 1,
      "id": 5,
      "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
      "completed": false
    },
    {
      "userId": 1,
      "id": 6,
      "title": "qui ullam ratione quibusdam voluptatem quia omnis",
      "completed": false
    },
    {
      "userId": 1,
      "id": 7,
      "title": "illo expedita consequatur quia in",
      "completed": false
    },
    {
      "userId": 1,
      "id": 8,
      "title": "quo adipisci enim quam ut ab",
      "completed": true
    },
    {
      "userId": 1,
      "id": 9,
      "title": "molestiae perspiciatis ipsa",
      "completed": false
    },
    {
      "userId": 1,
      "id": 10,
      "title": "illo est ratione doloremque quia maiores aut",
      "completed": true
    },
    {
      "userId": 1,
      "id": 11,
      "title": "vero rerum temporibus dolor",
      "completed": true
    },
    {
      "userId": 1,
      "id": 12,
      "title": "ipsa repellendus fugit nisi",
      "completed": true
    },
    {
      "userId": 1,
      "id": 13,
      "title": "et doloremque nulla",
      "completed": false
    },
    {
      "userId": 1,
      "id": 14,
      "title": "repellendus sunt dolores architecto voluptatum",
      "completed": true
    },
    {
      "userId": 1,
      "id": 15,
      "title": "ab voluptatum amet voluptas",
      "completed": true
    },
    {
      "userId": 1,
      "id": 16,
      "title": "accusamus eos facilis sint et aut voluptatem",
      "completed": true
    },
    {
      "userId": 1,
      "id": 17,
      "title": "quo laboriosam deleniti aut qui",
      "completed": true
    },
    {
      "userId": 1,
      "id": 18,
      "title": "dolorum est consequatur ea mollitia in culpa",
      "completed": false
    },
    {
      "userId": 1,
      "id": 19,
      "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
      "completed": true
    },
    {
      "userId": 1,
      "id": 20,
      "title": "ullam nobis libero sapiente ad optio sint",
      "completed": true
    }
  ];

  const [todos, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');

  function handleAdd(e) {
    // to prevent refrshing the page
    e.preventDefault();
    // Add a new to do the list
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    // clear out the name
    setName('');
  }

  // console.log(todos);

  const [isEditing, setIsEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }
  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }
  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }
  function handleEditFormSubmit(e) {
    e.preventDefault();

    // call the handleUpdateTodo function - passing the currentTodo.id and the currentTodo object as arguments
    handleUpdateTodo(currentTodo.id, currentTodo);
  }


  return (
    <div className='App'>

      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label>Edit todo: </label>
          <input
            type="text"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <form>
          <h1>Create Todo List</h1>
          <input type="text" value={name} onChange={e => setName(e.target.value)} /> <button onClick={handleAdd}>Add</button>
        </form>
      )}

      
        {todos.map((todo) => (
          <div key={todo.id}>
            <Todo key={todo.id} todo={todo} dispatch={dispatch} /> <button onClick={() => handleEditClick(todo)}>Edit</button>
          </div>
        ))}
      {/* {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      })} */}
    </div>
  )
}

export default App;