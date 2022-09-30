import { useContext } from 'react';
import { UserContext } from '../../Context/useContext';
import { useTodos } from '../../hook/useTodos';
import { Redirect } from 'react-router-dom';
import { createTodo, deleteTodo, updateTodo } from '../../services/todos';
import './Todos.css';

export default function Todos() {
  const { user, } = useContext(UserContext);
  const { todos, setTodos } = useTodos();

  if (!user) return <Redirect to="/auth/sign-in" />;

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.get('description');
    
    const newTodo = await createTodo(data);
    setTodos((prevState) => [...newTodo, ...prevState]);

    e.target.reset();
  };

  const handleDelete = async (id) => {
    const todoDelete = await deleteTodo(id);
    setTodos(prevState => prevState.filter((prevTodo) => prevTodo.id !== todoDelete.id));

    
  };

  const handleUpdate = async (todo) => {
    const updatedTodo = await updateTodo(todo);
    setTodos(prevState => prevState.map((prevTodo) => 
      prevTodo.id === todo.id ? updatedTodo : prevTodo));
  };

  return (
    <div className='todos-container'>
      <h1>Create a todo:</h1>
      <form onSubmit={e => handleCreate(e)}>
        <label>
          Description: 
          <input type="text" name="description" />
        </label>
        <button type="submit">Create</button>
      </form>
      <h1>My Todos:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdate(todo)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.description}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
