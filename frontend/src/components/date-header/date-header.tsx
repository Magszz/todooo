import "./date-header.style.css";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import dayjs from "dayjs";

interface DateHeaderProps {
  date: Date;
  onChangeSelectedDate: (date: Date | undefined) => void;
}

const DateHeader = ({ date, onChangeSelectedDate }: DateHeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            data-empty={!date}
            className="date-header-container__btn"
          >
            {dayjs(date).format("MMMM DD, YYYY")}
            <ChevronDownIcon />
          </Button>
        }
      />
      <PopoverContent className="date-header-container__content" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onChangeSelectedDate(d);
            setOpen(false);
          }}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateHeader;
