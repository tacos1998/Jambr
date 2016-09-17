var accessToken;
var playlist;
function songs() {
  accessToken = parse("access_token");
  
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getMySavedTracks() // note that we don't pass a user id
  .then(function(data) {
    displaySongs(data.items);
  }, function(err) {
    console.error(err);
  });
}
songs();

function displaySongs(songs) {
  console.log(songs);
  var tableHTML = $("#songs").html();
  for(let song of songs) {
    console.log(song);
    let track = song.track;
    let name = track.name;
    let artists = "";
    for(let artist of track.artists) {
      artists += artist.name + " ";
    }
    let album = track.album.name;
    
    var rowHTML = "<tr>";
    rowHTML += "<td>" + name + "</td>";
    rowHTML += "<td>" + artists + "</td>";
    rowHTML += "<td>" + album + "</td>";
    rowHTML += "<td></td>";
    rowHTML += "</td>";
    tableHTML += rowHTML;
  }
  
  $("#songs").html(tableHTML);
}

function parse(val) {
    var result = "Not found",
        tmp = [];
    location.search
    //.replace ( "?", "" ) 
    // this is better, there might be a question mark inside
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
    return result;
}