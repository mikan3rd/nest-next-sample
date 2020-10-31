import React from "react";

import { css } from "@emotion/core";
import { Button, Checkbox } from "semantic-ui-react";

import { TaskContentModel, useDeleteTaskContentMutation, useUpdateTaskContentMutation } from "../graphql/generated";

export type TaskContentType = Omit<TaskContentModel, "task">;

export const TaskContent = React.memo<{
  taskContent: TaskContentType;
  refetchTasks: () => Promise<unknown>;
}>(({ taskContent, refetchTasks }) => {
  const [updateTaskContent] = useUpdateTaskContentMutation();
  const [deleteTaskContent] = useDeleteTaskContentMutation();

  const { id, title, checked } = taskContent;

  const handleChangeChecked = async (checked: boolean) => {
    await updateTaskContent({ variables: { taskContent: { id, checked } } });
    await refetchTasks();
  };

  const handleDelete = async () => {
    await deleteTaskContent({ variables: { id } });
    await refetchTasks();
  };

  return (
    <div
      key={id}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid white;
        border-radius: 4px;
        padding: 4px 4px 4px 12px;
        margin-top: 8px;
      `}
    >
      <Checkbox
        checked={checked}
        onChange={(e, d) => handleChangeChecked(d.checked)}
        label={
          <label
            css={css`
              &&& {
                color: white;
                :hover {
                  color: white;
                }
              }
            `}
          >
            {title}
          </label>
        }
      />
      <Button icon="trash alternate" inverted onClick={handleDelete} />
    </div>
  );
});
