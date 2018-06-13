import { PullRequestEvent, PullRequestReviewCommentEvent } from './github.events';
import { pullRequestEventHTML, pullRequestReviewEventHTML } from './timeline.templates';

export const createFromEvent = event => {
  switch (event.type) {
    case PullRequestEvent:
      return pullRequestEventHTML(event);
    case PullRequestReviewCommentEvent:
      return pullRequestReviewEventHTML(event);
    default:
      return '';
  }
};
