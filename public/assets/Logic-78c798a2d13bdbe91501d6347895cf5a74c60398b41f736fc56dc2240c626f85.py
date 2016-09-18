import jiphy
jiphy.to.javascript(python_code)
jiphy.to.python(javascript_code)

def Mood(danceability, energy, mode, tempo, valence):
    mood = []
    if valence >= .5:
        if mode==1:
            mood += ['happy']
            if energy >=  .5:
                if danceability >= .5:
                    if tempo >= 108:
                        mood+=["energetic"]
                        
            else:
                mood += ["love song"]
                
        print mood[0:]


    else:
        if mode==1:
            mood += ["melancholy"]
            if energy >= .5:
                mood +=["intense"]
                if danceability >= .5:
                    if tempo >= 108:
                        mood += ["indie"]
                        
        else:
            if energy >= .5:
                if danceability >= 5:
                    mood += ["blue"]
                    
                else:
                    mood += ["spooky"]

            else:
                mood += ["sad"]
                
        print mood[0:]


def Style(acousticness, instrumentalness, mode, time_signature, energy, danceability):
    styles = [] 
    if acousticness >= .9:
        styles += ["acoustic"]
        if instrumentalness >= .9:
            styles += ["classical"]
            
    else:
        if acousticness >= .7:
            styles += ["soft"]
            
        else:
            if .3<= instrumentalness <=.7:
                if energy >= .5:
                    styles += ["rock"]
                    
            else:
                if instrumentalness <.3:
                    styles += ["rap"]
                    
    if time_signature == 3:
        styles += ["waltz"]
        
    if mode == 0:
        if energy >= .5:
            if danceability >= 5:
                styles += ["blues"]
                
            else:
                styles += ["jazz"]
                
    if acousticness <=.2:
        styles += ["electronic"]
        
    print styles
                

     