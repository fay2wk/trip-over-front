/* global $ */
var serverURL = 'http://localhost:3000/'

$(function () {
  // listen for the form login
  $('#login-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    signin(formData)
  })
})

function signin (formData) {
  $.ajax({
    type: 'POST',
    url: serverURL + 'signin',
    data: formData,
    success: function (response) {
      // success save the repsonse
      window.localStorage.email = $('#user-email').val()
      window.localStorage.auth_token = response.auth_token
      // then redirect
      window.location.href = 'home.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Login Failed')
    }
  })
}
