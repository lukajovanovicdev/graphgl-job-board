import { Company, Job } from './db.js';

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return Job.update(input);
    },
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
