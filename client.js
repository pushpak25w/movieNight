$(document).ready(function(){
    var API_KEY = "AIzaSyAryMDBFjdBCvp-mzUsHW6ZXFxLulMPGGU"

    var video =''

    $("form").submit(function(event){
        event.preventDefault()
        var search = $("#search").val()
        videoSearch(API_KEY,search,6)
    })

function videoSearch(key,search,maxResults){
    $("#videos").empty()
    $.get("https://www.googleapis.com/youtube/v3/search?key="+key+"&type=video&part=snippet&maxResults="+maxResults+"&q="+search, function(data){
        console.log(data)

        data.items.forEach(element => {
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

            `
            $("#videos").append(video)
        });
    })

}

})