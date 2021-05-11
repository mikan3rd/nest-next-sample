import React, { useCallback, useReducer } from "react";

import { useAddTaskContentMutation, useDeleteTaskMutation } from "@/graphql/generated";

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

const initialState: State = {
  isActive: false,
  tmpTitle: "",
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...initialState };
    case "setIsActive":
      return { ...state, isActive: action.payload };
    case "setTmpTitle":
      return { ...state, tmpTitle: action.payload };
    default:
      return state;
  }
};

type Props = {
  taskId: number;
  refetchTasks: () => Promise<unknown>;
};

export const useTaskSection = ({ taskId, refetchTasks }: Props) => {
  const [{ isActive, tmpTitle }, dispatch] = useReducer(reducer, { ...initialState });

  const [deleteTask] = useDeleteTaskMutation();
  const [saveTaskContent] = useAddTaskContentMutation();

  const handleAddTaskContent = useCallback(async () => {
    await saveTaskContent({ variables: { taskContent: { title: tmpTitle, taskId } } });
    await refetchTasks();
    dispatch({ type: "initialize" });
  }, [refetchTasks, saveTaskContent, taskId, tmpTitle]);

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ variables: { id: taskId } });
    await refetchTasks();
  }, [deleteTask, refetchTasks, taskId]);

  return { isActive, tmpTitle, dispatch, handleAddTaskContent, handleDeleteTask };
};
