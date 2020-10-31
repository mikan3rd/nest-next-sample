import React from "react";

import { css } from "@emotion/core";
import { Button, Header, Icon, Input } from "semantic-ui-react";

import { TaskContent, TaskContentType } from "../components/TaskContent";
import { TaskModel, useAddTaskContentMutation, useDeleteTaskMutation } from "../graphql/generated";

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

export type TaskType = Omit<TaskModel, "taskContents">;

export const Task = React.memo<{
  task: TaskType;
  taskContents: TaskContentType[];
  refetchTasks: () => Promise<unknown>;
}>(({ task, taskContents, refetchTasks }) => {
  const [{ isActive, tmpTitle }, dispatch] = React.useReducer(reducer, {
    isActive: false,
    tmpTitle: "",
  });
  const [deleteTask] = useDeleteTaskMutation();
  const [saveTaskContent] = useAddTaskContentMutation();
  const { id, title } = task;

  const handleAddTaskContent = async () => {
    await saveTaskContent({ variables: { taskContent: { title: tmpTitle, taskId: id } } });
    await refetchTasks();
    dispatch({ type: "initialize" });
  };

  const handleDeleteTask = async () => {
    await deleteTask({ variables: { id } });
    await refetchTasks();
  };

  return (
    <div
      key={id}
      css={css`
        margin-top: 32px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Header
          as="h2"
          inverted
          css={css`
            &&& {
              margin: 0;
            }
          `}
        >
          {title}
        </Header>
        <Button inverted icon="trash alternate" onClick={handleDeleteTask} />
      </div>
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
              width: 100%;
              padding: 4px;
            `}
          >
            <form
              css={css`
                width: 100%;
              `}
            >
              <Input
                value={tmpTitle}
                action={{
                  content: "保存",
                  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    e.preventDefault();
                    handleAddTaskContent();
                  },
                }}
                onChange={(e, d) => dispatch({ type: "setTmpTitle", payload: d.value })}
                css={css`
                  &&& {
                    width: 100%;
                  }
                `}
              />
            </form>
            <Button
              inverted
              icon="close"
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
