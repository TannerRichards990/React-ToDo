import { client, checkError } from './client';

export async function getTodos() {
  const response = await client
    .from('todos')
    .select();
  return checkError(response);
}

export async function createTodo(description) {
  const response = await client
    .from('todos')
    .insert({ description })
    .order ('id', { ascending: true });
  return checkError(response);
}

export async function updateTodo({ id, complete }) {
  const response = await client
    .from ('todos')
    .update({ complete: !complete })
    .match({ id })
    .single();
  return checkError(response);
}

export async function deleteTodo(id) {
  const response = await client
    .from('todos')
    .delete()
    .match({ id })
    .single();
  return checkError(response);
}
