<<<<<<< HEAD
/* globals $ alert*/
$(function () {
  $('#Edit-profile-form').on('submit', function (event) {
    if ($('#password').val() !== $('#password_confirm').val()) alert('password does not match!')
    else {
      event.preventDefault()
      let formData = {
        name: $('#name').val(),
        password: $('#password').val(),
        email: $('#email').val()
      }
      // var formData = $(this).serialize
      editProfile(formData)
    }
  })

  function editProfile (formData) {
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/profile',
      data: formData,
      headers: {
        'User-Email': window.localStorage['email'],
        'Auth-Token': window.localStorage['auth_token']
      },
      success: function (response) {
        window.localStorage.email = $('#email').val()
        window.location.href = 'home.html'
      },
      error: function (xhr, ajaxOptions, thrownError) {
        // else output error
        console.log(xhr.status)
        console.log(thrownError)
        window.alert('Profile failed to edit')
      }
    })
  }
=======
/* globals $ alert */
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/trips',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (trip) {
      $('#add-trip').append('<div class="trip-box">' + '<h3>' + trip[0].name + '</h3>' + '</div>' + '</br>')
      $('#add-trip').append('<div class="trip-box">' + '<h3>' + trip[1].name + '</h3>' + '</div>')
    },
    error: function (xhr, status) {
      alert('Error: Unable to load.')
    }
  })
>>>>>>> siwai2
})
