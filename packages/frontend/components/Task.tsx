import React from "react";

import { css } from "@emotion/core";
import { Button, Header, Icon } from "semantic-ui-react";

import { TaskContent } from "../components/TaskContent";
import { TaskContentModel, TaskModel } from "../graphql/generated";

type TaskType = Omit<TaskModel, "taskContents"> & { taskContents: Omit<TaskContentModel, "task"> };

export const Task = React.memo<{ task: TaskType }>(({ task }) => {
  const { id, title, taskContents } = task;
  return (
    <div key={id}>
      <Header as="h2" inverted>
        {title}
      </Header>
      <div
        css={css`
          margin-left: 16px;
        `}
      >
        {taskContents.map((taskContent) => {
          return <TaskContent key={taskContent.id} taskContent={taskContent} />;
        })}
        <Button
          inverted
          css={css`
            &&& {
              margin-top: 8px;
            }
          `}
        >
          <Icon name="plus" />
          追加
        </Button>
      </div>
    </div>
  );
});
