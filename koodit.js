//js for project 2: AJAX call to a live REST API
//function loadTheaters gets theater options for dropdown
function loadTheaters() {
  //Url for Theaters
  var url = "https://www.finnkino.fi/xml/TheatreAreas/";
  //Var for new XMLHttpRequest
  var xmlhttp = new XMLHttpRequest();
  //Defining request
  xmlhttp.open("GET", url, true);
  //Send request
  xmlhttp.send();
  //When ready function
  xmlhttp.onreadystatechange = function () {
    //If state and status are OK continue
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //var for response
      var xmlDoc = xmlhttp.responseXML;
      // var for theater IDs
      var idTheater = xmlDoc.getElementsByTagName("ID");
      //var for theater names
      var nameTheater = xmlDoc.getElementsByTagName("Name");
      // var for select location
      var theaters = document.getElementById("Theater");
      // loop for results
      for (x = 0; x < idTheater.length; x++) {
        //add select option to location
        theaters.innerHTML +='<option value="' + idTheater[x].innerHTML + '">' + nameTheater[x].innerHTML + "</option>";
      }//End loop
    }//End If statement
  };//End ready function
}//End loadTehaters function
//run loadTheaters
loadTheaters();

//function loadDates gets date selections for dropdown
function loadDates() {
  //Url for Dates
  var url = "https://www.finnkino.fi/xml/ScheduleDates/";
  //Var for new XMLHttpRequest
  var xmlhttp = new XMLHttpRequest();
  //Defining request
  xmlhttp.open("GET", url, true);
   //Send request
  xmlhttp.send();
  //When ready function
  xmlhttp.onreadystatechange = function () {
    //If state and status are OK continue
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //var for response
      var xmlDocDate = xmlhttp.responseXML;
      //var for dates
      var dateMovie = xmlDocDate.getElementsByTagName("dateTime");
      //var for date location
      var dates = document.getElementById("Date");
      //loop for results
      for (x = 0; x < dateMovie.length; x++) {// ***covid-19 is effecting heavily on Finnkino and data is also currently weird when testing***
        // var for full information
        var xDate = dateMovie[x].innerHTML;
        //pick day
        var day = xDate.substring(8, 10);
        //pick month
        var month = xDate.substring(5, 7);
        // year
        var year = xDate.substring(0, 4);
        // var for prettier date
        var pretty = day + ". " + month + ". " + year;
        //add select otion to location
        dates.innerHTML +=
          '<option value="' + xDate + '">' + pretty + "</option>";
      }//End loop
    }//End If statement
  };//End ready function
}//End loadTehaters function
//run loadDates
loadDates();
//add eventListener to button
document.getElementById("letMeIn").addEventListener("click", showMovies);
//function showMovies for viewing results by selections
function showMovies() {
  //var for selected date
  var dateSelected = document.getElementById("Date").value;
  //var for selected theater
  var theaterSelected = document.getElementById("Theater").value;
  //url for movie results by selections
  var url =
    "https://www.finnkino.fi/xml/Schedule/?area=" +
    theaterSelected +
    "&dt=" +
    dateSelected;
  //Var for new XMLHttpRequest
  var xmlhttp = new XMLHttpRequest();
  //Defining request
  xmlhttp.open("GET", url, true);
  //Send request
  xmlhttp.send();
  //When ready function
  xmlhttp.onreadystatechange = function () {
    //If state and status are OK continue
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //var for response
      var xmlDocMagic = xmlhttp.responseXML;
      //var for startTimes
      var showStart = xmlDocMagic.getElementsByTagName("dttmShowStart");
      //var for titles
      var showTitle = xmlDocMagic.getElementsByTagName("Title");
      //var for genres
      var showGenres = xmlDocMagic.getElementsByTagName("Genres");
      //var for theaterInfo
      var showWhere = xmlDocMagic.getElementsByTagName("TheatreAndAuditorium");
      // var for movie posters
      var showPortrait = xmlDocMagic.getElementsByTagName("EventSmallImagePortrait");

      //var for result output and table specs
      var out = "<div class='table-responsive'><table class='table table-striped table-dark'>";
      //loop for results
      for (x = 0; x < showTitle.length; x++) {
        //var for time and picking only time value
        var prettyTime = showStart[x].innerHTML.substring(11, 16);
        // table row
        out += "<tr>";
        //table cell time
        out += "<td>" + prettyTime + "</td>";
        //table cell location
        out += "<td>" + showWhere[x].innerHTML + "</td>";
        //table cell title
        out += "<td>" + showTitle[x].innerHTML + "</td>";
        //table cell genres
        out += "<td>" + showGenres[x].innerHTML + "</td>";
        //table cell image
        out += "<td><img src='" + showPortrait[x].innerHTML + "'></td>";
        //end table row
        out += "</tr>";
      }//end loop
      out += "</table></div>";//end table
    }//End If statement
    
    document.getElementById("Results").innerHTML = out;//put results(table) in document
  };//End ready function
}//End loadTehaters function
//run showMovies
showMovies();
