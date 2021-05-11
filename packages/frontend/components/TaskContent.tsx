import React, { memo } from "react";

import { css } from "@emotion/react";
import { Button, Checkbox, Popup } from "semantic-ui-react";

import { TasksQuery } from "@/graphql/generated";
import { useTaskContent } from "@/hooks/useTaskContent";

export const TaskContent = memo<{
  taskContent: TasksQuery["tasks"][number]["taskContents"][number];
  refetchTasks: () => Promise<unknown>;
}>(({ taskContent, refetchTasks }) => {
  const { handleChangeChecked, handleDelete } = useTaskContent({ taskContentId: taskContent.id, refetchTasks });

  const { id, title, checked } = taskContent;

  return (
    <div
      key={id}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border: 1px solid #d4d4d5;
        border-radius: 4px;
        padding: 4px 4px 4px 12px;
        margin-top: 8px;
      `}
    >
      <Checkbox
        checked={checked}
        onChange={(e, d) => handleChangeChecked(d.checked as boolean)}
        label={<label>{title}</label>}
      />
      <Popup position="bottom right" hoverable trigger={<Button icon="ellipsis horizontal" />}>
        <Button content="削除" color="red" onClick={handleDelete} />
      </Popup>
    </div>
  );
});
