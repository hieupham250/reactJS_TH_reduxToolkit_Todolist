import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../interface";
export const getTask: any = createAsyncThunk("task/getAllTask", async () => {
  const response = await axios.get("http://localhost:8080/tasks");
  return response.data;
});
const initialState: Task[] = [];
export const addTask: any = createAsyncThunk("task/addTask", async (task) => {
  const response = await axios.post("http://localhost:8080/tasks", task);
  return response.data;
});

export const deletetask: any = createAsyncThunk(
  "task/deletetask",
  async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    return id;
  }
);
export const updatetask: any = createAsyncThunk(
  "task/updatetask",
  async (task: Task) => {
    axios.patch(`http://localhost:8080/tasks/${task.id}`, {
      text: task.name,
      completed: task.completed,
    });
    return task;
  }
);

const taskReducer = createSlice({
  name: "task",
  initialState: {
    task: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state: any, action: any) => {
        // chờ lấy dữ liệu
      })
      .addCase(getTask.fulfilled, (state, action) => {
        //lấy dữ liệu thành công
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        // thất bại khi lấy dữ liệu
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.task.push(action.payload);
      })
      .addCase(deletetask.fulfilled, (state, action) => {
        const taskToDelete = action.payload;
        const updatedtasks = state.task.filter(
          (task) => task.id !== taskToDelete
        );
        state.task = updatedtasks;
      })
      .addCase(updatetask.fulfilled, (state, action) => {
        const taskIdToUpdate = action.payload.id;
        state.task = state.task.map((task) =>
          task.id === taskIdToUpdate ? action.payload : task
        );
      });
  },
});

export default taskReducer.reducer;
