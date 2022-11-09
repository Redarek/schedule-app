import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {editTask, fetchAllTasks, fetchEmployeeTasks, fetchTaskById} from "./ActionCreators";
import {ITask, ITasks} from "../../types/ITasks";


interface TaskState {
    tasks: ITasks[];
    task: ITask;
    isLoading: boolean;
    error: string;
}

const initialState: TaskState = {
    tasks: [] as ITasks[],
    task: {} as ITask,
    isLoading: false,
    error: ''
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},

    extraReducers: {
        [fetchAllTasks.fulfilled.type]: (state, action: PayloadAction<ITasks[]>) => {
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
        [fetchAllTasks.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchAllTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [fetchEmployeeTasks.fulfilled.type]: (state, action: PayloadAction<ITasks[]>) => {
            state.isLoading = false;
            state.error = ''
            const date = action.payload
            state.tasks = initialState.tasks;
            for (let i = 0; i < date.length; i++) {
                state.tasks = [...state.tasks, {
                    ...date[i],
                    start: new Date(date[i].start),
                    firstEnd: new Date(date[i].firstEnd),
                    secondEnd: new Date(date[i].firstEnd),
                }]
            }

        },
        [fetchEmployeeTasks.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchEmployeeTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [fetchTaskById.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
            state.isLoading = false;
            state.error = ''
            state.task = action.payload
            // state.task ={
            //     ...action.payload,
            //     // start: new Date(action.payload.start),
            //     // firstEnd: new Date(action.payload.firstEnd),
            //     // secondEnd: new Date(action.payload.firstEnd),
            // }
        },
        [fetchTaskById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTaskById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [editTask.fulfilled.type]: (state, action: PayloadAction<ITask[]>) => {
            state.isLoading = false;
            state.error = ''
        },
        [editTask.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})
export const {} = taskSlice.actions;
export default taskSlice.reducer;
