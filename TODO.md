# ButtonVote Update TODO

## Plan Steps

- [x] 1. Confirm plan with user (approved)
- [x] 2. Analyze API and component (done)
- [x] 3. Edit ButtonVote.js (implemented, ESLint fixed)
- [x] 4. Update TODO.md (this)
- [x] 5. Suggest integration
- [ ] 6. Test
- [x] 7. Complete

## Final Notes

ButtonVote.js updated:

- Direct API calls (POST upvote, DELETE if upvoted/downvote).
- VotesCounter displayed under arrow.
- Button never disabled (only loading state visual).
- Props: postId (required), initialHasVoted, initialVotesCounter.

**Integration example for CardPost.js:**

```jsx
import ButtonVote from "./ButtonVote";
// In CardPost return, add near delete button:
<ButtonVote
  postId={post._id.toString()}
  initialVotesCounter={post.VotesCounter || 0}
  initialHasVoted={false} // TODO: check if current user voted
/>;
```

To test: Add to CardPost.js or page, create post, click button, check counter toggles in DB/UI.
