import { Company, Job } from './db.js';

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
    job: (_, { id }) => Job.findById(id),
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
};
