import React, {FC, Fragment, useEffect, useState} from 'react';
import {Month} from "../../models/Month";
import {WeekDays} from "../../models/CalendarTypes";
import cl from './MonthComponent.module.css'
import Button from "../../../UI/Button/Button";
import TaskComponent from "./TaskComponent";
import ModalFullScreen from "../../../UI/ModalFullScreen/ModalFullScreen";
import TasksListCalendar from "../TasksListCalendar/TasksListCalendar";
import {ITasks} from "../../../../types/ITasks";
import TaskCard from "../TaskCard/TaskCard";
import CreateNewTask from "../CreateNewTask/CreateNewTask";

interface MonthComponentProps {
    firstDay: WeekDays.SU | WeekDays.MON,
    weekDays: WeekDays[],
    month: Month,
}


interface TasksListData {
    date: Date,
    tasks: ITasks[]
}


const MonthComponent: FC<MonthComponentProps> = ({firstDay, weekDays, month}) => {
    const [monthDays, setMonthDays] = useState(month.getDaysInMonth())
    const [monthName, setMonthName] = useState(month.getMonthName())

    useEffect(() => {
        setMonthDays(month.getDaysInMonth())
    }, [firstDay, month.getDaysInMonth()])


    const handleChangeMonth = (param: "next" | 'prev' | 'today') => {
        if (param === 'next') {
            month.nextMonth()
        }
        if (param === 'prev') {
            month.previousMonth()

        }
        if (param === 'today') {
            month.setCurrentMonth()
        }
        setMonthName(month.getMonthName())
        setMonthDays(month.getDaysInMonth())
    };

    // console.log(window.innerHeight * 0.01)
    const indexOfFirstDay = month.getIndexOfFirstDay()

    const [tasksListIsVisible, setTasksListIsVisible] = useState(false);
    const [tasksListData, setTasksListData] = useState<TasksListData>({} as TasksListData)

    const [taskInfoIsVisible, setTaskInfoIsVisible] = useState(false)
    const [selectTask, setSelectTask] = useState({} as ITasks)

    const [createTaskWindowIsVisible, setCreateTaskWindowIsVisible] = useState(false)
    const [createNewTaskDate, setCreateNewTaskDate] = useState<Date>(new Date())


    const dayHeight = () => {
        switch (month.getDaysInMonth().length) {
            case 35:
                return `calc((${window.innerHeight * 0.01 * 100}px - 75px - 5vh )/5)`;
            case 42:
                return `calc((${window.innerHeight * 0.01 * 100}px - 75px - 5vh )/6)`;
        }
    }
    return (
        <div className={cl.month}>
            {createTaskWindowIsVisible
                ? <ModalFullScreen visible={createTaskWindowIsVisible} exitBtn={true}
                                   setVisible={setCreateTaskWindowIsVisible} exitBackground={false}>
                    <CreateNewTask
                        setModalVisible={setCreateTaskWindowIsVisible}
                        startDate={createNewTaskDate}
                    />
                </ModalFullScreen>
                : ''
            }
            <div className={cl.monthHeader}>
                {weekDays.map(obj =>
                    <div className={cl.weekDay} key={obj}>{obj}</div>
                )}
            </div>
            <div className={cl.monthDays}>
                {monthDays.map((day: any) =>
                    <div
                        key={day.date.getTime()}
                        className={cl.day}
                        style={
                            day.date.getDate() === new Date().getDate()
                            && day.date.getMonth() === new Date().getMonth()
                            && day.date.getFullYear() === new Date().getFullYear()
                                ? {backgroundColor: 'rgba(164,220,252,.6)', minHeight: dayHeight()}
                                : {minHeight: dayHeight()}
                        }
                        onClick={() => {
                            setCreateNewTaskDate(day.date)
                            setCreateTaskWindowIsVisible(true)
                        }}
                    >
                        {day.date.getDate()}
                        <div className={cl.dayTasks}>
                            {day.tasks.map((task: any, index: number) =>
                                <Fragment key={index}>
                                    {index - 3 < 0
                                        // ? (task.start.getDate() !== day.date.getDate()) && (day.date.getDay() !== indexOfFirstDay)
                                        //     ? <div className={cl.emptyDiv}></div>
                                        //     :
                                       ? <TaskComponent day={day} task={task}
                                                             indexOfFirstDay={month.getIndexOfFirstDay()}
                                                             setSelectTask={setSelectTask}
                                                             setTaskInfoIsVisible={setTaskInfoIsVisible}
                                            />
                                        : ''
                                    }
                                </Fragment>
                            )}
                        </div>
                        {day.tasks.length > 3
                            ? <div className={cl.tasksCount} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                event.stopPropagation()
                                setTasksListData({date: day.date, tasks: day.tasks});
                                setTasksListIsVisible(true)
                            }
                            }>Ещё: {day.tasks.length - 3}</div>
                            : ''
                        }
                    </div>
                )}
            </div>
            {tasksListIsVisible
                ? <ModalFullScreen visible={tasksListIsVisible}
                                   setVisible={setTasksListIsVisible}
                                   exitBtn={true}
                                   exitBackground={true}>
                    <TasksListCalendar date={tasksListData.date} tasks={tasksListData.tasks}/>
                </ModalFullScreen>
                : ''
            }
            {taskInfoIsVisible
                ?
                <ModalFullScreen visible={taskInfoIsVisible}
                                 setVisible={setTaskInfoIsVisible}
                                 exitBtn={true}
                                 exitBackground={true}
                >
                    <TaskCard task={selectTask} setIsModalVisible={setTaskInfoIsVisible}/>
                </ModalFullScreen>

                : ''
            }
            <div className={cl.monthMenu}>
                <div className={cl.btn}>
                    <Button onClick={() => handleChangeMonth('prev')}>Предыдущий</Button>
                </div>
                <div className={cl.btn}>
                    <Button
                        onClick={() => handleChangeMonth('today')}>{monthName}</Button>

                </div>
                <div className={cl.btn}><Button onClick={() => handleChangeMonth('next')}>Следующий</Button>
                </div>
            </div>
        </div>
    );
};

export default MonthComponent;
