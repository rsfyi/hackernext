import { Comment } from './Comment';

export const CommentList = ({ comments }) => (
  <>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </>
);
