import "./todos.style.css";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateHeader from "@/components/date-header/date-header";
import NotFound from "@/components/not-found/not-found";

import { useTodos } from "./todos.viewmodel";

const Todos = () => {
  const { date, onChangeSelectedDate } = useTodos();

  return (
    <div className="todos-container">
      {/* HEADER */}
      <div className="todos-container__header">
        {/* LEFT SIDE OPTION */}
        <div>
          <DateHeader onChangeSelectedDate={onChangeSelectedDate} date={date} />
        </div>

        {/* LEFT SIDE OPTION */}
        <div className="todos-container__header-r-options">
          <Input placeholder="Search Todo" />
          <Button>
            <Plus />
            Add New Todo
          </Button>
        </div>
      </div>

      {/* BODY */}
      <div className="todos-container__contents">
        <Tabs defaultValue="all" className="todos-conatiner__contents-tabs">
          <TabsList className="todos-conatiner__contents-tabs__list">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="wip">Work In-progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="postponed">Postponed</TabsTrigger>
          </TabsList>
          <TabsContent
            data-empty={true}
            className="todos-container__contents-tabs__content"
            value="all"
          >
            <NotFound />
            {/* <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card> */}
          </TabsContent>
          <TabsContent value="pending">asd</TabsContent>
          <TabsContent value="wip">asddd</TabsContent>
          <TabsContent value="completed">asdasd</TabsContent>
          <TabsContent value="postponed">asdasda</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Todos;
