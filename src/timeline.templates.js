import moment from 'moment';

const dateFormat = 'MMM D, Y';

export const pullRequestEventHTML = eventObject => `
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <p class="heading">${moment(eventObject.created_at).format(dateFormat)}</p>
    <div class="content gh-content">
      <span class="gh-username">
        <img src="${eventObject.actor.avatar_url}"/>
        <a href="${eventObject.actor.url}">${eventObject.actor.display_login}</a>
      </span>
      ${eventObject.payload.action}
      <a href="${eventObject.payload.pull_request.url}">pull request</a>
      <p class="repo-name">
        <a href="${eventObject.repo.url}">${eventObject.repo.name}</a>
      </p>
    </div>
  </div>
</div>
`;

export const pullRequestReviewEventHTML = eventObject => `
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <p class="heading">${moment(eventObject.created_at).format(dateFormat)}</p>
    <div class="content gh-content">
      <span class="gh-username">
        <img src="${eventObject.actor.avatar_url}"/>
        <a href="${eventObject.actor.url}">${eventObject.actor.display_login}</a>
      </span>
      created
      <a href="${eventObject.comment.url}">comment</a>
      to
      <a href="${eventObject.payload.pull_request.url}">pull request</a>
      <p class="repo-name">
        <a href="${eventObject.repo.url}">${eventObject.repo.name}</a>
      </p>
    </div>
  </div>
</div>
`;
