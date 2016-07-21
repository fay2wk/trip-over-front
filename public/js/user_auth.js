/* global $ pageReady */
var serverURL = 'http://localhost:3000/'
var currentUser = null

// We are assuming Local Storage is supported
$(function () {
  if (!window.localStorage['email'] || !window.localStorage['auth_token']) window.location.href = 'login.html'
  // else loadUser()
})
