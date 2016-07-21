/* global $ */
$(function () {
  // to logout we just clear the localstorage and redirect
  $('.signin').on('click', function (event) {
    event.preventDefault()
    window.location.href = 'login.html'
  })

  $('.signup').click(function (event) {
    event.preventDefault()
    window.location.href = 'register.html'
  })
})
