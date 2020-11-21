import React from "react";

import { css } from "@emotion/core";
import { Button } from "semantic-ui-react";

import { AddTaskModal } from "@/components/AddTaskModal";
import { CategoryModal } from "@/components/CategoryModal";
import { Task, TaskType } from "@/components/Task";
import { TaskContentType } from "@/components/TaskContent";
import { Color, useCategoriesQuery } from "@/graphql/generated";

export type CategoryType = {
  id: string;
  name: string;
  color: Color;
  createdAt: number;
  updatedAt: number;
};

type Props = {
  tasksData: (TaskType & { taskContents: TaskContentType[] })[];
  refetchTasks: () => Promise<unknown>;
};

export const TaskList = React.memo<Props>(({ tasksData, refetchTasks }) => {
  const [addTaskModalOpen, setAddTaskModalOpen] = React.useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const { data, refetch: refetchCategories } = useCategoriesQuery();

  if (!data) {
    return null;
  }

  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Button content="新規作成" color="blue" onClick={() => setAddTaskModalOpen(true)} />
        <Button basic content="カテゴリ設定" color="blue" onClick={() => setCategoryModalOpen(true)} />
      </div>
      <div>
        {tasksData.map((taskData) => {
          const { taskContents, ...task } = taskData;
          return <Task key={task.id} task={task} taskContents={taskContents} refetchTasks={refetchTasks} />;
        })}
        <AddTaskModal
          open={addTaskModalOpen}
          setOpen={setAddTaskModalOpen}
          refetchTasks={refetchTasks}
          categories={data.categories}
        />
        <CategoryModal
          open={categoryModalOpen}
          setOpen={setCategoryModalOpen}
          categories={data.categories}
          refetchCategories={refetchCategories}
        />
      </div>
    </div>
  );
});
