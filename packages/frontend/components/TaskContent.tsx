import React from "react";

import { css } from "@emotion/core";
import { Checkbox } from "semantic-ui-react";

import { TaskContentModel, useUpdateTaskContentMutation } from "../graphql/generated";

export type TaskContentType = Omit<TaskContentModel, "task">;

export const TaskContent = React.memo<{
  taskContent: TaskContentType;
  refetchTasks: () => Promise<unknown>;
}>(({ taskContent, refetchTasks }) => {
  const [updateTaskContent] = useUpdateTaskContentMutation();

  const { id, title, checked } = taskContent;

  const handleChangeChecked = async (checked: boolean) => {
    await updateTaskContent({ variables: { taskContent: { id, checked } } });
    await refetchTasks();
  };

  return (
    <div
      key={id}
      css={css`
        display: flex;
        align-items: center;
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
    </div>
  );
});
