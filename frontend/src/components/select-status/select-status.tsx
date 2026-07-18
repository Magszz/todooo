import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectTodo } from "./select-status.viewmodel";
import { TodoStatus } from "@/infra/types/todo.enum";

interface SelectStatusProps {
  value: TodoStatus;
  onValueChange: () => void;
}

const SelectStatus = ({ value, onValueChange }: SelectStatusProps) => {
  const { statuses } = useSelectTodo();

  return (
    <Select items={statuses} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
