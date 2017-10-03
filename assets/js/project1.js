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

  // Global variables
  var venue = "";
  var game = "";
  var hotel = "";
  var restaurant = "";
  var homeTeamCity = "";


  // load football teams drop down
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



  // this fires after cild added returns all data on initial load and new data when rows are added
  database.ref().on("child_added", function(snapshot) {

            game = snapshot.child("game").val();
           

            resturant = snapshot.child("resturant").val();
            hotel = snapshot.child("hotel").val();
            venue = snapshot.child("venue").val();
            var td = "<td>";
            $(td).attr('id',"td");
            $(td).val(game);
            $("#game-table").append(td);
            console.log(game);
            console.log(resturant);
            console.log(hotel);
            console.log(venue);
          
  });

  //when team clicked, show form

  function setTeam() {
  
       $("#team-form").show();
       $("#teamname").val($(this).text());
             
  };

// ajax call to populate resturant list

   function setResturant(venue,homeCity)  {

          // need to conact venue and city since some venues have the same name in different cities(Mercedes Benz Stadium, etc)
          // also need to replace spaces in city or venue with + sign 
          venue = venue.replace(" ", "+");
          homeCity = homeCity.replace(" ", "+");
                  
          // create query argument 
          var queryText = "Chinese+Restaurants+near+" + venue + "+" + homeCity;
          
          // CALL AJAX and get data
          $.ajax
          ({
            type: "GET",
            url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + queryText + "&key=AIzaSyC8JKgphcG7Jl21ZxUysApl3s6e38nTplc",
            dataType: 'json',
            
            success: function (data){
           
               // default is 10, adjust if result set has less than 10
                    var resultLen =10;
                    if (data.results.length < 10) {
                        resultLen = data.results.length;
                    }

               //  create drop down list for loacal resturants     
                    var create = '<select id="rest" class="text-center" width="75">';
                    for (var i = 0; i < resultLen; i++) { 
                         var rest = data.results[i].name + " " + data.results[i].formatted_address;
                         rest = rest.replace(", United States", " ");   
                         create += '<option  value="'+rest+'">'+rest+'</option>';
                    }
                    create += '</select><br />';
                    $('#food-view').append("<p>Choose a Restaurant</p>");
                    $('#food-view').append(create);
                    $('#food-view').addClass("text-center");
             }
          });
  };



