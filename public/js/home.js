/* globals $ alert */
// loads main page with select of cities
$(document).ready(function () {
  $('#save-trip').hide()
  $('#dates').hide()
  var urlArray = ['http://i.imgur.com/HRW1HZd.jpg', 'http://i.imgur.com/GqCtHnv.jpg', 'http://i.imgur.com/Y7TH5wz.jpg', 'http://i.imgur.com/wa3vTso.jpg', 'http://i.imgur.com/a0klqK6.jpg', 'http://i.imgur.com/AK2yI1K.jpg', 'http://i.imgur.com/mvfVLt7.jpg', 'http://i.imgur.com/OAaTfF7.jpg']
  $.ajax({
    url: 'https://trip-over.herokuapp.com/city',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (cities) {
      $.each(cities, function (index, item) {
        $('#add-city').append('<div class="city-box" style="background-image: url(' + urlArray[Math.floor(Math.random() * urlArray.length)] + ')">' + '<h3>' + cities[index].name + '</h3>' + '</div>' + '</br>')
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
    $('#save-trip').hide()
    $('h1').text('Choose City')
  })
  // when user selects a city, all city's attractions will be shown. The text is from the city-box div which has the city's name. The city's name is then included in the url to direct to the corresponding city and it's attractions
  $(document).on('click', '.city-box', function (event) {
    var text = $(this).text()
    $('h1').text('Choose Attraction')
    $.ajax({
      url: 'https://trip-over.herokuapp.com/' + text + '/attractions',
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      success: function (attraction) {
        $('#add-city').hide()
        $.each(attraction, function (a) {
          $.each(attraction[a].attractions, function (index, item) {
            $('#attract').append('<div class="att-box">' + '<h5 class="att-name">' + attraction[a].attractions[index].name + '</h5>' + '<p>' + attraction[a].attractions[index].details + '</p>' + '</div>' + '</br>')
          })
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
    for (var i = 0; i < $(this).length; i++) {
      var attractObj = {name: $(this).text(), details: $(this).siblings('p').text()}
      attractArray.push(attractObj)
      $(this).parent('.att-box').remove()
      console.log(attractArray)
    }
  })
  $(document).on('click', '#trip-plan', function (event) {
    $('#add-city').hide()
    $('#attract').empty()
    $('#add-att').show()
    $('#dates').show()
    $('#save-trip').show()
    $('h1').text('Current Trip')
    $.each(attractArray, function (index, item) {
      $('#add-att').append('<div class="att-box">' + '<h3 class="att-name2">' + attractArray[index].name + '</h3>' + '<p>' + attractArray[index].details + '</p>' + '</div>' + '</br>')
    })
  })

  $(document).on('click', '.att-name2', function (event) {
    $(this).parent('.att-box').remove()
    for (var i = 0; i < attractArray.length; i++) {
        console.log(attractArray[i].name)
        if (attractArray[i].name === $(this).text()) {
          attractArray.splice(i, 1)
      } else {
        return}
    }
  })
  $(document).on('click', '#save-trip', function (event) {
    event.preventDefault()
    if (attractArray.length < 1) {
      alert('There are no attractions in trips.')
      return
    } else {
    // Get date values
      var startD = $('#start').val()
      var endD = $('#end').val()
      // For loop to go through the attractions selected which in the window and push into an array. This array will be included into a trip object which is then posted to the server
      var attractArray2 = []
      var a = document.getElementsByClassName('att-name2')
      for (var i = 0; i < a.length; i++) {
        var attractObj2 = {name: a[i].innerText, details: $('p')[i].innerText}
        attractArray2.push(attractObj2)
      }
      var trip = {places: attractArray2, startDate: startD, endDate: endD}
    }
    $.ajax({
      type: 'POST',
      data: trip,
      url: 'https://trip-over.herokuapp.com/trips',
      headers: {
        'User-Email': window.localStorage['email'],
        'Auth-Token': window.localStorage['auth_token']
      },
      success: function (data) {
        window.location.href = 'trip.html'
        console.info(data)
      }
    })
  })
})
