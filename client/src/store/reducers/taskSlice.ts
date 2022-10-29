import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasks} from "./ActionCreators";
import {ITasks} from "../../types/ITasks";


interface TaskState {
    tasks: ITasks[];
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
    reducers: {},

    extraReducers: {
        [fetchTasks.fulfilled.type]: (state, action: PayloadAction<ITasks[]>) => {
            state.isLoading = false;
            state.error = ''
            const date = action.payload
            for (let i = 0; i < date.length; i++) {
                state.tasks = [...state.tasks, {
                    ...date[i],
                    start: new Date(date[i].start),
                    firstEnd: new Date(date[i].firstEnd),
                    secondEnd: new Date(date[i].firstEnd),
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
