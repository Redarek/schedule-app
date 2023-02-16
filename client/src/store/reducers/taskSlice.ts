import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    completeTask,
    createTask,
    deleteTask,
    editTask,
    fetchAllTasks,
    fetchEmployeeTasks,
    fetchTaskById
} from "./ActionCreators";
import {ITasks} from "../../types/ITasks";


interface TaskState {
    tasks: ITasks[];
    task: ITasks;
    isLoadingTasks: boolean;
    error: string;
}

const initialState: TaskState = {
    tasks: [] as ITasks[],
    task: {} as ITasks,
    isLoadingTasks: false,
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
                start: new Date(Number(date.start)),
                firstEnd: new Date(Number(date.firstEnd)),
                secondEnd: new Date(Number(date.firstEnd)),
            }
            state.error = ''
            state.isLoadingTasks = false;
        },
        [editTask.pending.type]: (state) => {
            state.isLoadingTasks = true;
        },
        [editTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },

        [fetchTaskById.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            state.task = {
                ...action.payload,
                start: new Date(new Date(action.payload.start).getTime()),
                firstEnd: new Date(new Date(action.payload.firstEnd).getTime()),
                secondEnd: new Date(new Date(action.payload.firstEnd).getTime()),
            }
            state.error = ''
            state.isLoadingTasks = false;
        },
        [fetchTaskById.pending.type]: (state) => {
            state.isLoadingTasks = true;
        },
        [fetchTaskById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },
        [fetchAllTasks.fulfilled.type]: (state, action: PayloadAction<ITasks[]>) => {
            const date = action.payload
            for (let i = 0; i < date.length; i++) {
                state.tasks = [...state.tasks, {
                    ...date[i],
                    start: new Date(new Date(date[i].start).getTime()),
                    firstEnd: new Date(new Date(date[i].firstEnd).getTime()),
                    secondEnd: new Date(new Date(date[i].firstEnd).getTime()),
                }]
            }
            state.isLoadingTasks = false;
            state.error = ''
        },
        [fetchAllTasks.pending.type]: (state) => {
            state.isLoadingTasks = true;
        },
        [fetchAllTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },

        [fetchEmployeeTasks.fulfilled.type]: (state, action: PayloadAction<ITasks[]>) => {
            const date = action.payload
            state.tasks = initialState.tasks;
            for (let i = 0; i < date.length; i++) {
                state.tasks = [...state.tasks, {
                    ...date[i],
                    start: new Date(new Date(date[i].start).getTime()),
                    firstEnd: new Date(new Date(date[i].firstEnd).getTime()),
                    secondEnd: new Date(new Date(date[i].firstEnd).getTime()),
                }]
            }
            state.error = ''
            state.isLoadingTasks = false;
        },
        [fetchEmployeeTasks.pending.type]: (state) => {
            state.isLoadingTasks = true;
        },
        [fetchEmployeeTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },

        [createTask.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            state.error = ''
            state.isLoadingTasks = true
        },
        [createTask.pending.type]: (state) => {
            state.isLoadingTasks = false
        },
        [createTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },

        [deleteTask.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            state.tasks = state.tasks.filter(obj => obj._id !== action.payload._id)
            state.error = ''
            state.isLoadingTasks = false;
        },
        [deleteTask.pending.type]: (state) => {
            state.isLoadingTasks = true;
        },
        [deleteTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },
        [completeTask.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            const taskId = action.payload._id
            const taskInd = state.tasks.findIndex(tas => tas._id === taskId)
            state.tasks[taskInd] = {
                ...state.tasks[taskInd],
                complete: !action.payload.complete,
            }
            state.error = ''
            state.isLoadingTasks = false;
        },
        [completeTask.pending.type]: (state) => {
            state.isLoadingTasks = true;
        },
        [completeTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingTasks = false;
        },
    }
})
export const {} = taskSlice.actions;
export default taskSlice.reducer;
