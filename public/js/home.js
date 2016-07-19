/* globals $ alert */
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
  $('#city-btn').on('click', function (event) {
    $('#add-att').empty()
    $('#add-city').empty()
    $('#attract').empty()
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
  })
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
  var attractArray = []
  $(document).on('click', '.att-name', function (event) {
    for (var i = 0; i < $(this).length; i++) {
      var text = $(this).text()
      attractArray.push(text)
    }
    console.log(attractArray)
  })
  $(document).on('click', '#trip-plan', function (event) {
    $('#add-city').empty()
    $('#attract').empty()
    $('#add-att').show()
    $.each(attractArray, function (index, item) {
      $('#add-att').append('<div class="att-box">' + '<h3>' + attractArray[index] + '</h3>' + '</div>' + '</br>')
      // window.localStorage.trip = attractArray
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
