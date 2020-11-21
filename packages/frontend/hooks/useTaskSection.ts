import React, { useCallback, useReducer } from "react";

import { TaskType } from "@/components/TaskSection";
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

type Props = {
  task: TaskType;
  refetchTasks: () => Promise<unknown>;
};

export const useTaskSection = ({ task, refetchTasks }: Props) => {
  const [{ isActive, tmpTitle }, dispatch] = useReducer(reducer, {
    isActive: false,
    tmpTitle: "",
  });

  const [deleteTask] = useDeleteTaskMutation();
  const [saveTaskContent] = useAddTaskContentMutation();

  const handleAddTaskContent = useCallback(async () => {
    await saveTaskContent({ variables: { taskContent: { title: tmpTitle, taskId: task.id } } });
    await refetchTasks();
    dispatch({ type: "initialize" });
  }, [refetchTasks, saveTaskContent, task.id, tmpTitle]);

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ variables: { id: task.id } });
    await refetchTasks();
  }, [deleteTask, refetchTasks, task.id]);

  return { isActive, tmpTitle, dispatch, handleAddTaskContent, handleDeleteTask };
};
