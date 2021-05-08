import React, { memo, useState } from "react";

import { css } from "@emotion/react";
import { Button } from "semantic-ui-react";

import { AddTaskModal } from "@/components/AddTaskModal";
import { CategoryModal } from "@/components/CategoryModal";
import { TaskSection } from "@/components/TaskSection";
import { TasksQuery, useCategoriesQuery } from "@/graphql/generated";

type Props = {
  tasksData: TasksQuery["tasks"];
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
        {tasksData.map((task) => {
          return <TaskSection key={task.id} task={task} refetchTasks={refetchTasks} />;
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
