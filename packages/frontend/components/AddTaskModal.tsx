import React from "react";

import { css } from "@emotion/core";
import { Button, Input, Modal } from "semantic-ui-react";

import { useAddTaskMutation } from "../graphql/generated";

type State = {
  title: string;
};

type Action = { type: "initialize" } | { type: "setTitle"; payload: string };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, isActive: false, tmpTitle: "", tmpChecked: false };
    case "setTitle":
      return { ...state, title: action.payload };
    default:
      break;
  }
};

export const AddTaskModal = React.memo<{
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchTasks: () => Promise<unknown>;
}>(({ open, setOpen, refetchTasks }) => {
  const [addTask] = useAddTaskMutation();

  const [{ title }, dispatch] = React.useReducer(reducer, {
    title: "",
  });

  const handleAddTask = async () => {
    await addTask({ variables: { task: { title } } });
    await refetchTasks();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Header>新規作成</Modal.Header>
      <Modal.Content>
        <div>
          <div
            css={css`
              color: black;
            `}
          >
            タイトル
          </div>
          <Input
            value={title}
            onChange={(e, d) => dispatch({ type: "setTitle", payload: d.value })}
            css={css`
              &&& {
                margin-top: 4px;
                width: 100%;
              }
            `}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button content="作成" disabled={!title} onClick={handleAddTask} />
      </Modal.Actions>
    </Modal>
  );
});
