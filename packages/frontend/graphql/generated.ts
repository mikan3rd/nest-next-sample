import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: number;
};

export type TaskContentModel = {
  id: Scalars["ID"];
  checked: Scalars["Boolean"];
  title: Scalars["String"];
  createdAt: Scalars["Date"];
  updatedAt: Scalars["Date"];
  task: TaskModel;
};

export type TaskModel = {
  id: Scalars["ID"];
  title: Scalars["String"];
  createdAt: Scalars["Date"];
  updatedAt: Scalars["Date"];
  taskContents: Array<TaskContentModel>;
  categories: Array<CategoryModel>;
};

export type CategoryModel = {
  id: Scalars["ID"];
  name: Scalars["String"];
  color: Color;
  createdAt: Scalars["Date"];
  updatedAt: Scalars["Date"];
  tasks: TaskModel;
};

export enum Color {
  Red = "red",
  Blue = "blue",
  Green = "green",
}

export type Query = {
  category?: Maybe<CategoryModel>;
  categories: Array<CategoryModel>;
  task?: Maybe<TaskModel>;
  tasks: Array<TaskModel>;
  taskContent?: Maybe<TaskContentModel>;
  taskContents: Array<TaskContentModel>;
};

export type QueryCategoryArgs = {
  id: Scalars["ID"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"];
};

export type QueryTaskContentArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  saveCategory: CategoryModel;
  deleteCategory?: Maybe<CategoryModel>;
  saveTask: TaskModel;
  deleteTask?: Maybe<TaskModel>;
  saveTaskContent: TaskContentModel;
  updateTaskContent: TaskContentModel;
  deleteTaskContent?: Maybe<TaskContentModel>;
};

export type MutationSaveCategoryArgs = {
  category: AddCategoryInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"];
};

export type MutationSaveTaskArgs = {
  task: AddTaskInput;
};

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"];
};

export type MutationSaveTaskContentArgs = {
  taskContent: AddTaskContentInput;
};

export type MutationUpdateTaskContentArgs = {
  taskContent: UpdateTaskContentInput;
};

export type MutationDeleteTaskContentArgs = {
  id: Scalars["ID"];
};

export type AddCategoryInput = {
  name: Scalars["String"];
  color: Color;
};

export type AddTaskInput = {
  title: Scalars["String"];
  categoryIds: Array<Scalars["ID"]>;
};

export type AddTaskContentInput = {
  title: Scalars["String"];
  taskId: Scalars["ID"];
};

export type UpdateTaskContentInput = {
  id: Scalars["ID"];
  checked?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
};

export type AddCategoryMutationVariables = Exact<{
  category: AddCategoryInput;
}>;

export type AddCategoryMutation = { saveCategory: Pick<CategoryModel, "id"> };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteCategoryMutation = { deleteCategory?: Maybe<Pick<CategoryModel, "id">> };

export type AddTaskMutationVariables = Exact<{
  task: AddTaskInput;
}>;

export type AddTaskMutation = { saveTask: Pick<TaskModel, "id"> };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTaskMutation = { deleteTask?: Maybe<Pick<TaskModel, "id">> };

export type AddTaskContentMutationVariables = Exact<{
  taskContent: AddTaskContentInput;
}>;

export type AddTaskContentMutation = { saveTaskContent: Pick<TaskContentModel, "id"> };

export type UpdateTaskContentMutationVariables = Exact<{
  taskContent: UpdateTaskContentInput;
}>;

export type UpdateTaskContentMutation = { updateTaskContent: Pick<TaskContentModel, "id"> };

export type DeleteTaskContentMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTaskContentMutation = { deleteTaskContent?: Maybe<Pick<TaskContentModel, "id">> };

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  categories: Array<Pick<CategoryModel, "id" | "name" | "color" | "createdAt" | "updatedAt">>;
};

export type TasksQueryVariables = Exact<{ [key: string]: never }>;

export type TasksQuery = {
  tasks: Array<
    Pick<TaskModel, "id" | "title" | "createdAt" | "updatedAt"> & {
      taskContents: Array<Pick<TaskContentModel, "id" | "checked" | "title" | "createdAt" | "updatedAt">>;
      categories: Array<Pick<CategoryModel, "id" | "name" | "color">>;
    }
  >;
};

