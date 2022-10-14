import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ITask} from "../../types/ITask";

export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITask[]>('http://localhost:3030/tasks')
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить задания")
        }
    }
)
