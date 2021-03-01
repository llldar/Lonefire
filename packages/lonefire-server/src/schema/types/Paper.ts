import { objectType } from 'nexus';

export const Paper = objectType({
  name: 'Paper',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.content();
    t.model.url();
    t.model.tags();
    t.model.images();
    t.model.reactions();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
