import $ from 'cash-dom';
import './assets/scss/app.scss';

const userInputValidationRule = /^[a-z0-9_-]+$/;

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
      fetch(`https://api.github.com/users/${this.userName}`)
        .then(response => response.json())
        .then(body => {
          this.profile = body;
          this.updateProfile();
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
}
