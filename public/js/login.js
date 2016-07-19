/* global $ */
var serverURL = 'http://localhost:3000/'

$(function () {
  console.log('listening')
  // listen for the form login
  $('#login-form').submit(function (event) {
    console.log('submit clicked')
    event.preventDefault()
    var formData = $(this).serialize()
    signin(formData)
  })
})

function signin (formData) {
  console.log(formData)
  $.ajax({
    type: 'POST',
    url: serverURL + 'signin',
    data: formData,
    success: function (response) {
      // success save the repsonse
      window.localStorage.email = $('#user-email').val()
      window.localStorage.auth_token = response.auth_token
      // then redirect
      window.location.href = 'index.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Login Failed')
    }
  })
}