export const AddCategoryDocument = gql`
  mutation addCategory($category: AddCategoryInput!) {
    saveCategory(category: $category) {
      id
    }
  }
`;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useAddCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>,
) {
  return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, baseOptions);
}
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>,
) {
  return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    DeleteCategoryDocument,
    baseOptions,
  );
}
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export const AddTaskDocument = gql`
  mutation addTask($task: AddTaskInput!) {
    saveTask(task: $task) {
      id
    }
  }
`;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useAddTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>,
) {
  return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, baseOptions);
}
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const DeleteTaskDocument = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>,
) {
  return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
}
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const AddTaskContentDocument = gql`
  mutation addTaskContent($taskContent: AddTaskContentInput!) {
    saveTaskContent(taskContent: $taskContent) {
      id
    }
  }
`;
export type AddTaskContentMutationFn = Apollo.MutationFunction<AddTaskContentMutation, AddTaskContentMutationVariables>;

/**
 * __useAddTaskContentMutation__
 *
 * To run a mutation, you first call `useAddTaskContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskContentMutation, { data, loading, error }] = useAddTaskContentMutation({
 *   variables: {
 *      taskContent: // value for 'taskContent'
 *   },
 * });
 */
export function useAddTaskContentMutation(
  baseOptions?: Apollo.MutationHookOptions<AddTaskContentMutation, AddTaskContentMutationVariables>,
) {
  return Apollo.useMutation<AddTaskContentMutation, AddTaskContentMutationVariables>(
    AddTaskContentDocument,
    baseOptions,
  );
}
export type AddTaskContentMutationHookResult = ReturnType<typeof useAddTaskContentMutation>;
export type AddTaskContentMutationResult = Apollo.MutationResult<AddTaskContentMutation>;
export type AddTaskContentMutationOptions = Apollo.BaseMutationOptions<
  AddTaskContentMutation,
  AddTaskContentMutationVariables
>;
export const UpdateTaskContentDocument = gql`
  mutation updateTaskContent($taskContent: UpdateTaskContentInput!) {
    updateTaskContent(taskContent: $taskContent) {
      id
    }
  }
`;
export type UpdateTaskContentMutationFn = Apollo.MutationFunction<
  UpdateTaskContentMutation,
  UpdateTaskContentMutationVariables
>;

/**
 * __useUpdateTaskContentMutation__
 *
 * To run a mutation, you first call `useUpdateTaskContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskContentMutation, { data, loading, error }] = useUpdateTaskContentMutation({
 *   variables: {
 *      taskContent: // value for 'taskContent'
 *   },
 * });
 */
export function useUpdateTaskContentMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTaskContentMutation, UpdateTaskContentMutationVariables>,
) {
  return Apollo.useMutation<UpdateTaskContentMutation, UpdateTaskContentMutationVariables>(
    UpdateTaskContentDocument,
    baseOptions,
  );
}
export type UpdateTaskContentMutationHookResult = ReturnType<typeof useUpdateTaskContentMutation>;
export type UpdateTaskContentMutationResult = Apollo.MutationResult<UpdateTaskContentMutation>;
export type UpdateTaskContentMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaskContentMutation,
  UpdateTaskContentMutationVariables
>;
export const DeleteTaskContentDocument = gql`
  mutation deleteTaskContent($id: ID!) {
    deleteTaskContent(id: $id) {
      id
    }
  }
`;
export type DeleteTaskContentMutationFn = Apollo.MutationFunction<
  DeleteTaskContentMutation,
  DeleteTaskContentMutationVariables
>;

/**
 * __useDeleteTaskContentMutation__
 *
 * To run a mutation, you first call `useDeleteTaskContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskContentMutation, { data, loading, error }] = useDeleteTaskContentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskContentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTaskContentMutation, DeleteTaskContentMutationVariables>,
) {
  return Apollo.useMutation<DeleteTaskContentMutation, DeleteTaskContentMutationVariables>(
    DeleteTaskContentDocument,
    baseOptions,
  );
}
export type DeleteTaskContentMutationHookResult = ReturnType<typeof useDeleteTaskContentMutation>;
export type DeleteTaskContentMutationResult = Apollo.MutationResult<DeleteTaskContentMutation>;
export type DeleteTaskContentMutationOptions = Apollo.BaseMutationOptions<
  DeleteTaskContentMutation,
  DeleteTaskContentMutationVariables
>;
export const CategoriesDocument = gql`
  query categories {
    categories {
      id
      name
      color
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>,
) {
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const TasksDocument = gql`
  query tasks {
    tasks {
      id
      title
      createdAt
      updatedAt
      taskContents {
        id
        checked
        title
        createdAt
        updatedAt
      }
      categories {
        id
        name
        color
      }
    }
  }
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
  return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
}
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
  return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
}
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
