import React from "react";

import { css } from "@emotion/core";
import { Button } from "semantic-ui-react";

import { Color, useCategoriesQuery } from "../graphql/generated";

import { AddTaskModal } from "./AddTaskModal";
import { CategoryModal } from "./CategoryModal";
import { Task, TaskType } from "./Task";
import { TaskContentType } from "./TaskContent";

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
        <Button inverted content="新規作成" onClick={() => setAddTaskModalOpen(true)} />
        <Button inverted basic content="カテゴリ設定" onClick={() => setCategoryModalOpen(true)} />
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
