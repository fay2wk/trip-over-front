/* global $ */
$(document).ready(function () {
  $('li').click(function () {
    $('.btn').empty()
    $('.btn').append($(this).text() + '<span class="caret"></span>')
  })
  $.ajax({
    url: 'http://localhost:3000/city',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (cities) {
      $.each(cities, function (index, item) {
        $('.scrollable-menu').append('<li><a href="#">' + cities[index].name + '</a></li>')
      })
    },
    error: function (xhr, status) {
      alert('Error: Unable to load.')
    }
  })

  $(document).on('click', 'li', function () {
    $('.include-city').empty()
    $('.include-city').html($(this).text() + '<span class="caret"></span>')
  })

  $(document).on('click', '.save-city', function (event) {
    var city = {name: $('#city').val()}
    console.log(city)
    $.ajax({
      type: 'POST',
      data: city,
      url: 'http://localhost:3000/city',
      headers: {
        'User-Email': window.localStorage['email'],
        'Auth-Token': window.localStorage['auth_token']
      },
      success: function (data) {
        console.info(data)
        // window.location.reload()
      }
    })
    $('.scrollable-menu').append('<li><a href="#">' + city.name + '</a></li>')
    $('.include-city').empty()
    $('.include-city').append(city.name)
  })

  $(document).on('click', '.save-attraction', function (event) {
    event.preventDefault()
    var city = $('.include-city').text()
    var attraction = {name: $('#attraction-name').val(), details: $('.createAttraction').val(), longitude: $('#longitude').val(), lattitude: $('#lattitude').val(), phoneNumber: $('#phone-number').val(), img: $('#image').val()}

    console.log(city)
    $.ajax({
      type: 'POST',
      data: attraction,
      url: 'http://localhost:3000/' + city + '/attractions',
      headers: {
        'User-Email': window.localStorage['email'],
        'Auth-Token': window.localStorage['auth_token']
      },
      success: function (data) {
        console.info(data)
        window.location.href = 'trip.html'
      }
    })
  })
})
