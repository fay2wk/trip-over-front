/* globals $ currentUser */
function pageReady () {
  console.log('Hello ' + currentUser.name)

  // to logout we just clear the localstorage and redirect
  $('#logout').click(function (event) {
    event.preventDefault()

    window.localStorage.removeItem('email')
    window.localStorage.removeItem('auth_token')
    window.location.href = 'login.html'
  })
}
