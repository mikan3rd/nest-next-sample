import React from "react";

import { css } from "@emotion/core";
import { Button, Header, Icon, Input } from "semantic-ui-react";

import { TaskContent, TaskContentType } from "../components/TaskContent";
import { TaskModel, useAddTaskContentMutation } from "../graphql/generated";

type State = {
  isActive: boolean;
  tmpTitle: string;
};

type Action =
  | { type: "initialize" }
  | {
      type: "setIsActive";
      payload: boolean;
    }
  | { type: "setTmpTitle"; payload: string };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, isActive: false, tmpTitle: "", tmpChecked: false };
    case "setIsActive":
      return { ...state, isActive: action.payload };
    case "setTmpTitle":
      return { ...state, tmpTitle: action.payload };
    default:
      break;
  }
};

export const Task = React.memo<{
  task: Omit<TaskModel, "taskContents">;
  taskContents: TaskContentType[];
  refetchTasks: () => Promise<unknown>;
}>(({ task, taskContents, refetchTasks }) => {
  const [{ isActive, tmpTitle }, dispatch] = React.useReducer(reducer, {
    isActive: false,
    tmpTitle: "",
  });
  const [saveTaskContent] = useAddTaskContentMutation();
  const { id, title } = task;

  const handleAddTaskContent = async () => {
    await saveTaskContent({ variables: { taskContent: { title: tmpTitle, taskId: id } } });
    await refetchTasks();
    dispatch({ type: "initialize" });
  };

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
          return <TaskContent key={taskContent.id} taskContent={taskContent} refetchTasks={refetchTasks} />;
        })}
        {!isActive && (
          <Button
            inverted
            onClick={() => dispatch({ type: "setIsActive", payload: true })}
            css={css`
              &&& {
                margin-top: 8px;
              }
            `}
          >
            <Icon name="plus" />
            追加
          </Button>
        )}
        {isActive && (
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-top: 8px;
            `}
          >
            <Input
              value={tmpTitle}
              action={{
                content: "保存",
                onClick: handleAddTaskContent,
              }}
              onChange={(e, d) => dispatch({ type: "setTmpTitle", payload: d.value })}
            />
            <Button
              icon="delete"
              onClick={() => dispatch({ type: "setIsActive", payload: false })}
              css={css`
                &&& {
                  margin-left: 8px;
                }
              `}
            />
          </div>
        )}
      </div>
    </div>
  );
});
