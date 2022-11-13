import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTask, deleteTask, editTask, fetchAllTasks, fetchEmployeeTasks, fetchTaskById} from "./ActionCreators";
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
    error: 'null',
}

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {},

    extraReducers: {
        [editTask.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            const index = state.tasks.findIndex(obj => obj._id === action.payload._id)
            const date = action.payload
            state.tasks[index] = {
                ...date,
                start: new Date(date.start),
                firstEnd: new Date(date.firstEnd),
                secondEnd: new Date(date.firstEnd),
            }
            state.error = ''
            state.isLoading = false;
        },
        [editTask.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },

        [fetchTaskById.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
            state.task = action.payload
            state.error = ''
            state.isLoading = false;
        },
        [fetchTaskById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTaskById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },
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
            state.error = ''
            state.isLoading = false;
        },
        [fetchEmployeeTasks.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchEmployeeTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },

        [createTask.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            const date = action.payload
            state.tasks = [...state.tasks, {
                ...date,
                start: new Date(date.start),
                firstEnd: new Date(date.firstEnd),
                secondEnd: new Date(date.firstEnd),
            }
            ]
            state.error = ''
            state.isLoading = false;
        },
        [createTask.pending.type]: (state) => {
            state.isLoading = true;
        },
        [createTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },

        [deleteTask.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
            state.tasks = state.tasks.filter(obj => obj._id !== action.payload._id)
            state.error = ''
            state.isLoading = false;
        },
        [deleteTask.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },
    }
})
export const {} = taskSlice.actions;
export default taskSlice.reducer;
