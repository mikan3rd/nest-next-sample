import { useCallback } from "react";

import { TaskContentType } from "@/components/TaskContent";
import { useDeleteTaskContentMutation, useUpdateTaskContentMutation } from "@/graphql/generated";

type Props = {
  taskContent: TaskContentType;
  refetchTasks: () => Promise<unknown>;
};

export const useTaskContent = ({ taskContent, refetchTasks }: Props) => {
  const [updateTaskContent] = useUpdateTaskContentMutation();
  const [deleteTaskContent] = useDeleteTaskContentMutation();

  const handleChangeChecked = useCallback(
    async (checked: boolean) => {
      await updateTaskContent({ variables: { taskContent: { id: taskContent.id, checked } } });
      await refetchTasks();
    },
    [refetchTasks, taskContent.id, updateTaskContent],
  );

  const handleDelete = useCallback(async () => {
    await deleteTaskContent({ variables: { id: taskContent.id } });
    await refetchTasks();
  }, [deleteTaskContent, refetchTasks, taskContent.id]);

  return { handleChangeChecked, handleDelete };
};
