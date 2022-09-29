import { useEffect } from 'react';
import { useState } from 'react';
import { getTodos} from '../services/todos'; 


export default function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const todos = await getTodos();
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  return todos;
}