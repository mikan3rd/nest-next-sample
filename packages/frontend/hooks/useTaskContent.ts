import { useCallback } from "react";

import { useDeleteTaskContentMutation, useUpdateTaskContentMutation } from "@/graphql/generated";

type Props = {
  taskContentId: number;
  refetchTasks: () => Promise<unknown>;
};

export const useTaskContent = ({ taskContentId, refetchTasks }: Props) => {
  const [updateTaskContent] = useUpdateTaskContentMutation();
  const [deleteTaskContent] = useDeleteTaskContentMutation();

  const handleChangeChecked = useCallback(
    async (checked: boolean) => {
      await updateTaskContent({ variables: { taskContent: { id: taskContentId, checked } } });
      await refetchTasks();
    },
    [refetchTasks, taskContentId, updateTaskContent],
  );

  const handleDelete = useCallback(async () => {
    await deleteTaskContent({ variables: { id: taskContentId } });
    await refetchTasks();
  }, [deleteTaskContent, refetchTasks, taskContentId]);

  return { handleChangeChecked, handleDelete };
};
