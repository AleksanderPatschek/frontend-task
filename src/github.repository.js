const githubApiUrl = 'https://api.github.com';

export const fetchUser = username => fetch(`${githubApiUrl}/users/${username}`).then(response => response.json());

export const fetchUserEvents = (username, eventsFilter) =>
  fetch(`${githubApiUrl}/users/${username}/events/public`)
    .then(response => response.json())
    .then(events => events.filter(event => eventsFilter.includes(event.type)));
