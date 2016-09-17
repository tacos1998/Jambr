var CLIENT_ID = "c246da218ad74387919dfea6b0bb0c7c";
var SCOPES = [
	"user-read-private",
	"playlist-read-private",
	"playlist-modify-public",
	"playlist-modify-private",
	"user-library-read",
	"user-library-modify",
	"user-follow-read",
	"user-follow-modify"
]

function spotifyLogin() {
  var loginURL = getLoginURL();
	var width = 450,
		height = 730,
		left = (screen.width / 2) - (width / 2),
		top = (screen.height / 2) - (height / 2);

	var w = window.open(loginURL,
		'Spotify',
		'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
	);
	
	window.addEventListener("message", receiveMessage, false);
}

function getLoginURL() {
	return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID
		+ '&redirect_uri=' + encodeURIComponent("https://hackisu-tacos1998.c9users.io/callback/")
		+ '&scope=' + encodeURIComponent(SCOPES.join(" "))
		+ '&response_type=token';
}

function receiveMessage(event) {
  console.log("event stuff", event.data);
  window.location = "/main?access_token=" + JSON.parse(event.data).access_token;
}

function loginCallback() {
  console.log("HI");
	console.log('hash', location.hash);
	var hash = {};
	location.hash.replace(/^#\/?/, '').split('&').forEach(function(kv) {
		var spl = kv.indexOf('=');
		if (spl != -1) {
			hash[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl+1));
		}
	});
	console.log('initial hash', hash);
	if (hash.access_token) {
		window.opener.postMessage(JSON.stringify({
			type:'access_token',
			access_token: hash.access_token,
			expires_in: hash.expires_in || 0
		}), '*');
		window.close();
	}
}