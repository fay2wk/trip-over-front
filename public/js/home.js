/* globals $ alert */
// loads main page with select of cities
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/city',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (cities) {
      $.each(cities, function (index, item) {
        $('#add-city').append('<div class="city-box">' + '<h3>' + cities[index].name + '</h3>' + '</div>' + '</br>')
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
    $('#add-city').show()
  })
  // when use selects a city, all city's attractions will be shown. The text is from the city-box div which has the city's name. The city's name is then included in the url to direct to the corresponding city and it's attractions
  $(document).on('click', '.city-box', function (event) {
    var text = $(this).text()
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
  // Attractions will be pushed into the empty array on each click.
  var attractArray = []
  $(document).on('click', '.att-name', function (event) {
    for (var i = 0; i < $(this).length; i++) {
      var text = $(this).text()
      attractArray.push(text)
    }
    console.log(attractArray)
  })
  $(document).on('click', '#trip-plan', function (event) {
    $('#add-city').hide()
    $('#attract').empty()
    $('#add-att').show()
    $.each(attractArray, function (index, item) {
      $('#add-att').append('<div class="att-box">' + '<h3>' + attractArray[index] + '</h3>' + '</div>' + '</br>')
    })
  })
  $(document).on('click', '#save-trip', function (event) {
    var trip = {places: attractArray}
    console.log(attractArray)
    $.ajax({
      type: 'POST',
      data: JSON.stringify(trip),
      url: 'http://localhost:3000/trips'
    })
  })
})
