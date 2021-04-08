import nltk
from nltk.tag import pos_tag

nltk.download('stopwords')

def get_tokens(cmd_string):
    
    stopwords = nltk.corpus.stopwords.words("english")
    additional_sw = ['wear', 'wearing', 'fashion', 'clothes', 'outfit'] #add more relevant terms
    stopwords.extend(additional_sw)

    cmd_tokens = pos_tag(nltk.word_tokenize(cmd_string))
    noun_tokens = [word for word,pos in cmd_tokens if pos == 'NN']
    
    return noun_tokens
    
