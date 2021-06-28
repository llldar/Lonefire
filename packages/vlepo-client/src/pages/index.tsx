import dynamic from 'next/dynamic';
import { usePagination, useQuery } from 'relay-hooks';
import { fetchQuery, graphql } from 'relay-runtime';
import { pages_Index_BlogQuery } from 'src/__generated__/pages_Index_BlogQuery.graphql';
import { ErrorText } from 'src/components/Input';
import { Loading } from 'src/components/PlaceHolder';
import { useMetaData } from 'src/hooks/useMetaData';
import { initEnvironment } from 'src/relay';

import styled from '@emotion/styled';

import type { GetServerSidePropsContext } from 'next';

const ArticleCard = dynamic(() => import('src/components/ArticleCard'), { loading: Loading });

const blogQuery = graphql`
  query pages_Index_BlogQuery($id: String!) {
    blog(where: { id: $id }) {
      ...pages_Index_Posts
    }
  }
`;

const indexPostsFragment = graphql`
  fragment pages_Index_Posts on Blog {
    postsConnection(first: 5) @connection(key: "Index_postsConnection") {
      edges {
        node {
          ...ArticleCard_post
        }
      }
    }
  }
`;
export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const { environment, relaySSR } = initEnvironment(req.cookies.accessToken);
  await new Promise((resolve, reject) => {
    fetchQuery(environment, blogQuery, {
      id: process.env.NEXT_PUBLIC_DEFAULT_BLOG_ID,
    }).subscribe({
      complete: () => resolve(undefined),
      error: (err: Error) => reject(err),
    });
  });
  const [relayData] = await relaySSR.getCache();
  const [queryString, queryPayload] = relayData ?? [];

  if (req.cookies.accessToken) {
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    res.setHeader('Cache-Control', 'max-age=0,s-maxage=604800, stale-while-revalidate');
  }

  return {
    props: {
      relayData: relayData && 'json' in queryPayload ? [[queryString, queryPayload.json]] : null,
    },
  };
};

type PostSectionProps = {
  blog: pages_Index_Posts$key;
};
const PostsSection = (props: PostSectionProps) => {
  const { blog } = props;

  const { data, hasNext } = usePagination<IndexPostRefetchQuery, pages_Index_Posts$key>(
    indexFragmentSpec,
    blog!,
  );

  const maybeLoadMore = useInfiniteLoader(() => hasNext && loadNext(10), {
    isItemLoaded: (index) => (data?.postsConnection?.edges?.length ?? 0) - 1 > index,
  });

  if (!data) return <PlaceHolder />;

  return (
    <IndexRow mx={['0.3rem', '2rem', '6rem']}>
      <IndexMasonry<ArticleCard_post$key>
        columnWidth={350}
        items={
          data && data.postsConnection && data.postsConnection.edges
            ? data.postsConnection.edges
                .filter((e) => e !== null && e.node !== null)
                .map((e) => e!.node!)
            : []
        }
        columnGutter={20}
        overscanBy={2}
        render={MasonryCard}
        onRender={maybeLoadMore}
      />
      {isLoadingNext && <PlaceHolder width="100%" />}
    </IndexRow>
  );
};

export default function Home() {
  const { error, data } = useQuery<pages_Index_BlogQuery>(blogQuery, {
    id: process.env.NEXT_PUBLIC_DEFAULT_BLOG_ID,
  });

  const { subtitle } = useMetaData();

  if (error) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  return (
    <>
      <h1>Test</h1>
    </>
  );
}
