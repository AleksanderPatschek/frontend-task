import './assets/scss/app.scss';
import $ from 'cash-dom';

export class App {
  initializeApp() {
    $('#load-username').on('click', () => {
      this.userName = $('#username-input').val();
      fetch(`https://api.github.com/users/${this.userName}`)
        .then(response => response.json())
        .then(body => {
          this.profile = body;
          this.updateProfile();
        });
    });
  }

  updateProfile() {
    $('#profile-name').text(this.userName);
    $('#profile-image').attr('src', this.profile.avatar_url);
    $('#profile-url')
      .attr('href', this.profile.html_url)
      .text(this.profile.login);
    $('#profile-bio').text(this.profile.bio || '(no information)');
  }
}
