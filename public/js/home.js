/* globals $ alert */
// loads main page with select of cities
$(document).ready(function () {
  $('#dates').hide()
  var urlArray = ['http://i.imgur.com/HRW1HZd.jpg', 'http://i.imgur.com/GqCtHnv.jpg', 'http://i.imgur.com/Y7TH5wz.jpg', 'http://i.imgur.com/wa3vTso.jpg']
  $.ajax({
    url: 'http://localhost:3000/city',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (cities) {
      $.each(cities, function (index, item) {
        $('#add-city').append('<div class="city-box" style="background-image: url(' + urlArray[Math.floor(Math.random()*urlArray.length)] + ')">' + '<h3>' + cities[index].name + '</h3>' + '</div>' + '</br>')
      })
    },
    error: function (xhr, status) {
      alert('Error: Unable to load.')
    }
  })
  // when city button is clicked, remove attractions from view
  $('#city-btn').on('click', function (event) {
    $('#add-att').empty()
    $('#attract').empty()
    $('#dates').hide()
    $('#add-city').show()
    $('h1').text('Choose City')
  })
  // when user selects a city, all city's attractions will be shown. The text is from the city-box div which has the city's name. The city's name is then included in the url to direct to the corresponding city and it's attractions
  $(document).on('click', '.city-box', function (event) {
    var text = $(this).text()
    $('h1').text('Choose Attraction')
    $.ajax({
      url: 'http://localhost:3000/' + text + '/attractions',
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      success: function (attraction) {
        // console.log(text)
        $('#add-city').hide()
        $.each(attraction, function (a, item) {
          $.each(attraction[a].attractions, function (index, item) {
            $('#attract').append('<div class="att-box">' + '<h5 class="att-name">' + attraction[a].attractions[index].name + '</h5>' + '<p>' + attraction[a].attractions[index].details + '</p>' + '</div>' + '</br>')
          })
          // console.log(attraction)
        })
      },
      error: function (xhr, status) {
        alert('Error: Unable to load.')
      }
    })
  })
  // Attraction's name and details will be pushed into the empty array on each click.
  var attractArray = []
  $(document).on('click', '.att-name', function (event) {
    console.log(this)
    for (var i = 0; i < $(this).length; i++) {
      var attractObj = {name: $(this).text(), details: $(this).siblings('p').text()}
      attractArray.push(attractObj)
      $(this).parent('.att-box').hide()
    }
    console.log(attractArray)
  })
  $(document).on('click', '#trip-plan', function (event) {
    $('#add-city').hide()
    $('#attract').empty()
    $('#add-att').show()
    $('#dates').show()
    $('h1').text('Current Trip')
    $.each(attractArray, function (index, item) {
      $('#add-att').append('<div class="att-box">' + '<h3>' + attractArray[index].name + '</h3>' + '<p>' + attractArray[index].details + '</p>' + '</div>' + '</br>')
    })
  })
  $(document).on('click', '#save-trip', function (event) {
    console.log('hi')
    if (attractArray.length < 1) {
      alert('There are no attractions in trips.')
      return
    } else {
    // Get date values
      var startD = $('#start').val()
      var endD = $('#end').val()
      var trip = {places: attractArray, startDate: startD, endDate: endD}
      console.log(trip)
    }
    $.ajax({
      type: 'POST',
      data: trip,
      url: 'http://localhost:3000/trips',
      headers: {
        'User-Email': window.localStorage['email'],
        'Auth-Token': window.localStorage['auth_token']
      },
      success: function (data) {
        console.info(data)
      }
    })
  })
})
