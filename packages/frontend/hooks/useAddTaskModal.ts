import React, { useCallback, useReducer } from "react";

import { useAddTaskMutation } from "@/graphql/generated";

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

type Props = {
  setOpen: (open: boolean) => void;
  refetchTasks: () => Promise<unknown>;
};

export const useAddTaskModal = ({ setOpen, refetchTasks }: Props) => {
  const [addTask] = useAddTaskMutation();

  const [{ title, categoryIds }, dispatch] = useReducer(reducer, {
    title: "",
    categoryIds: [],
  });

  const handleAddTask = useCallback(async () => {
    await addTask({ variables: { task: { title, categoryIds } } });
    await refetchTasks();
    setOpen(false);
  }, [addTask, categoryIds, refetchTasks, setOpen, title]);

  return { title, categoryIds, dispatch, handleAddTask };
};
