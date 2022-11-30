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
import {ITask, ITasks} from "../../types/ITasks";


interface TaskState {
    tasks: ITasks[];
    task: ITask;
    isLoading: boolean;
    isLoadingCreate: boolean;
    isLoadingDelete: boolean;
    isLoadingUpdate: boolean
    error: string;
}

const initialState: TaskState = {
    tasks: [] as ITasks[],
    task: {} as ITask,
    isLoading: false,
    isLoadingCreate: false,
    isLoadingDelete: false,
    isLoadingUpdate: false,
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
            state.isLoadingUpdate = false;
        },
        [editTask.pending.type]: (state) => {
            state.isLoadingUpdate = true;
        },
        [editTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingUpdate = false;
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
            }]
            state.error = ''
            state.isLoadingCreate = state.isLoadingCreate != state.isLoadingCreate;
            state.isLoading = true
        },
        [createTask.pending.type]: (state) => {
            state.isLoading = false
        },
        [createTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoadingCreate = !state.isLoadingCreate;
            state.isLoading = false;
        },

        [deleteTask.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
            state.tasks = state.tasks.filter(obj => obj._id !== action.payload._id)
            state.error = ''
            state.isLoadingCreate = !state.isLoadingDelete;
            state.isLoading = true;
        },
        [deleteTask.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },
        [completeTask.fulfilled.type]: (state, action: PayloadAction<ITasks>) => {
            const taskId = action.payload._id
            console.log(taskId)
            const taskInd = state.tasks.findIndex(tas => tas._id === taskId)
            console.log(taskInd)
            console.log(action.payload.complete)
            state.tasks[taskInd] = {
                ...state.tasks[taskInd],
                complete: !action.payload.complete,
            }
            state.error = ''
            state.isLoading = false;
        },
        [completeTask.pending.type]: (state) => {
            state.isLoading = true;
        },
        [completeTask.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },
    }
})
export const {} = taskSlice.actions;
export default taskSlice.reducer;
