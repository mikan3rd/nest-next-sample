import React, { memo } from "react";

import { css } from "@emotion/core";
import { Button, Header, Icon, Input, Label } from "semantic-ui-react";

import { TaskContent, TaskContentType } from "@/components/TaskContent";
import { Color } from "@/graphql/generated";
import { useTaskSection } from "@/hooks/useTaskSection";

export type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  categories: {
    id: string;
    name: string;
    color: Color;
  }[];
};

export const TaskSection = memo<{
  task: TaskType;
  taskContents: TaskContentType[];
  refetchTasks: () => Promise<unknown>;
}>(({ task, taskContents, refetchTasks }) => {
  const { isActive, tmpTitle, dispatch, handleAddTaskContent, handleDeleteTask } = useTaskSection({
    task,
    refetchTasks,
  });

  const { id, title, categories } = task;

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
          align-items: flex-start;
        `}
      >
        <div>
          <Header
            as="h2"
            css={css`
              &&& {
                margin: 0;
              }
            `}
          >
            {title}
          </Header>
          <div
            css={css`
              display: flex;
              margin-top: 4px;
            `}
          >
            {categories.map((category) => {
              return (
                <Label
                  key={category.id}
                  content={category.name}
                  color={category.color}
                  tag
                  css={css`
                    &&& {
                      margin-right: 12px;
                    }
                  `}
                />
              );
            })}
          </div>
        </div>
        <Button icon="trash alternate" color="red" onClick={handleDeleteTask} />
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
            basic
            color="blue"
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
                  disabled: !tmpTitle,
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
