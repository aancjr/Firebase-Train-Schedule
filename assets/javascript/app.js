// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAJ6ITLDJxMa6eAHw3hwbmouQykBnXbv0Q",
    authDomain: "train-schedule-f9e26.firebaseapp.com",
    databaseURL: "https://train-schedule-f9e26.firebaseio.com",
    projectId: "train-schedule-f9e26",
    storageBucket: "train-schedule-f9e26.appspot.com",
    messagingSenderId: "65747457306",
    appId: "1:65747457306:web:e0ea84cbf23d6ffe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var train = "";
var place = "";
var time = "";
var frequency = "";


$("#submit").on("click", function(event){
    event.preventDefault();

    train = $("#train-name").val();
    place = $("#destination").val();
    time = $("#first-train-time").val();
    frequency = $("#frequency").val();

    console.log(train, place, time, frequency);

    database.ref().push({
        train,
        place,
        time,
        frequency
    });

    $("form").trigger("reset");
});


