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
            
            <iframe width="420" height="315" src="${element.snippet.thumbnails.medium.url}" frameborder="0" allowfullscreen></iframe>
            `
            $("#videos").append(video)
        });
    })

}

})