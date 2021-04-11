import React, { memo } from "react";

import { css } from "@emotion/react";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Container, Header } from "semantic-ui-react";

import { TaskList } from "@/components/TaskList";
import { client } from "@/graphql/client";
import { TasksDocument, TasksQuery, TasksQueryVariables, useTasksQuery } from "@/graphql/generated";

export const getServerSideProps = async () => {
  const { data } = await client.query<TasksQuery, TasksQueryVariables>({
    query: TasksDocument,
  });
  return { props: { initialData: data } };
};

export default memo<InferGetServerSidePropsType<typeof getServerSideProps>>(({ initialData }) => {
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
