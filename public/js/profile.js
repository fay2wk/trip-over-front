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
})
