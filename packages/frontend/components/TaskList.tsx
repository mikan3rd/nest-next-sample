import React, { memo, useState } from "react";

import { css } from "@emotion/core";
import { Button } from "semantic-ui-react";

import { AddTaskModal } from "@/components/AddTaskModal";
import { CategoryModal } from "@/components/CategoryModal";
import { TaskContentType } from "@/components/TaskContent";
import { TaskSection, TaskType } from "@/components/TaskSection";
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

export const TaskList = memo<Props>(({ tasksData, refetchTasks }) => {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
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
          return <TaskSection key={task.id} task={task} taskContents={taskContents} refetchTasks={refetchTasks} />;
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
