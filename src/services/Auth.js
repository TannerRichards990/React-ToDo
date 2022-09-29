import { client } from './client';

export function getUser() {
  return client.auth.currentUser;
}

export async function authUser(email, password, type) {
  let response;

  if (type === 'sign-in') {
    response = await client.auth.signIn({ email, password });
  } else if (type === 'sign-up') { 
    response = await client.auth.signUp({ email, password });

    return response;
  }
}

export async function signOut() {
  await client.auth.signOut();
}