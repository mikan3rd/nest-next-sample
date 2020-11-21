import React from "react";

import { css } from "@emotion/core";
import { Button, Dropdown, Input, Modal, Table } from "semantic-ui-react";

import { CategoryType } from "@/components/TaskList";
import { Color, useAddCategoryMutation, useDeleteCategoryMutation } from "@/graphql/generated";

type State = {
  isEditing: boolean;
  title: string;
  color: Color;
};

type Action =
  | { type: "initialize" }
  | { type: "setIsEditing"; payload: boolean }
  | { type: "setTitle"; payload: string }
  | { type: "setColor"; payload: Color };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, isEditing: false, title: "" };
    case "setIsEditing":
      return { ...state, isEditing: action.payload };
    case "setTitle":
      return { ...state, title: action.payload };
    case "setColor":
      return { ...state, color: action.payload };
    default:
      break;
  }
};

export const CategoryModal = React.memo<{
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchCategories: () => Promise<unknown>;
  categories: CategoryType[];
}>(({ open, setOpen, refetchCategories, categories }) => {
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [{ isEditing, title, color }, dispatch] = React.useReducer(reducer, {
    isEditing: false,
    title: "",
    color: Color.Red,
  });

  const createColorOptions = () => {
    return Object.values(Color).map((colorName) => ({ value: colorName, text: colorName }));
  };

  const handleAddCategory = async () => {
    await addCategory({ variables: { category: { name: title, color } } });
    await refetchCategories();
    dispatch({ type: "initialize" });
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory({ variables: { id } });
    await refetchCategories();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Header>カテゴリ設定</Modal.Header>
      <Modal.Content scrolling>
        <div
          css={css`
            padding-bottom: 120px;
          `}
        >
          <Table
            striped
            unstackable
            css={css`
              min-width: 450px;
            `}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>カテゴリ名</Table.HeaderCell>
                <Table.HeaderCell>色</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {categories.map(({ id, name, color }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{color}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button icon="trash alternate" color="red" onClick={() => handleDeleteCategory(id)} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              {isEditing ? (
                <Table.Row>
                  <Table.Cell>
                    <Input value={title} onChange={(e, d) => dispatch({ type: "setTitle", payload: d.value })} />
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      options={createColorOptions()}
                      search
                      selection
                      value={color}
                      onChange={(e, d) => dispatch({ type: "setColor", payload: d.value as Color })}
                      css={css`
                        &&& {
                          min-width: 100px;
                        }
                      `}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button content="登録" color="blue" disabled={!title} onClick={handleAddCategory} />
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell textAlign="right">
                    <Button
                      content="追加"
                      color="blue"
                      onClick={() => dispatch({ type: "setIsEditing", payload: true })}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button content="閉じる" onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
});
