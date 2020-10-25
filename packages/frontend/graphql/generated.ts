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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type TaskModel = {
  __typename?: "TaskModel";
  id: Scalars["Float"];
  title: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Query = {
  __typename?: "Query";
  task?: Maybe<TaskModel>;
  tasks: Array<TaskModel>;
};

export type QueryTaskArgs = {
  id: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  saveTask: TaskModel;
  deleteTask?: Maybe<TaskModel>;
};

export type MutationSaveTaskArgs = {
  task: TaskDto;
};

export type MutationDeleteTaskArgs = {
  id: Scalars["Float"];
};

export type TaskDto = {
  id?: Maybe<Scalars["Float"]>;
  title: Scalars["String"];
};

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars["Float"];
}>;

export type DeleteTaskMutation = { __typename?: "Mutation" } & {
  deleteTask?: Maybe<{ __typename?: "TaskModel" } & Pick<TaskModel, "id" | "title">>;
};

export type TasksQueryVariables = Exact<{ [key: string]: never }>;

export type TasksQuery = { __typename?: "Query" } & {
  tasks: Array<{ __typename?: "TaskModel" } & Pick<TaskModel, "id" | "title">>;
};

export const DeleteTaskDocument = gql`
  mutation deleteTask($id: Float!) {
    deleteTask(id: $id) {
      id
      title
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
export const TasksDocument = gql`
  query tasks {
    tasks {
      id
      title
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
