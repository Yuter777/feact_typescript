import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (todo: { title: string; completed: boolean }) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const editTodo = async (
  id: number,
  updatedTodo: { title: string; completed: boolean }
) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
