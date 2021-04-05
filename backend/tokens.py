import nltk, requests
nltk.download('stopwords')

def get_tokens(cmd_string):
    tokenizer = nltk.tokenize.RegexpTokenizer('\w+')
    stopwords = nltk.corpus.stopwords.words("english")
    additional_sw = ['wear', 'wearing', 'fashion'] #add more relevant terms
    stopwords.extend(additional_sw)

    cmd_tokens = tokenizer.tokenize(cmd_string)
    search_tokens = [x for x in cmd_tokens if x not in stopwords]

    print(search_tokens) #only for display purpose
    
    return search_tokens

#we can append each keyword to the base_url and redirect to myntra's search page
# base_url = "https://www.myntra.com/"
# for w in words:
#     base_url=base_url+w+"-"

# response = requests.get(base_url)

query = input()
get_tokens(query)