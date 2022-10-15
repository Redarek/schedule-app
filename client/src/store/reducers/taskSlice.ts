import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "../../types/ITask";
import {fetchTasks} from "./ActionCreators";


interface TaskState {
    tasks: ITask[];
    isLoading: boolean;
    error: string;
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    error: ''
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },

    extraReducers: {
        [fetchTasks.fulfilled.type]: (state, action: PayloadAction<ITask[]>) => {
            state.isLoading = false;
            state.error = ''
            const date = action.payload
            for (let i = 0; i<date.length; i++) {
                state.tasks = [...state.tasks, {
                    title: date[i].title,
                    startTime: new Date(date[i].startTime),
                    endTime: new Date(date[i].endTime)
                }]
            }
        },
        [fetchTasks.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})
export const {} = taskSlice.actions;
export default taskSlice.reducer;
