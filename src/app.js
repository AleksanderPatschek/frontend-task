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

  handleUserSubmit = async () => {
    this.userName = $('#username-input').val();

    this.toggleVisibilityForRequest();
    await this.makeRequests()
      .then(([user, events]) => {
        this.profile = user;
        this.events = events;
        this.updateProfile();
        this.updateTimeline();
      })
      .catch(e => alert(e.message));
    this.toggleVisibilityForRequest();
  };

  toggleVisibilityForRequest = () => {
    const spinner = $('#spinner');
    const userProfile = $('#user-profile');
    const userTimeline = $('#user-timeline');
    spinner.toggleClass('is-hidden');
    userProfile.toggleClass('is-hidden');
    userTimeline.toggleClass('is-hidden');
  };

  makeRequests = () => {
    if (this.isInputValid(this.userName)) {
      return Promise.all([fetchUser(this.userName), fetchUserEvents(this.userName, eventsFilter)]);
    }
    return Promise.reject(new Error('Username is not valid'));
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
