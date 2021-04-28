import React from 'react';
import { graphql } from 'react-relay';
import { usePagination } from 'relay-hooks';
import { CommentRefetchQuery } from 'src/__generated__/CommentRefetchQuery.graphql';
import { CommentSection_commendable$key } from 'src/__generated__/CommentSection_commendable.graphql';
import { CommentSection_user$key } from 'src/__generated__/CommentSection_user.graphql';
import Comment from 'src/components/Comment';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { match } from 'ts-pattern';

import { Markdown } from '@emotion-icons/fa-brands/Markdown';

import Avatar from '../Avatar';
import GradientButton from '../GradientButton';
import { TextArea } from '../Input';
import { Row } from '../Layout/style';
import PlaceHolder from '../PlaceHolder';
import { H3, H5 } from '../Typography';
import { BaseCommentSection, NewComment } from './style';

const commentFragmentSpec = graphql`
  fragment CommentSection_commendable on Commendable
  @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" })
  @refetchable(queryName: "CommentRefetchQuery") {
    commentsConnection(first: $count, after: $cursor)
      @connection(key: "CommentSection_commentsConnection") {
      edges {
        node {
          id
          ...Comment_comment
        }
      }
    }
  }
`;

const CommentSection_user = graphql`
  fragment CommentSection_user on User {
    id
    name
    profileImageUrl
  }
`;

type CommentSectionProps = {
  parent: CommentSection_commendable$key;
  variant: 'profile' | 'post';
} & React.ComponentProps<typeof BaseCommentSection>;

const CommentSection = (props: CommentSectionProps) => {
  const { parent, variant, ...rest } = props;
  const currentUser = useCurrentUser<CommentSection_user$key>(CommentSection_user);
  const { data, isLoadingNext, hasNext, loadNext } = usePagination<
    CommentRefetchQuery,
    CommentSection_commendable$key
  >(commentFragmentSpec, parent);

  return (
    <BaseCommentSection {...rest}>
      {match(variant)
        .with('profile', () => (
          <H3 pl="2rem" py="1rem">
            Comments({data?.commentsConnection?.edges?.length ?? 0})
          </H3>
        ))
        .with('post', () => null)
        .run()}
      {data &&
      data.commentsConnection &&
      data.commentsConnection.edges &&
      data.commentsConnection.edges.length > 0 ? (
        data.commentsConnection.edges.map(
          (e) =>
            e &&
            e.node && (
              <Comment
                currentUser={currentUser}
                variant={variant}
                px={match(variant)
                  .with('profile', () => '2rem')
                  .with('post', () => '1rem')
                  .run()}
                py="1rem"
                key={e.node.id}
                comment={e.node}
              />
            ),
        )
      ) : (
        <PlaceHolder />
      )}
      {isLoadingNext && <PlaceHolder />}
      {hasNext && (
        <GradientButton mx="2rem" mb="1rem" onClick={() => loadNext(5)}>
          Load More
        </GradientButton>
      )}
      <NewComment>
        {currentUser ? (
          <>
            <Row alignItems="center" mb="0.75rem">
              <Avatar size={32} src={currentUser.profileImageUrl} />
              <H5 mx="0.5rem">{currentUser.name}</H5>
            </Row>
            <TextArea />
            <Row mt="0.5rem" alignItems="center">
              <Markdown size={24} />
              <H5 ml="0.5rem">markdown powered</H5>
              <GradientButton ml="auto" mr="0.5rem">
                Comment
              </GradientButton>
            </Row>
          </>
        ) : (
          <>
            <Row justifyContent="center" alignItems="center" height="5rem">
              Please Login to comment
            </Row>
          </>
        )}
      </NewComment>
    </BaseCommentSection>
  );
};

export default CommentSection;
