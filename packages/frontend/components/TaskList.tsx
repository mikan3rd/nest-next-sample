import React from "react";

import { Button } from "semantic-ui-react";

import { AddTaskModal } from "./AddTaskModal";
import { Task, TaskType } from "./Task";
import { TaskContentType } from "./TaskContent";

type Props = {
  tasksData: (TaskType & { taskContents: TaskContentType[] })[];
  refetchTasks: () => Promise<unknown>;
};

export const TaskList = React.memo<Props>(({ tasksData, refetchTasks }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button inverted content="新規作成" onClick={() => setOpen(true)} />
      <div>
        {tasksData.map((taskData) => {
          const { taskContents, ...task } = taskData;
          return <Task key={task.id} task={task} taskContents={taskContents} refetchTasks={refetchTasks} />;
        })}
        <AddTaskModal open={open} setOpen={setOpen} refetchTasks={refetchTasks} />
      </div>
    </div>
  );
});
