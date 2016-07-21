// We are assuming Local Storage is supported
if (!window.localStorage['email'] || !window.localStorage['auth_token']) window.location.href = 'login.html'
$(function () {
  // else loadUser()
})
