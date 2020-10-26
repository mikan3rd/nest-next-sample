import React from "react";

import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";

import { client } from "../graphql/client";
import { TasksDocument, TasksQuery, TasksQueryVariables, useTasksQuery } from "../graphql/generated";

type Props = { initialData: TasksQuery };

export default React.memo<Props>(({ initialData }) => {
  const { data } = useTasksQuery();
  const tasksData = data ? data.tasks : initialData.tasks;

  return (
    <div>
      <Head>
        <title>Nest Next Sample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {tasksData.map(({ id, title }) => {
          return <div key={id}>{title}</div>;
        })}
      </div>
    </div>
  );
});

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<TasksQuery, TasksQueryVariables>({
    query: TasksDocument,
  });
  const result: GetServerSidePropsResult<Props> = { props: { initialData: data } };
  return result;
};
