import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTodoForm } from "./todo-form.viewmodel";
import SelectStatus from "../select-status/select-status";

interface TodoFormProps {
  button: ReactNode;
  open?: boolean;
  onOpenChange?: () => void;
}

const TodoForm = ({ button, open, onOpenChange }: TodoFormProps) => {
  const { form } = useTodoForm();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-8">
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Fill in all required fields to add a new task.
          </DialogDescription>
        </DialogHeader>
        <form id="todoForm">
          <FieldGroup className="pb-5">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter todo title"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="pb-5">
            <Controller
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <SelectStatus
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button form="todoForm" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
