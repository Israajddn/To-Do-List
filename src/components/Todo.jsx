import React from 'react';
import { ACTIONS } from '../App';
import { useState } from 'react';

export default function Todo({ todo, dispatch }) {

  return (
    <div className='Todo'>

      <input type='checkbox' checked={todo.completed} onChange={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}></input>

      <span style={todo.completed ? {} : {}}>
        {todo.title}
      </span>

      <button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })} disabled={todo.completed === false ? "disabled" : ""}>Delete</button>


    </div>
  )
}


