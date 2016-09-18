var spotifyApi;
var accessToken;
var playlist;
var originalTableHTML = $("#songs").html();
var page = 0;
localStorage.setItem("tracks", "");
function songs(newPage) {
  console.log(newPage);
  Spotify.getMySavedTracks({offset: newPage * 20, limit: 20}) // note that we don't pass a user id
  .then(function(data) {
    displaySongs(data.items);
  }, function(err) {
    console.error(err);
  });
}

function back() {
  if(page > 0) {
    page--;
    songs(page);
  }
}

function forward() {
  page++;
  songs(page);
}

function displaySongs(songs) {
  var trackIds = JSON.parse(localStorage.getItem("tracks") || "[]");
  var tableHTML = originalTableHTML;
  for(let song of songs) {
    let track = song.track;
    let name = track.name;
    let artists = "";
    for(let artist of track.artists) {
      artists += artist.name + " ";
    }
    let album = track.album.name;
    if(trackIds.indexOf(track.id) == -1) {
      trackIds.push(track.id);
    }
    
    var rowHTML = "<tr>";
    var imgHTML = "<img src='" + track.album.images[0].url + "' style='width: 64px; height: 64px;'>";
    rowHTML += "<td>" + imgHTML + "</td>"
    rowHTML += "<td>" + name + "</td>";
    rowHTML += "<td>" + artists + "</td>";
    rowHTML += "<td>" + album + "</td>";
    rowHTML += "<td>Tags:<span id='submitted_" + track.id + "'></span><br><input type='text' class='special-box' id='tags_" + track.id + "'><input type='submit' class='special-btn' value='Submit' onclick='submitTag(\"" + track.id + "\");'></td>";
    rowHTML += "</tr>";
    tableHTML += rowHTML;
    
    Spotify.getAudioFeaturesForTrack(track.id).then(function(data) {
      var mood = Mood(data);
      var style = Style(data);
      var autoTags = mood.concat(style);
      saveAutoTags(track.id, autoTags);
      displayTags(track.id);
    }, function(err) {
      console.error(err);
    });
  }
  localStorage.setItem("tracks", JSON.stringify(trackIds));
  
  $("#songs").html(tableHTML);
  
  for(let song of songs) {
    let track = song.track;
    displayTags(track.id);
  }
}

function submitTag(trackId) {
  console.log(trackId);
  var newTag = $("#tags_" + trackId).val();
  saveTag(trackId, newTag);
  displayTags(trackId);
}

function saveTag(trackId, newTag) {
  var savedTags = localStorage.getItem("tags_" + trackId) || "[]";
  savedTags = JSON.parse(savedTags);
  savedTags.push(newTag.toLowerCase());
  localStorage.setItem("tags_" + trackId, JSON.stringify(savedTags));
}

function saveAutoTags(trackId, autoTags) {
  localStorage.setItem("autotags_" + trackId, JSON.stringify(autoTags));
}

function displayTags(trackId) {
  var savedTags = localStorage.getItem("tags_" + trackId) || "[]";
  var savedAutoTags = localStorage.getItem("autotags_" + trackId) || "[]";
  savedTags = JSON.parse(savedTags);
  savedAutoTags = JSON.parse(savedAutoTags);
  var submittedHTML = "";
  for(let tag of savedAutoTags) {
    submittedHTML += "<span class='badge'>" + tag + " <a onclick='deleteAutoTag(\"" + trackId + "\", \"" + tag + "\");'>x</a></span>";
  }
  for(let tag of savedTags) {
    submittedHTML += "<span class='badge'>" + tag + " <a onclick='deleteTag(\"" + trackId + "\", \"" + tag + "\");'>x</a></span>";
  }
  $("#submitted_" + trackId).html(submittedHTML);
}

function deleteAutoTag(trackId, tag) {
  var savedTags = localStorage.getItem("tags_" + trackId) || "[]";
  savedTags = JSON.parse(savedTags);
  for(let i = 0; i < savedTags.length; i++) {
    if(savedTags[i] == tag) {
      savedTags.splice(i, 1);
    }
  }
  localStorage.setItem("tags_" + trackId, JSON.stringify(savedTags));
  displayTags(trackId);
}

function deleteTag(trackId, tag) {
  var savedTags = localStorage.getItem("tags_" + trackId) || "[]";
  savedTags = JSON.parse(savedTags);
  for(let i = 0; i < savedTags.length; i++) {
    if(savedTags[i] == tag) {
      savedTags.splice(i, 1);
    }
  }
  localStorage.setItem("tags_" + trackId, JSON.stringify(savedTags));
  displayTags(trackId);
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