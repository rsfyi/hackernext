import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { Layout } from '../components/Layout';
import { CommentList } from '../components/CommentList';

const Story = ({ story }) => {
  if (!story) {
    <Error statusCode={503} />;
  }

  return (
    <Layout title={story.title} description={story.title} backButton={true}>
      <main>
        <h1 className='story-title'>
          <a href={story.url}>{story.title}</a>
        </h1>
        <div className='story-details'>
          <strong>{story.points} points</strong>
          <strong>{story.comments_count} comments</strong>
          <strong>{story.time_ago}</strong>
        </div>

        {story.comments.length > 0 ? (
          <CommentList comments={story.comments} />
        ) : (
          <div>No comments for this story</div>
        )}
      </main>
      <style jsx>{`
        main {
          padding: 1em;
        }
        .story-title {
          font-size: 1.2rem;
          margin: 0;
          font-weight: 300;
          padding-bottom: 0.5em;
        }

        .story-title a {
          color: #333;
          text-decoration: none;
        }

        .story-title a:hover {
          text-decoration: underline;
        }

        .story-details {
          font-size: 0.8rem;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 1em;
        }

        .story-details strong {
          margin-right: 1em;
        }

        .story-details a {
          color: #f60;
        }
      `}</style>
    </Layout>
  );
};

export default Story;

Story.getInitialProps = async ({ req, res, query }) => {
  const storyId = query.id;
  let story;

  try {
    const res = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`);
    story = await res.json();
  } catch (err) {
    console.log(' Error while fetching Story');
    story = null;
  }

  return { story };
};
