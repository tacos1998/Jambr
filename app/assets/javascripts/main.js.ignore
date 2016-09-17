var accessToken;
function main() {
  accessToken = parse("access_token");
  
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getUserPlaylists()  // note that we don't pass a user id
  .then(function(data) {
    console.log(data);
    displayPlaylists(data.items);
  }, function(err) {
    console.error(err);
  });
}
main();

function displayPlaylists(playlists) {
  var playlistHTML = $("#playlist").html();
  for (let playlist of playlists) {
    playlistHTML += "<tr><td><a onclick='loadPlaylist(\"" + playlist.id + "\")'>" + playlist.name + "</a></tr></td>";
  }
  $("#playlist").html(playlistHTML);
}

function loadPlaylist(playlistId) {
  window.location = "/songs?access_token=" + accessToken + "&playlist=" + playlistId;
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