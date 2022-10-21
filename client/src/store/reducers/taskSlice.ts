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
            // state.tasks.sort((a:ITask,b:ITask) => {
            //     // console.log(a)
            //     // console.log(a.startTime.getTime())
            //     // console.log(b)
            //     // console.log(b.startTime.getTime())
            //     // console.log('___________________')
            //     // console.log(a)
            //     // console.log(b)
            //     if (b.startTime.getTime() <= a.startTime.getTime()) {
            //         return 1
            //     }
            //     // if (b.endTime.getDate() === a.startTime.getDate()+1) {
            //     //     console.log('2')
            //     //     return 1
            //     // }
            //     // if (a.endTime.getDate()+1 === b.startTime.getDate() && a.startTime >= b.startTime && a.endTime >= b.startTime)
            //     //     return 1
            //     // if (a.endTime.getDate() >= b.startTime.getDate()) {
            //     //     console.log('second')
            //     //     return 1
            //     // }
            //     else return -1
            // })


            // state.tasks.sort((a:ITask,b:ITask) => {
            //         if(b.startTime.getTime() >= a.startTime.getTime()) {
            //         return -1
            //     }
            //         return  0
            // })


            // state.tasks.sort((a:ITask,b:ITask) => {
            //     // console.log(a.startTime.getDate())
            //     console.log(b.endTime.getDate()+1 === a.startTime.getDate())
            //     // console.log(a.startTime.getDate())
            //     if (b.endTime.getDate()+1 === a.startTime.getDate()) {
            //         console.log(b)
            //         console.log(a)
            //         return 1
            //     }
            //     else return 0
            // })
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
