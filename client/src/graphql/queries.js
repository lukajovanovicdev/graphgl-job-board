import { getAccessToken } from '../auth';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const getJobs = async () => {
  const query = gql`
    {
      jobs {
        id
        title
        description
        company {
          name
        }
      }
    }
  `;

  const {
    data: { jobs },
  } = await client.query({ query });
  return jobs;
};

export const getJob = async (id) => {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        title
        id
        company {
          id
          name
        }
        description
      }
    }
  `;

  const variables = { id };
  const {
    data: { job },
  } = await client.query({ query, variables });
  return job;
};

export const getCompany = async (id) => {
  const query = gql`
    query CompanyQuery($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;

  const variables = { companyId: id };

  const {
    data: { company },
  } = await client.query({ query, variables });
  return company;
};

export const createJob = async (input) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const variables = { input };

  const context = { headers: { Authorization: 'Bearer ' + getAccessToken() } };

  const {
    data: { job },
  } = await client.mutate({ mutation, variables, context });

  return job;
};