// ajax call to populate hotel list
  function setHotel(venue,homeCity)  {
          venue = venue.replace(" ", "+");
          homeCity = homeCity.replace(" ", "+");
          var queryText = "Hotels+near+" + venue + "+" + homeCity;
         
        
       //   var queryText = "Hotels+near+" + venue;
          $.ajax
          ({
            type: "GET",
            url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + queryText + "&key=AIzaSyC8JKgphcG7Jl21ZxUysApl3s6e38nTplc",
            dataType: 'json',
            error: function(data){
               console.log("it dont work");
                  },
  
            success: function (data){
                    var resultLen = 10;
               // get response data into var
                    if (data.results.length < 10) {
                        resultLen = data.results.length;
                    }

                    var create = '<select id="hotel" class="text-center" width="75">';
                    for (var i = 0; i < resultLen; i++) { 
                         hotel = data.results[i].name + " " + data.results[i].formatted_address;
                         hotel = hotel.replace(", United States", " ");   
                         create += '<option  value="'+hotel+'">'+hotel+'</option>';
                    }
                    create += '</select><br />';
                    $('#food-view').append("<p>Choose Your Hotel</p><br />");
                //    $('#food-view').append("<label>Hotel Info:</label>");
                    $('#food-view').append(create);
                    $('#food-view').addClass("text-center");
                      var food_div = $('<div>');
                    // delay button append as page loads before API call finishes
                     window.setTimeout(function(){
                        $('#food-view').append(' <input id="play-games" class="button btn-lg center-block" type="submit" value="Submit "><br />');
                     }, 03000
                      );
     
            }
          });
  }; 

   function setGame() {
          // hide form
          $("#game-view").hide();

          // get input values into variables
          var awayteam = $(this).children('#awayTeam').text();
          var hometeam = $(this).children('#homeTeam').text();
          
          venue = $(this).children('#venue').text();
          var gamedate = $(this).children('#gamedate').text();
          var gametime = $(this).children('#gametime').text();
          var homeCity = $(this).children('#homeCity').text();
          console.log(homeCity);
         
          // convert gamedate to string
          gamedate = moment(gamedate, 'M/D/Y').format('dddd MMMM D Y')

          // concat game date and game time
          gamedate = gamedate + " " + gametime;

          // concat teams
          game = awayteam + " at " + hometeam + " " + gamedate;

          // create form to hold game and resturant data
          var food = $('<form>');
          $(food).addClass("text-center");
          $(food).attr("id","gametime");
          $('#food-view').append(food);
          $(food).append("<label>Game Info:</label>")
          $(food).append('<input type="text" class="text-center" id="game"  size="75" value=" ' + game + ' " disabled /><br /><br/>');
          $('#food-view').append(food);
          $(food).append("<label>Venue Info:</label>")
          $(food).append('<input type="text" class="text-center" id="game"  size="75" value=" ' + venue + ' " disabled /><br /><br />');
          $('#food-view').append(food);
          // CALL AJAX GOOGLE PLACES TO get resturant data for drop down
          setResturant(venue,homeCity);
          // CALL AJAX GOOGLE PLACES TO get hotel data for 2nd drop down
          setHotel(venue,homeCity);
   };


  // GET FORM VALUES AND WRITE TO FIREBASE database
  function playGame() {
       event.preventDefault();
       // get form values to variables
       game =    $("#game").val().trim();
       restaurant =  $("#rest").val().trim();
       hotel =  $("#hotel").val().trim();
      
       //  populate fields to add to Firebase 
       database.ref().push({
          game: game,
          restaurant: restaurant,
          hotel: hotel,
          venue: venue,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
       });

  };

  // submit form with team names and dates for VALAIDATION 

  $("#find-games").on("click", function(event) {
     event.preventDefault();

  // Grabs user input
     var team =    $("#teamname").val().trim();
     var startDate =  $("#startdate").val().trim();
     var endDate =  $("#enddate").val().trim();

     // dates need to be in YYYYMMDD format for AJAX call 
     startDate = (moment(startDate).format("YYYYMMDD"));
     endDate = (moment(endDate).format("YYYYMMDD"));
  
     // call validation function

     // IF SUCESSFUL THAN DO AJAX CALL FOR GAMES
 
     var abbr = "";
     // this will get the corresponding city abbr from the list object to be appended to the ajax url 
     for(key in list){
        if (key == team) {
            abbr = (list[key]);
        }
      }

      // this will be the string for the url for the date range chosen
      var gamedates = "from-" + startDate.toString() + "-to-" +endDate.toString();

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

              // get result data and populate game data variables
                var away = data.fullgameschedule.gameentry[i].awayTeam.City;
                var awaynm = data.fullgameschedule.gameentry[i].awayTeam.Name;
                var home = data.fullgameschedule.gameentry[i].homeTeam.City;
                var homeCity = home;
                var homenm = data.fullgameschedule.gameentry[i].homeTeam.Name;
                var location = data.fullgameschedule.gameentry[i].location;
                var gamedate = data.fullgameschedule.gameentry[i].date;
                var gametime = data.fullgameschedule.gameentry[i].time;
                away = away + " " + awaynm;
                home = home + " " + homenm;
                
              // format gamedate to MM/DD/YYYY  
                gamedate = (moment(gamedate).format("MM/DD/YYYY"));
                var gametime = data.fullgameschedule.gameentry[i].time;
              
                 // *** start adding codes *** ***
      
                 var awayTeamCity = $('<div class="divHorizontal">');
                 $(awayTeamCity).text(away); 
                 $(awayTeamCity).attr("id","awayTeam");
     
                 var homeTeamCity = $('<div class="divHorizontal">');
                 $(homeTeamCity).text(home); 
                 $(homeTeamCity).attr("id","homeTeam");

                 var gameLocation = $('<div class="divHorizontal">');
                 $(gameLocation).text(location); 
                 $(gameLocation).attr("id","venue");

                 var gameDate = $('<div class="divHorizontal">');
                 $(gameDate).text(gamedate); 
                 $(gameDate).attr("id","gamedate");

                  var homeTCity = $('<div class="divHorizontal">');
                 $(homeTCity).text(homeCity); 
                 $(homeTCity).attr("id","homeCity");
                 $(homeTCity).css("visibility", "hidden");

                 var gameTime = $('<div class="divHorizontal">');
                 $(gameTime).text(gametime); 
                 $(gameTime).attr("id","gametime");
                  var row_no = "row" + [i].toString();
                  var divdiv = $('<div class="row" id=' + row_no + '>');
                  $(divdiv).append(awayTeamCity);
                  $(divdiv).append(homeTeamCity);
                  $(divdiv).append(gameLocation);
                  $(divdiv).append(gameDate);
                  $(divdiv).append(gameTime);
                  $(divdiv).append(homeTCity);
                  $('#game-view').append(divdiv);
               

                 // *** end adding codes *** ***
                  $("#team-form").hide();

           }

          }

});



  }); 

  $("#team-form").hide();
  
 $(document).on("click", ".dropdown-item", setTeam);
 $(document).on("click", ".row", setGame);
 $(document).on("click", "#play-games", playGame);

  }); 