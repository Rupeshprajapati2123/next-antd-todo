import { createSlice } from '@reduxjs/toolkit';

type Todo = {
  id: number;
  name: string;
  type:string;
  done: boolean;
};

type TodoState = {
  list: Todo[];
};

const initialState: TodoState = {
  list: [],
};

export const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.name === action.payload.name);
      if (!todo) {
        state.list.push(action.payload);
      }
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    editTodo: (state, action) => {
      const { id, name, type } = action.payload;
      const todoToEdit = state.list.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.name = name;
        todoToEdit.type = type;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo,editTodo } = todo.actions;
export default todo.reducer;
