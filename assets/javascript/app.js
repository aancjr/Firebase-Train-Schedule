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

$("#submit").on("click", function(event){
    event.preventDefault();

    var train = $("#train-name").val();
    var place = $("#destination").val();
    var time = $("#first-train-time").val();
    var frequency = $("#frequency").val();

    console.log(train, place, time, frequency);

    database.ref().push({
        train,
        place,
        time,
        frequency
    });

    $("form").trigger("reset");
});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainStamp = childSnapshot.val().train;
    var placeStamp = childSnapshot.val().place;
    var timeStamp = childSnapshot.val().time;
    var frequencyStamp = childSnapshot.val().frequency;

    var convertedTime = moment(timeStamp, "HH:mm");
    var minutesAway = (convertedTime.toNow());

    console.log(moment().toNow)

    var timeDiff = moment().diff(moment(convertedTime), "minutes")

    var tRemainder = timeDiff % frequencyStamp;

    var tMinutesUntil = frequencyStamp - tRemainder;

    var nextTrain = moment().add(tMinutesUntil, "minutes");
    
    var nextArrival = moment(nextTrain).format("HH:mm");
    console.log(tMinutesUntil)

    var newRow = $("<tr>").append(
        $("<td>").text(trainStamp),
        $("<td>").text(placeStamp),
        $("<td>").text(nextArrival),
        $("<td>").text(frequencyStamp),
        $("<td>").text(tMinutesUntil),
    )

    $("#train-table").append(newRow);

})




