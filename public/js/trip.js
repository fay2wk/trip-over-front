/* global $ */
$(document).ready(function () {
  var id = []
  $.ajax({
    url: 'http://localhost:3000/trips',
    headers: {
      'User-Email': window.localStorage['email'],
      'Auth-Token': window.localStorage['auth_token']
    },
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (trips) {
      $.each(trips, function (a, item) {
        $('#attract').append('<div class="att-box">' + '<h1>' + 'Trip ' + (a + 1) + '</h1><h4> List of Attractions</h4>' + '</div>')
        id.push(trips[a]._id)
        $.each(trips[a].places, function (index, item) {
          $('.att-box').eq(a).append('<li>' + trips[a].places[index].name + '</li>')
        })
        $('.att-box').eq(a).append('<h4>Travel Dates: </h4>' + trips[a].startDate + ' - ' + trips[a].endDate + '<p>' + '</br>' + '<button type="button"' + 'id=' + a + ' class="btn btn-default delete">Delete Entry</button>' + '</p>')
      })
    },
    error: function (xhr, status) {
      alert('Error: Unable to load.')
    }
  })
  $(document).on('click', '.delete', function (event) {
    event.preventDefault()
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/trips/' + id[this.id],
      headers: {
        'User-Email': window.localStorage['email'],
        'Auth-Token': window.localStorage['auth_token']
      },
      success: function (data) {
        window.location.reload()
      },
      error: function (xhr, status) {
        alert('Error: Unable to load.')
      }
    })
  })
})
