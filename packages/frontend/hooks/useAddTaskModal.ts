import React, { useCallback, useReducer } from "react";

import { useAddTaskMutation } from "@/graphql/generated";

type State = {
  title: string;
  categoryIds: number[];
};

type Action =
  | { type: "initialize" }
  | { type: "setTitle"; payload: string }
  | { type: "setCategoryIds"; payload: number[] };

const initialState: State = {
  title: "",
  categoryIds: [],
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...initialState };
    case "setTitle":
      return { ...state, title: action.payload };
    case "setCategoryIds":
      return { ...state, categoryIds: action.payload };
    default:
      return state;
  }
};

type Props = {
  setOpen: (open: boolean) => void;
  refetchTasks: () => Promise<unknown>;
};

export const useAddTaskModal = ({ setOpen, refetchTasks }: Props) => {
  const [addTask] = useAddTaskMutation();

  const [{ title, categoryIds }, dispatch] = useReducer(reducer, { ...initialState });

  const handleAddTask = useCallback(async () => {
    await addTask({ variables: { task: { title, categoryIds } } });
    await refetchTasks();
    dispatch({ type: "initialize" });
    setOpen(false);
  }, [addTask, categoryIds, refetchTasks, setOpen, title]);

  return { title, categoryIds, dispatch, handleAddTask };
};
