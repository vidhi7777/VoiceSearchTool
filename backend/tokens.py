import nltk, requests
from nltk.tag import pos_tag

def get_tokens(cmd_string):
    stopwords = nltk.corpus.stopwords.words("english")
    additional_sw = ['wear', 'wearing', 'fashion', 'clothes', 'outfit'] #add more relevant terms
    stopwords.extend(additional_sw)

    cmd_tokens = pos_tag(nltk.word_tokenize(cmd_string))
    noun_tokens = [word for word,pos in cmd_tokens if pos == 'NN']
    
    return noun_tokens

#we can append each keyword to the base_url and redirect to myntra's search page
# base_url = "https://www.myntra.com/"
# for w in words:
#     base_url=base_url+w+"-"

# response = requests.get(base_url)