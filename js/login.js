$(document).ready(function() {
  start();
  function start() {
    $('#profile').hide()
    
    ;
    $('#login').show();
  }

  var $ingresoGoogle = $('#btn-google');

  $ingresoGoogle.click(googleLogin);

  function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        console.log(result.user.displayName);
        next1();
        $('#img-user').attr('src', result.user.photoURL);
        console.log(firebase.database().ref('users'));
      });
  }

  function next1() {
    $('#login').hide();
    $('#profile').show();
  }

  function Observador() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('existes');
        next1();
        $('#img-user').attr('src', user.photoURL);

        // ...
      } else {
        // User is signed out.
        // ...

        console.log('no existes');
      }
    });
  }

  Observador();

  var $btnSalir = $('#btn-salir');

  $btnSalir.click(function() {
    firebase.auth().signOut().then(function() {
      setTimeout(function() {
        start();
      }, 300);
    }).catch(function(error) {
      // An error happened.
    });
  });
});