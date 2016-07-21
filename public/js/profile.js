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
      url: 'https://trip-over.herokuapp.com/profile',
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
})
