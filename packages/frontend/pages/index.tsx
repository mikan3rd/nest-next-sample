import React from "react";

import { css } from "@emotion/core";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Container, Header } from "semantic-ui-react";

import { Task } from "../components/Task";
import { client } from "../graphql/client";
import { TasksDocument, TasksQuery, TasksQueryVariables, useTasksQuery } from "../graphql/generated";

type Props = { initialData: TasksQuery };

export default React.memo<Props>(({ initialData }) => {
  const { data } = useTasksQuery();
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
        <Header as="h1" inverted>
          Nest Next TODO Sample
        </Header>
        <div
          css={css`
            margin-top: 32px;
          `}
        >
          {tasksData.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>
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
