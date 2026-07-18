import { useState } from "react";
import dayjs from "dayjs";

export const useTodos = () => {
  const [date, setDate] = useState<Date>(dayjs().toDate());

  const onChangeSelectedDate = (date: Date | undefined) => {
    if (!date) return;

    setDate(date);
  };

  return {
    date,
    setDate,
    onChangeSelectedDate,
  };
};
