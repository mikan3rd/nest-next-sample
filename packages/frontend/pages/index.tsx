import React from "react";

import { css } from "@emotion/core";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Container, Header } from "semantic-ui-react";

import { TaskList } from "../components/TaskList";
import { client } from "../graphql/client";
import { TasksDocument, TasksQuery, TasksQueryVariables, useTasksQuery } from "../graphql/generated";

type Props = { initialData: TasksQuery };

export default React.memo<Props>(({ initialData }) => {
  const { data, refetch } = useTasksQuery();
  const tasksData = data ? data.tasks : initialData.tasks;

  return (
    <div>
      <Head>
        <title>Nest Next TODO Sample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        css={css`
          padding-top: 20px;
          min-height: 100vh;
        `}
      >
        <Header as="h1">Nest Next TODO Sample</Header>
        <TaskList tasksData={tasksData} refetchTasks={refetch} />
      </Container>
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
