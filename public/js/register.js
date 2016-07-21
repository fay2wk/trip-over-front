/* global $ */
var serverURL = 'https://trip-over.herokuapp.com/'

$(function () {
  // listen for the form login
  $('#register-form').submit(function (event) {
    event.preventDefault()
    console.log('submit was clicked')
    var formData = $(this).serialize()
    signup(formData)
  })
})

function signup (formData) {
  $.ajax({
    type: 'POST',
    url: serverURL + 'signup',
    data: formData,
    success: function (response) {
      // then redirect
      window.location.href = 'login.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Signup Failed')
    }
  })
}
