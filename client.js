$(document).ready(function () {
  // Api key to access youtube's data from outside.
  var API_KEY = "AIzaSyAryMDBFjdBCvp-mzUsHW6ZXFxLulMPGGU";

  //container to store video data which will be displayed once the search is complete
  var video = "";

  //on hitting the submit button, this function will be called
  $("form").submit(function (event) {
    event.preventDefault();

    //to get value from the search box
    var search = $("#search").val();
    //function to get search results
    videoSearch(API_KEY, search, 12);
  });


  function videoSearch(key, search, maxResults) {
    //Emptying out the previous search result in case there is any
    $("#videos").empty();
    
    //getting and transfering the video elements from youtube data.
    $.get(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        key +
        "&type=video&part=snippet&maxResults=" +
        maxResults +
        "&q=" +
        search,
      function (data) {
        console.log(data);

        data.items.forEach((element) => {
          video = `
            <a href="https://www.youtube.com/watch?v=${element.id.videoId}">
            <div>
            <iframe width="320" height="180" src="${element.snippet.thumbnails.medium.url}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div>
            <p>${element.snippet.title}</p>
            <p>${element.snippet.channelTitle}</p>
            </div>
            <br>

            </a>

            `;
          $("#videos").append(video);
        });
      }
    );
  }
});
