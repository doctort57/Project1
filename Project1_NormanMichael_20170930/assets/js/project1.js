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
          console.log(data);

         for (var i = 0; i < data.fullgameschedule.gameentry.length; i++) {
                var away = data.fullgameschedule.gameentry[i].awayTeam.City;
                //console.log(away);

                var home = data.fullgameschedule.gameentry[i].homeTeam.City;
                //console.log(home);

                var location = data.fullgameschedule.gameentry[i].location;
                //console.log(location);                

                var gamedate = data.fullgameschedule.gameentry[i].date;
                //console.log(gamedate);

                var gametime = data.fullgameschedule.gameentry[i].time;
                //console.log(gametime);


                 // *** start adding codes *** ***
                 var awayTeamCity = $('<div class="divHorizontal">');
                 awayTeamCity.text(away); 

                 var homeTeamCity = $('<div class="divHorizontal">');
                 homeTeamCity.text(home); 

                 var gameLocation = $('<div class="divHorizontal">');
                 gameLocation.text(location); 

                 var gameDate = $('<div class="divHorizontal">');
                 gameDate.text(gamedate); 


                 var gameTime = $('<div class="divHorizontal">');
                 gameTime.text(gametime); 


                 $('#game-view').append(awayTeamCity);
                 $('#game-view').append(homeTeamCity);
                 $('#game-view').append(gameLocation);
                 $('#game-view').append(gameDate);
                 $('#game-view').append(gameTime);

                 // *** end adding codes *** ***

           }

  }

});



  });

  $("#team-form").hide();

 $(document).on("click", ".dropdown-item", setTeam);

  }); 