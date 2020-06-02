import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { StoryList } from '../components/StoryList';
import { Layout } from '../components/Layout';
import Link from 'next/link';

const Index = ({ stories, page }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />;
  }
  return (
    <Layout title='Hacker Next' description='Hacker news clone'>
      <StoryList stories={stories} />
      <footer>
        <Link href={`/?page=${page + 1}`}>
          <a>Next Page ({page + 1})</a>
        </Link>
      </footer>
      <style jsx>{`
        footer {
          padding: 1em;
        }

        footer a {
          font-weight: bold;
          color: black;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

export default Index;

Index.getInitialProps = async ({ req, res, query }) => {
  let stories;
  let page;

  try {
    page = Number(query.page) || 1;
    const res = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    );
    stories = await res.json();
  } catch (err) {
    console.log(' [ Error ] - ', err.message);
    stories = [];
  }
  return { stories, page };
};
