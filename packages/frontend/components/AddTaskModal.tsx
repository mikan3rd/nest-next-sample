import React from "react";

import { css } from "@emotion/core";
import { Button, Dropdown, Input, Modal } from "semantic-ui-react";

import { useAddTaskMutation } from "../graphql/generated";

import { CategoryType } from "./TaskList";

type State = {
  title: string;
  categoryIds: string[];
};

type Action =
  | { type: "initialize" }
  | { type: "setTitle"; payload: string }
  | { type: "setCategoryIds"; payload: string[] };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, isActive: false, tmpTitle: "", tmpChecked: false };
    case "setTitle":
      return { ...state, title: action.payload };
    case "setCategoryIds":
      return { ...state, categoryIds: action.payload };
    default:
      break;
  }
};

export const AddTaskModal = React.memo<{
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchTasks: () => Promise<unknown>;
  categories: CategoryType[];
}>(({ open, setOpen, refetchTasks, categories }) => {
  const [addTask] = useAddTaskMutation();

  const [{ title, categoryIds }, dispatch] = React.useReducer(reducer, {
    title: "",
    categoryIds: [],
  });

  const handleAddTask = async () => {
    await addTask({ variables: { task: { title, categoryIds } } });
    await refetchTasks();
    setOpen(false);
  };

  const categoryOptions = categories.map(({ id, name }) => ({ value: id, text: name }));

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Header>新規作成</Modal.Header>
      <Modal.Content>
        <div>
          <div>タイトル</div>
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
        <div
          css={css`
            margin-top: 8px;
          `}
        >
          <div>カテゴリ</div>
          <Dropdown
            options={categoryOptions}
            search
            selection
            fluid
            multiple
            value={categoryIds}
            onChange={(e, d) => dispatch({ type: "setCategoryIds", payload: d.value as string[] })}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button content="作成" color="blue" disabled={!title} onClick={handleAddTask} />
        <Button content="キャンセル" onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
});
