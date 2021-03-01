import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.owner();
    t.model.title();
    t.model.content();
    t.model.headerImageUrl();
    t.model.comments();
    t.model.shares();
    t.model.ratings();
    t.model.reactions();
    t.model.minuteRead();
    t.model.tags();
    t.model.status();
    t.model.images();
    t.model.editedAt();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
