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

//variable set to access the beginning string of the firebase call
var database = firebase.database();

//function being called when submit is hit
$("#submit").on("click", function(event){
    //preventing the page to jump to the top, but perform the function
    event.preventDefault();

    //variables set to grab the users input in the form
    var train = $("#train-name").val();
    var place = $("#destination").val();
    var time = $("#first-train-time").val();
    var frequency = $("#frequency").val();

    //creating the key and variable in firebase. since they're named the same, we can use "," instead of duplicating text.
    database.ref().push({
        train,
        place,
        time,
        frequency
    });
    
    //reset the form input boxes
    $("form").trigger("reset");
});

//using childadded to retrieve from firebase
database.ref().on("child_added", function(childSnapshot){

    //variables created to pull the value from the right key in firebase
    var trainStamp = childSnapshot.val().train;
    var placeStamp = childSnapshot.val().place;
    var timeStamp = childSnapshot.val().time;
    var frequencyStamp = childSnapshot.val().frequency;

    //variable to indicate the time given
    var convertedTime = moment(timeStamp, "HH:mm");

    // var minutesAway = (convertedTime.toNow());

    //calculating the difference in time from the given form time to the current time and in minutes
    var timeDiff = moment().diff(moment(convertedTime), "minutes")

    //using a modular to find out what time apart is by getting the remainder
    var tRemainder = timeDiff % frequencyStamp;

    //calculate minutes until next train
    var tMinutesUntil = frequencyStamp - tRemainder;

    //Next train time
    var nextTrain = moment().add(tMinutesUntil, "minutes");
    
    //convert next train tine to arrival time
    var nextArrival = moment(nextTrain).format("HH:mm");
    console.log(tMinutesUntil)

    //table created with each piece of data ready to be created
    var newRow = $("<tr>").append(
        $("<td>").text(trainStamp),
        $("<td>").text(placeStamp),
        $("<td>").text(nextArrival),
        $("<td>").text(frequencyStamp),
        $("<td>").text(tMinutesUntil),
    )

    //table being created and appending a new row with each user input
    $("#train-table").append(newRow);

})




