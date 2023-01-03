import React, {FC} from 'react';
import {WeekDays} from "../../models/Calendar";

interface WeekComponentProps {
    calendarLocation: WeekDays.SU | WeekDays.MON,
    weekDays: WeekDays[],
}

const WeekComponent: FC<WeekComponentProps> = () => {
    return (
        <div>
            Week
        </div>
    );
};

export default WeekComponent;
