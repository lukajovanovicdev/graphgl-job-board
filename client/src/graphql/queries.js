import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

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

  const { jobs } = await request(GRAPHQL_URL, query);
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
  const { job } = await request(GRAPHQL_URL, query, variables);
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
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
};

export const createJob = async (input) => {
  const query = gql`
    mutation CreateJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const variables = { input };
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
};
