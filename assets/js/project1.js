$(document).ready(function() {
   var football = ["Chicago Bears","Dallas Cowboys","Green Bay Packers","Los Angeles Rams","Miami Dolphins",
                  "New England Patriots","New Orleans Saints","New York Giants","San Francisco 49ers",
                  "Washington Redskins"];

   var baseball = ["Baltimore Orioles","Boston Red Sox","Houston Astros","Kansas City Royals","Los Angeles Dodgers",
                  "New York Yankees","Philadelphia Phillies","San Diego Padres","Seattle Mariners",
                  "St Louis Cardinals"];

  var basketball = ["Chicago Sky","Connecticut Sun","Indiana Fever","Los Angeles Sparks",
                    "Minnesota Lynx","New York Liberty","Phoenix Mercury","Seattle Storm",
                    "Washington Mystics"];

  var br = "<br />";
 
  for (var i = 0; i < football.length; i++) { 
      var a = $("<a>"); 
      $(a).addClass("dropdown-item");
      $(a).attr("href","#");
      $(a).text(football[i]);
       $(a).text(football[i]);
      $("#football").append(a); 
      $("#football").append(br); 
      
  }

  for (var i = 0; i < baseball.length; i++) {
      var a = $("<a>");  
      $(a).addClass("dropdown-item");
      $(a).attr("href","#");
      $(a).text(baseball[i]);
      $("#baseball").append(a);
      $("#baseball").append(br); 
  }  

  for (var i = 0; i < basketball.length; i++) {  
      var a = $("<a>");
      $(a).addClass("dropdown-item");
      $(a).attr("href","#");
      $(a).text(basketball[i]);
      $("#basketball").append(a);
      $("#basketball").append(br); 
  }

  // 1. Initialize Firebase

  var config = {
      apiKey: "AIzaSyC8JKgphcG7Jl21ZxUysApl3s6e38nTplc",
      authDomain: "gameti-ddf37.firebaseapp.com",
      databaseURL: "https://gameti-ddf37.firebaseio.com",
      projectId: "gameti-ddf37",
      storageBucket: "gameti-ddf37.appspot.com",
      messagingSenderId: "394752220867"
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }

  var database = firebase.database();               
           

// First AJAX call to mysportsfeed api to return game data

// some arugment here to capture inout team
// get date range from input form here

  $.ajax
({
  type: "GET",
  url: "https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/full_game_schedule.json?date=20171001",
  dataType: 'json',
  headers: {
 "Authorization": "Basic " + btoa('doctort57' + ':' + 'Rowanp1996' )


},
  
  success: function (data){
      //    console.log(JSON.stringify(data));
     // get response data into var
          var results = (JSON.stringify(data));
 
         for (var i = 0; i < data.fullgameschedule.gameentry.length; i++) {

                var city = data.fullgameschedule.gameentry[i].id;
                console.log(city);
                city = data.fullgameschedule.gameentry[i].homeTeam.City;
                console.log(city);


           }

  }
});



  $.ajax
({
  type: "GET",
  url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurants+near+Giants+Stadium&key=AIzaSyC8JKgphcG7Jl21ZxUysApl3s6e38nTplc",
  dataType: 'json',
  

  success: function (data){
    //    console.log(JSON.stringify(data));
     // get response data into var
         
 
           

               
                var city = data.results[0].formatted_address;
                console.log(city);


  }
});

 
 
 

  

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.

/* database.ref().on("value", function(snapshot) {
 

}); */

// API CALL - build div with results
/*function displayPlayerInfo() {
        console.log(player);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&apikey=dc6zaTOxFJmzC&limit=10";
        // Creating an AJAX call for the specific player button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // get response data into var
          var results = response.data;
          // empty previous player images
          $("#player-view").empty();
          // Creating a div to hold the player image
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
              var naTsDiv = $("<div class='playerImg flex-item'>");
          // Creating an element to have the rating displayed
              var pOne = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
              $(pOne).addClass("p");
              naTsDiv.append(pOne);
          // Retrieving the URL for the fixed image and the animatied image
              var imgURL = results[i].images.fixed_height_still.url;
              var animateURL = results[i].images.fixed_height_downsampled.url;
          // Creating an element to hold the fixed image
              var image = $("<img>").attr("src", imgURL) ;
          // adding attr for the fixed image
              $(image).attr("data-still",imgURL);
          // adding attr for the animated image
              $(image).attr("data-animate",animateURL);
          // add attribute for data state to flip images on click
              $(image).attr("data-state","still");
          // add class for clicked event
              $(image).addClass("playerImg");
          // append image to div for each player
              $(naTsDiv).append(image);   
          // Putting the player img  above the previous player
              $("#player-view").prepend(naTsDiv);
             }
             setFocus();
          });
      } */

// get data from form submit

// 2. Button for submitting form

/* $("#add-player").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  playerName = $("#player-input").val().trim();
  // CALL VALIDATE FUNCTION

  $("#"+player).append(playerName);
  
  $("#"+player).append(p);
  //  populate fields to add to Firebase 
  database.ref(refname).set({
      playerName: playerName,
      choice: "",
      wins: 0,
      losses: 0,
      ties:0,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  	//   do your append stuff 
 } */
 

/*    function validate() {
    	some validation code 
    	return string with Error
    };	

// AFTER INSERTING ROW IN FIREBASE, this will fire and retrive info of row just added
// you can then populate html with datbase vales

	database.ref().on("child_added", function(snapshot, prevChildKey) {
    var choice1 = snapshot.child("choice").val();
 }); 

 // IT IS POSSIBLE WE MAY need this as well 

	database.ref().on("child_changed", function(snapshot, prevChildKey) {
    var choice1 = snapshot.child("choice").val();
 }); 


// ADD LISTENERS FOR ONLICK events for team selection and form submission	if needed

	$(document).on("click", ".somefield", somefunction);
  	$(document).on("click", ".somefield", somefunction); */
});


