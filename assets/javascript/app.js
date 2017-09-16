// Base array of bands
      var bands = ["Foo Fighters", "Phantogram", "Future Islands", "Sia", "Red Hot Chili Peppers", "Yeah Yeah Yeahs", "Phoenix (band)", "Bruno Mars", "Lady Gaga", "Rihanna", "Kesha"];
      // displayBandGif function displays the gifs
      function displayBandGif() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=02548e6b0d7340edafd7907a3dc5329d&q="+gif+"&limit=10&offset=0&rating=PG&lang=en";

        // AJAX call to get the gifs 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          for (i = 0; i < response.data.length; i++){
          // Creating a div to hold the gifs
          var gifDiv = $("<div class='gif'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pRating = $("<p>").text("Rating: " + rating);

          // Retrieving the URL for the image
          var gifURL = response.data[i].images.downsized_medium.url;

          // Creating an element to hold the image
          var gifButton = $("<img>").attr(
            {"src": gifURL,
            "data": i
             });

          // Appending the image
          gifDiv.append(gifButton);

          //adding the gif at the end
          $("#band-form").append(gifDiv);
           // Displaying the rating
          gifDiv.append("Rating: " + response.data[i].rating);
        }
      });

      }

      // Function for displaying movie data
      function createButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of bands
        for (var i = 0; i < bands.length; i++) {

          // Then dynamicaly generating buttons for each band in the array
          var a = $("<button>");
          // Adding a class of band to the buttons
          a.addClass("band");
          // Adding a data-attribute
          a.attr("data-name", bands[i]);
          // Providing the initial button text
          a.text(bands[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      //function that handles events where a band button is clicked
      $("#add-band").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var band = $("#band-input").val().trim();

        // Adding band name from the textbox to the array
        bands.push(band);

        // Calling the function that creates the buttons
        createButtons();
      });

      // Adding an onclick event to the band buttons that have a class of "band"
      $(document).on("click", ".band", displayBandGif);

      // Calling the function that will display the buttons based on the initial array
      createButtons();

      //change img src from active to still when the gif is clicked on
      //to change the source of the image 
      //response.data[i].images.downsized_still
      function gifPause(event){
        var index = event.target.attributes.data.value;

        var element = $("img[data=index]");
      }
      $(document).on("click", "img", gifPause);