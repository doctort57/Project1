 $(document).ready(function() {
   

   var list = {"Chicago Bears": "CHI", "Dallas Cowboys": "DAL","Green Bay Packers":"GB",
               "Los Angeles Rams": "LA", "Miami Dolphins": "MIA","Green Bay Packers":"GB",
               "New England Patriots": "NE", "New Orleans Saints": "NO", "New York Giants": "NYG",
               "San Francisco 49ers": "SF"}

   var football = {
        teams: ["Chicago Bears","Dallas Cowboys","Green Bay Packers","Los Angeles Rams","Miami Dolphins",
                  "New England Patriots","New Orleans Saints","New York Giants","San Francisco 49ers",
                  "Washington Redskins"],
        abbr: ["CHI","DAL","GB","LA","MIA","NE","NO","NYG","SF","WAS"]
    }

 


   var baseball = ["Baltimore Orioles","Boston Red Sox","Houston Astros","Kansas City Royals","Los Angeles Dodgers",
                  "New York Yankees","Philadelphia Phillies","San Diego Padres","Seattle Mariners",
                  "St Louis Cardinals"];


  var basketball = ["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets",
                    "Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets",
                    "Detroit Pistons"];


 
  var br = "<br />";
 
  for (var i = 0; i < football.teams.length; i++) { 
      var a = $("<a>"); 
      $(a).addClass("dropdown-item");
      $(a).attr("id","football");
 //     $(a).attr("href","#");
      $(a).text(football.teams[i]);
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
/*
     $( function() {
       $( "#text-yui_3_10_1_1_1373799396053_43125-field" ).datepicker({ dateFormat: 'dd/mm/yy' });
       $( "#text-yui_3_10_1_1_1373799396053_48604-field" ).datepicker({ dateFormat: 'dd/mm/yy' });
     });
*/      
console.log(projectform);
console.log(fromdate);
console.log(dateadded);
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

<<<<<<< HEAD
  var database = firebase.database();               
           
/*
// First AJAX call to mysportsfeed api to return game data
=======
  var database = firebase.database();
>>>>>>> 8fc679aec99ef4f784eb5de163d8c6bd1ed9c1ef

  //when team clicked, show form

  function setTeam() {
  
       $("#team-form").show();
        $("#teamname").val($(this).text());
             
  };

  // submit form for VALAIDATION 

  $("#find-games").on("click", function(event) {
     event.preventDefault();
  // Grabs user input
     var team =    $("#teamname").val().trim();
     var startDate =  $("#startdate").val().trim();
     var endDate =  $("#enddate").val().trim();
     // call validation function

     // IF SUCESSFUL THAN DO AJAX CALL FOR GAMES
     // dates need to be in YYYYMMDD format for AJAX call 
     var date1 = 20170928;
     var date2 = 20171130;
     var abbr = "";
     // this will get the corresponding city abbr from the list object to be appended to the ajax url 
     for(key in list){
        if (key == team) {
            abbr = (list[key]);
        }
      }

      // this will be the string for the url for the date range chosen
      var gamedates = "from-" + date1.toString() + "-to-" + date2.toString();

       $.ajax
      ({
        type: "GET",
        url: "https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/full_game_schedule.json?team=" + abbr + "&date=" + gamedates,
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa('doctort57' + ':' + 'Rowanp1996' )
      },
  
  success: function (data){
      //    console.log(JSON.stringify(data));
     // get response data into var
          var results = (JSON.stringify(data));
 
         for (var i = 0; i < data.fullgameschedule.gameentry.length; i++) {
                var away = data.fullgameschedule.gameentry[i].awayTeam.City;
                 console.log(away);
                var home = data.fullgameschedule.gameentry[i].homeTeam.City;
                console.log(home);
                var location = data.fullgameschedule.gameentry[i].location;
                console.log(location);
                var gamedate = data.fullgameschedule.gameentry[i].date;
                console.log(gamedate);
                var gamedate = data.fullgameschedule.gameentry[i].time;
                console.log(gamedate);


           }

  }

});
<<<<<<< HEAD
*/
 
 
 
=======

>>>>>>> 8fc679aec99ef4f784eb5de163d8c6bd1ed9c1ef


  });

<<<<<<< HEAD
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

 $("#teamform").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var startdate = $("#startdate").val().trim();
  console.log(startdate);
  // CALL VALIDATE FUNCTION
  /*
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
    */
  	//   do your append stuff 
 });
 

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
=======
  $("#team-form").hide();
>>>>>>> 8fc679aec99ef4f784eb5de163d8c6bd1ed9c1ef

 $(document).on("click", ".dropdown-item", setTeam);

  }); 