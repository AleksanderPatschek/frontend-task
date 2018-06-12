import $ from 'cash-dom';
import './assets/scss/app.scss';
import { fetchUser, fetchUserEvents } from './github.repository';
import { PullRequestEvent, PullRequestReviewCommentEvent } from './github.events';
import { createFromEvent } from './timeline.factory';

const userInputValidationRule = /^[a-z0-9_-]+$/;
const eventsFilter = [PullRequestEvent, PullRequestReviewCommentEvent];

export class App {
  initializeApp() {
    $('#username-input')
      .on('keyup', this.validateInput)
      .on('focus', this.validateInput);
    $('#load-username').on('click', this.handleUserSubmit);
  }

  validateInput = e => {
    const $input = $(e.target);
    if (!this.isInputValid($input.val())) {
      $input.addClass('invalid');
    } else {
      $input.removeClass('invalid');
    }
  };

  isInputValid = value => userInputValidationRule.test(value);

  handleUserSubmit = () => {
    this.userName = $('#username-input').val();
    if (this.isInputValid(this.userName)) {
      fetchUser(this.userName).then(body => {
        this.profile = body;
        this.updateProfile();
      });

      fetchUserEvents(this.userName, eventsFilter).then(body => {
        this.events = body;
        this.updateTimeline();
      });
    } else {
      alert('Username is not valid');
    }
  };

  updateProfile() {
    $('#profile-name').text(this.userName);
    $('#profile-image').attr('src', this.profile.avatar_url);
    $('#profile-url')
      .attr('href', this.profile.html_url)
      .text(this.profile.login);
    $('#profile-bio').text(this.profile.bio || '(no information)');
  }

  updateTimeline() {
    const $userTimeline = $('#user-timeline');
    $userTimeline.empty();
    this.events.forEach(event => {
      $userTimeline.append(createFromEvent(event));
    });
  }
}
