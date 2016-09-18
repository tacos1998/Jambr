/*
def Scoring(time, weather, mood, time_tag, weather_tag, mood_tag):
    score = 0
    if time_tag == time:
        score+=1
    if weather_tag == weather:
        score +=1
    if mood_tag == mood:
        score +=1
    return

def Sorting(song, score):
    playlist = []
    if score == 3:
        playlist += [song]
    if score == 2:
        playlist += [song]
    if score == 1:
        playlist += [song]
    return playlist
*/


function createPlaylist() {
  var weather = getSelectedById("weather");
  var mood = getSelectedById("mood");
  console.log(weather, mood);
  var tracks = JSON.parse(localStorage.getItem("tracks"));
  var trackScores = [];
  for(let track of tracks) {
    let trackTags = getTrackTags(track);
    trackScores[track] = scoreTrack(trackTags, weather, mood);
  }
  var sortedTracks = sortTracks(trackScores);
  console.log(sortedTracks);
  
  var jambrPlaylist = {
      name: $("#playlist-name").val() == "" ?  "Jambr Playlist" : $("#playlist-name").val(),
      public: false,
  }
  Spotify.getMe().then(function(user) {
      console.log(user);
      Spotify.createPlaylist(user.id, jambrPlaylist).then(function(playlist) {
          console.log(playlist);
          Spotify.addTracksToPlaylist(user.id, playlist.id, sortedTracks).then(function() {
             openPlaylist(user.id, playlist.id);
          });
      }, function(err) {
          
      });
  }, function(err) {
      console.error(err);
  });
}

function openPlaylist(username, playlist) {
	var width = 450,
	height = 730,
	left = (screen.width / 2) - (width / 2),
	top = (screen.height / 2) - (height / 2);

	var w = window.open("https://play.spotify.com/user/" + username + "/playlist/" + playlist,
	'Spotify',
	'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
}

function getSelectedById(id) {
    var select = document.getElementById(id);
    var selected = [];
    for (let i = 0; i < select.length; i++) {
        if (select.options[i].selected) {
          selected.push(select.options[i].value);
        }
    }
    return selected;
}
    
function intersects(haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};

function getTimeOfDay() {
    var date = new Date();
    var hours = date.getHours();
    if(hours >= 5 && hours < 12) {
        return "morning"
    }
    else if(hours >= 12 && hours < 19) {
        return "afternoon";
    }
    else {
        return "night"
    }
}

function scoreTrack(trackTags, mood, weather) {
    var score = 0;
    if(trackTags.indexOf(getTimeOfDay()) != -1) {
        score += 1;
    }
    if(intersects(trackTags, mood)) {
        score += 1;
    }
    if(intersects(trackTags, weather)) {
        score += 1;
    }
    return score;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function sortTracks(trackScores) {
    var mainList = [];
    for(let i = 3; i >= 1; i--) {
        let subList = [];
        for(let track in trackScores) {
            if(trackScores[track] == i) {
                subList.push("spotify:track:" + track);
            }
        }
        subList = shuffle(subList);
        mainList = mainList.concat(subList);
    }
    return mainList;
}