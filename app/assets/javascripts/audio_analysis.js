function Mood(features) {
    var danceability = features.danceability;
    var energy = features.energy;
    var mode = features.mode;
    var tempo = features.tempo;
    var valence = features.valence;
   var mood = [];
    if (valence >= .5){
        if (mode===1){
            mood.push('happy');
            if (energy >=  .5){
                if (danceability >= .5){
                    if (tempo >= 108){
                        mood.push("energetic");
                    }
                }
            }else{
                mood.push("love song");
            }
        }
    }else{
        if (mode===1){
            mood.push("mellow");
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
        }
    }
    return mood;
}


function Style(features){
    var acousticness = features.acousticness;
    var instrumentalness = features.instrumentalness;
    var mode = features.mode;
    var time_signature = features.time_signature;
    var energy = features.energy;
    var danceability = features.danceability;
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
        styles.push("electric");
    }
    return styles;
}
