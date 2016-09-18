var weather = ["rainy", "sunny", "stormy"];
var times = ["morning", "afternoon", "night"];

function categorizeTags() {
  var tracks = JSON.parse(localStorage.getItem("tracks"));
  var uniqueTags = []; 
  for(let track of tracks) {
    let trackTags = getTrackTags(track);
    for(let tag of trackTags) {
      if(uniqueTags.indexOf(tag) == -1) {
        uniqueTags.push(tag);
      }
    }
  }
  
  var weatherHTML = $("#weather").html();
  var moodHTML = $("#mood").html();
  for(let tag of uniqueTags) {
    if(times.indexOf(tag.toLowerCase()) != -1) {
      continue;
    }
    if(weather.indexOf(tag.toLowerCase()) != -1) {
      weatherHTML += "<option>" + tag + "</option>";
    }
    else {
      moodHTML += "<option>" + tag + "</option>";
    }
  }
  $("#weather").html(weatherHTML);
  $("#mood").html(moodHTML);
}

function getTrackTags(trackId) {
  var tags = [];
  var savedTags = localStorage.getItem("tags_" + trackId) || "[]";
  var savedAutoTags = localStorage.getItem("autotags_" + trackId) || "[]";
  savedTags = JSON.parse(savedTags);
  savedAutoTags = JSON.parse(savedAutoTags);
  tags = savedTags.concat(savedAutoTags);
  return tags;
}