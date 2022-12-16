import { Company, Job } from './db.js';

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
    job: (_, { id }) => Job.findById(id),
    company: (_, { id }) => Company.findById(id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
