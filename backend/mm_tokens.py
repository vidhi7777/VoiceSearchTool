import spacy

def get_tokens(input):
    nlp = spacy.load("en_core_web_sm")
    spacy_obj = nlp(input)
    return spacy_obj


def loc_tokens(sp_obj):
    for w in sp_obj:
        if w.is_stop==False and w.label_=="GPE":
            loc_tokens.add(w.text)
    return loc_tokens
                
def time_tokens(sp_obj):
    for w in sp_obj:
        if w.is_stop==False and w.label=="DATE":
            time_tokens.add(w.text)
    return time_tokens
        
    
   
    # print(time_tokens)
    

get_tokens("wear fashion in december")