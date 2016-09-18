function Mood(danceability, energy, mode, tempo, valence){
   var mood = [];
    if (valence >= .5){
        if (mode===1){
            mood += ['happy'];
            if (energy >=  .5){
                if (danceability >= .5){
                    if (tempo >= 108){
                        mood.push("energetic");
                    }
                }
            }else{
                mood += mood.push("love song");
            }
        }
        return mood;
    }else{
        if (mode===1){
            mood.push("melancholy");
            if (energy >= .5){
                mood.push("intense");
                if (danceability >= .5){
                    if (tempo >= 108){
                        mood.push("indie");
                    }
                }
            }
        }else{
            if (energy >= .5){
                if (danceability >= 5){
                    mood.push("blue");
                }else{
                    mood.push("spooky");
                }
            }else{
                mood.push("sad");
            }
        return mood;
        }
    }
}


function Style(acousticness, instrumentalness, mode, time_signature, energy, danceability){
    var styles = [];
    if (acousticness >= .90){
        styles.push("acoustic");
        if (instrumentalness >= .9){
            styles.push("classical");
        }
    }else{
        if (acousticness >= .7){
            styles.push("soft");
        }else{
            if (.3<= instrumentalness <=.7){
                if (energy >= .50){
                    styles.push("rock");
                }
            }else{
                if (instrumentalness <.3){
                    styles.push("rap");
                }
            }
        }
    }
    if (time_signature == 3){
        styles.push("waltz");
    }
    if (mode == 0){
        if (energy >= .50){
            if (danceability >= 5){
                styles.push("blues");
            }else{
                styles.push("jazz");
            }
        }
    }
    if (acousticness <=.2){
        styles += ["electronic"];
    }
    return styles;
}
