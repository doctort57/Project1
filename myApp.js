    $(document).ready(function(){
      $('#para1').click(function(){
        $('#para1').hide();
        console.log('test...');
      });

      var btnSubmitClicked = 0;
      $(document).on('click', '#btnNormanFormSubmit', function(){
          btnSubmitClicked = 1;

          var vstartdate = $('#startdate').val().trim();
          console.log("startdate:", Date.parse(vstartdate));

          var venddate = $('#enddate').val().trim();
          console.log("enddate:", Date.parse(venddate));

          var diff = Date.parse(venddate) - Date.parse(vstartdate);

	      if(diff < 0){
	      	$('#myModal_1').modal('show'); // show that error exist
	      }
	      else{
	      	console.log(" End Date > Start Time");
	      }           
      });

      


      
    });

    /*
Date.parse(from) 
    */