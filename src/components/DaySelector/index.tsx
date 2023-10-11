import { addDays, differenceInCalendarDays } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./index.scss";

interface IProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function DaySelector({ date, setDate }: IProps): JSX.Element {
  return (
    <div className="day-selector">
      {differenceInCalendarDays(date, new Date()) > -7 && (
        <FaChevronLeft onClick={() => setDate(addDays(date, -1))} />
      )}
      <DatePicker
        selected={date}
        onChange={(day) => day && setDate(day)}
        dateFormat="eeee, d. M. yyyy"
        maxDate={addDays(new Date(), 14)}
        minDate={addDays(new Date(), -7)}
      />
      {differenceInCalendarDays(date, new Date()) < 7 && (
        <FaChevronRight onClick={() => setDate(addDays(date, 1))} />
      )}
    </div>
  );
}
