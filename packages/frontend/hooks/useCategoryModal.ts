import React, { useCallback, useReducer } from "react";

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

type Props = {
  refetchCategories: () => Promise<unknown>;
};

export const useCategoryModal = ({ refetchCategories }: Props) => {
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [{ isEditing, title, color }, dispatch] = useReducer(reducer, {
    isEditing: false,
    title: "",
    color: Color.Red,
  });

  const handleAddCategory = useCallback(async () => {
    await addCategory({ variables: { category: { name: title, color } } });
    await refetchCategories();
    dispatch({ type: "initialize" });
  }, [addCategory, color, refetchCategories, title]);

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      await deleteCategory({ variables: { id } });
      await refetchCategories();
    },
    [deleteCategory, refetchCategories],
  );

  return { isEditing, title, color, dispatch, handleAddCategory, handleDeleteCategory };
};
