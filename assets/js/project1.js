 $(document).ready(function() {

  var list = {"Chicago Bears": "CHI", "Dallas Cowboys": "DAL","Green Bay Packers":"GB",
               "Los Angeles Rams": "LA", "Miami Dolphins": "MIA","Green Bay Packers":"GB",
               "New England Patriots": "NE", "New Orleans Saints": "NO", "New York Giants": "NYG",
               "San Francisco 49ers": "SF","Atlanta Hawks": "ATL", "Boston Celtics": "BOS","Brooklyn Nets":"BKN",
               "Charlotte Hornets": "CHA", "Chicago Bulls": "CHI","Cleveland Cavaliers":"CLE",
               "Dallas Mavericks": "DAL", "Denver Nuggets": "DEN", "Detroit Pistons": "DET"};

   var football = {
        teams: ["Chicago Bears","Dallas Cowboys","Green Bay Packers","Los Angeles Rams","Miami Dolphins",
                  "New England Patriots","New Orleans Saints","New York Giants","San Francisco 49ers",
                  "Washington Redskins"],
        abbr: ["CHI","DAL","GB","LA","MIA","NE","NO","NYG","SF","WAS"]
    };

    var basketball = {
        teams: ["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets",
                 "Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets",
                 "Detroit Pistons"],
        abbr: ["ATL","BOS","BKN","CHA","CHI","CLE","DAL","DEN","DET"]
    };

  // Global variables
  var venue = "";
  var game = "";
  var hotel = "";
  var restaurant = "";
  var homeTeamCity = "";
  var foodtype = "";
  var league = "";
  


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
      database.ref().on("value", function(snapshot) {
                 console.log(snapshot);         
               snapshot.forEach(function(childSnapshot) {
                  var childData = childSnapshot.val();
                    console.log(childData);                 
                  var markup = "<tr><td>" + childData.game + "</td></tr>";
                  markup = markup + "<tr><td>" + childData.restaurant + "</td></tr><br />";
                  markup = markup + "<tr><td>" + childData.hotel + "</td></tr>";
                  markup = markup + "<tr><td >" + childData.venue + "</td></tr>";
                  markup = markup + "<tr><td ></td></tr>";
                  markup = markup + "<tr></tr>";
                $("#game-table").empty();
                  $("#game-table").append(markup);
                 });

      
          
      });


  // create form for select teams, dates and food choice

  function setTeam() {
      // get name of sport from button clicked
      var sname = this.id;
    
       // create form to hold game and resturant data

          var team = $('<form>');
         

          $(team).append('<div class="form-group, text-center" ><br /><br />');
          $(team).attr("id","team-form");
          $(team).addClass("inputxt");
          $(team).append("<h2>Choose Team Game Dates and Food Choices</h2><br /><br />");

          // load dropdowns for teasm selection   

          if (sname == "football"){
              league = "nfl";
              var create = '<div><select id="teamname" class="text-center" >';
                    for (var i = 0; i < football.teams.length; i++) { 
                         create += '<option  value="nfl">'+ football.teams[i]+'</option>';
                    }
          } else {
              league = "nba";
              var create = '<div><select id="teamname" class="text-center" >';
                    for (var i = 0; i < basketball.teams.length; i++) { 
                         create += '<option  value="nba">'+ basketball.teams[i]+'</option>';
                    }
          }            

          create += '</select></div><br />';
          $(team).append("<p>Team Name</p>");
          $(team).append(create);
   

          // from date 
          $(team).append('<div class="form-group" >');
          $(team).append("<p>From Date</p>");
          $(team).append('<input type="date" width="20px"  id="startdate" required  />');
          $(team).addClass("text-center ");

          // end date 
          $(team).append('<div class="form-group" >');
          $(team).append("<p>End Date</p>");
          $(team).append('<input type="date" width="20px"  id="enddate" required  />');
          $(team).addClass("text-center ");

          // food type drop down list
          $(team).append('<div class="form-group" >');
          $(team).append("<p>Food Type</p>");
          var dropdown = '<select class="form-control" id="foodtype" width="20px"><option value="All">All</option>';
          dropdown = dropdown + '<option value="Steak">Steak</option>' + '<option value="Chinese">Chinese</option>' +
                                '<option value="Italian">Italian</option>' + '<option value="Burgers">Burgers</option>' + '</select><br />';               
          $(team).append(dropdown);

          // button to submit foem
          $(team).append('<div class="form-group" >');
          $(team).append(' <input id="find-games" class="button btn-lg btn-danger center-block data-toggle="modal" data-target="#myModal_1"" type="submit" value="Search Games"><br />');
          $('#team-form').append(team);

           $('.btn-group').hide();

  };

// ajax call to populate resturant list

   function setResturant(venue,homeCity,foodtype)  {

          // need to conact venue and city since some venues have the same name in different cities(Mercedes Benz Stadium, etc)
          // also need to replace spaces in city or venue with + sign 
          venue = venue.replace(" ", "+");
          homeCity = homeCity.replace(" ", "+");
          foodtype = foodtype.replace(" ", "+");
          
          // create query argument 
          var queryText = foodtype + "Restaurants+near+" + venue + "+" + homeCity;
            
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
                    var create = '<select id="rest" class="text-center" >';
                    for (var i = 0; i < resultLen; i++) { 
                      
                         var rest = data.results[i].name + " " + data.results[i].formatted_address;
                         rest = rest.replace(", United States", " ");
                         rest = rest.slice(0, rest.length - 11);
                         
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

         // need to conact venue and city since some venues have the same name in different cities(Mercedes Benz Stadium, etc)
         // also need to replace spaces in city or venue with + sign 
          venue = venue.replace(" ", "+");
          homeCity = homeCity.replace(" ", "+");

          // create query argument 
          var queryText = "Hotels+near+" + venue + "+" + homeCity;
      
           // CALL AJAX and get data
          $.ajax
          ({
            type: "GET",
            url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + queryText + "&key=AIzaSyC8JKgphcG7Jl21ZxUysApl3s6e38nTplc",
            dataType: 'json',
            error: function(data){
               console.log("it dont work");
                  },
  
            success: function (data){

                // default is 10, adjust if result set has less than 10
                    var resultLen = 10;
               
                    if (data.results.length < 10) {
                        resultLen = data.results.length;
                    }
 
                    //  create drop down list for loacal hotels    
                    var create = '<select id="hotel" class="text-center" >';
                    for (var i = 0; i < resultLen; i++) { 
                         hotel = data.results[i].name + " " + data.results[i].formatted_address;
                         hotel = hotel.replace(", United States", " "); 
                         hotel = hotel.slice(0, hotel.length - 11);  
                         create += '<option  value="'+hotel+'">'+hotel+'</option>';
                    }
                    create += '</select><br />';

                    $('#food-view').append("<p>Choose Your Hotel</p>");
                    $('#food-view').append(create);
                    $('#food-view').addClass("text-center,inputxt");
                      var food_div = $('<div>');
                    // delay button append as page loads before API call finishes
                     window.setTimeout(function(){
                        $('#food-view').append(' <input id="play-games" class="button btn-lg center-block btn-success" type="submit" value="Submit "><br />');
                     }, 03000
                      );
     
            }
          });
  }; 

   function setGame() {
          // hide TABLE
          $("#games-table").hide();

          // get input values into variables
          var awayteam = $(this).children('#awayTeam').text();
          var hometeam = $(this).children('#homeTeam').text();
          venue = $(this).children('#venue').text();
          var gamedate = $(this).children('#gamedate').text();
          var gametime = $(this).children('#gametime').text();
          var homeCity = $(this).children('#homeCity').text();
      
         
          // convert gamedate to string
          gamedate = moment(gamedate, 'M/D/Y').format('dddd MMMM D Y')

          // concat game date and game time
          gamedate = gamedate + " " + gametime;

          // concat teams
          game = awayteam + " at " + hometeam;

          // create form to hold game and resturant data
 
          var food = $('<form>');
         
    
          $(food).append('<div class="form-group, inputxt" ><br /><br />');
 
          $(food).attr("id","gametime");
          $('#food-view').append(food);

           $('#food-view').append("<h2>Choose Your Resturant and Hotel</h2");

          // Game info
          $(food).append('<div class="form-group" >');
          $(food).append("<p>Game Info</p>");
          $(food).append('<input class="text-center" type="text" size="40"  value=" ' + game + ' " id="game" disabled /><br />');
        

           // Game info 2
          $(food).append('<div class="form-group" >');
          $(food).append("<p>Game Date</p>");
          $(food).append('<input class="text-center" type="text" size="40"  value=" ' + gamedate + ' " id="gamedate" disabled /><br />');
         
          // Venue info
          $(food).append('<div class="form-group" >');
          $(food).append("<p>Venue Info</p>");
          $(food).append('<input class="text-center" type="text" size="40" value=" ' + venue + ' " id="venuex" disabled /><br />');
         

          $('#food-view').append(food);

          // CALL AJAX GOOGLE PLACES TO get resturant data for drop down
          setResturant(venue,homeCity,foodtype);
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
       venue = $("#venuex").val().trim();
       //  populate fields to add to Firebase 
       database.ref().push({
          game: game,
          restaurant: restaurant,
          hotel: hotel,
          venue: venue,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
       });
       
        $("#food-view").hide();
 
        $("#game-table").show();
  };

  // submit form with team names and dates for VALAIDATION 
  // doa ajax calls and create table of games 

  function findGames() {
     event.preventDefault();

  // Grabs user input
     var team =    $("#teamname option:selected").text().trim();
     var startDate =  $("#startdate").val().trim();
     var endDate =  $("#enddate").val();
     foodtype = $("#foodtype option:selected").text().trim();
  
     // call validation function
  
    var isDate = validate(startDate,endDate);

     if (isDate.length > 0) {
          $('#daterr').text(isDate);
          $('#myModal_1').modal('show');
     } else {

      
       // IF SUCESSFUL THAN DO AJAX CALL FOR GAMES

       // ONE BIG GIANT ELSE 

       // dates need to be in YYYYMMDD format for AJAX call 
       startDate = (moment(startDate).format("YYYYMMDD"));
       endDate = (moment(endDate).format("YYYYMMDD"));
    
       var abbr = "";
       // this will get the corresponding city abbr from the list object to be appended to the ajax url 
       for(key in list){
          if (key == team) {
              abbr = (list[key]);
          }
        }

        // this will be the string for the url for the date range chosen
        var gamedates = "from-" + startDate.toString() + "-to-" +endDate.toString();
        var url =  "https://api.mysportsfeeds.com/v1.1/pull/" + league + "/2017-regular/full_game_schedule.json?team=" + abbr + "&date=" + gamedates;
       
         $.ajax
        ({
          type: "GET",
          url: "https://api.mysportsfeeds.com/v1.1/pull/" + league + "/2017-regular/full_game_schedule.json?team=" + abbr + "&date=" + gamedates,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa('doctort57' + ':' + 'Rowanp1996' )
        },

        success: function (data){
    //        var bugs = data.fullgameschedule.gameentry;
            // check games returned than process
            
                $('#game-view').prepend([
                        "<h2>Upcoming Games for " + team + "</h2>"
                        ].join('')
                 );
               
               // create table headers
               var thead = "<tr><th></th><th>Away Team</th><th>Home Team</th><th>Location</th>";
               thead = thead + "<th>Game Date</th><th>Game Time</th><th>City</th></tr>";
               $('#games-table').append(thead);

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
                    
                       // add rows to games table
                      var row_no = "row" + [i].toString();
                      $('#games-table').find('tbody').append([
                        '<tr class="row" id='+ row_no +'>',
                        '<td id="awayTeam">' + away + '</td>',
                        '<td id="homeTeam">' + home + '</td>',
                        '<td id="venue">' + location + '</td>',
                        '<td id="gamedate">' + gamedate + '</td>',
                        '<td id="gametime">' + gametime + '</td>',
                        '<td id="homeCity">' + homeCity + '</td>',

                        '</tr>'
                        ].join(''));

                       // *** end adding codes *** ***
                        $("#team-form").hide();
                }
            }
        });
       }; 
  };

  function validate(startDate,endDate) {
          event.preventDefault();
          var todayDate = moment().format('YYYY-MM-DD');
          var errMsg = "";

     
          if (startDate < todayDate) {
              errMsg = "Start Date must be greater than Today's Date";
              return errMsg;
          }


          if (startDate.length === 0) {
              errMsg = "Start Date must be Entered";
              return errMsg;
          }

          if (endDate.length === 0) {
              errMsg = "End Date must be Entered";
              return errMsg;
          }

          if(endDate < startDate){
             errMsg = "startDate must be greater than enddate";
             return errMsg;         
          }
          return errMsg;
  }

 $("#game-table").hide();

 // listeners for buttons and row click

 $(document).on("click", "#football", setTeam);
 $(document).on("click", "#basketball", setTeam);
 $(document).on("click", ".row", setGame);
 $(document).on("click", "#play-games", playGame);
 $(document).on("click", "#find-games", findGames);

}); 