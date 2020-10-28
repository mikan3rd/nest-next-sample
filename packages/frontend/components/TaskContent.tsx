import React from "react";

import { css } from "@emotion/core";
import { Header } from "semantic-ui-react";

import { TaskContentModel } from "../graphql/generated";

export const TaskContent = React.memo<{ taskContent: Omit<TaskContentModel, "task"> }>(({ taskContent }) => {
  const { id, title } = taskContent;

  return (
    <div
      key={id}
      css={css`
        margin-top: 8px;
      `}
    >
      <Header as="h3" inverted>
        {title}
      </Header>
    </div>
  );
});
