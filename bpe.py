import re, collections

def get_stats(vocab):
    pairs = collections.defaultdict(int)
    for word, freq in vocab.items():
        symbols = word.split()
        for i in range(len(symbols)-1):
            pairs[symbols[i],symbols[i+1]] += freq
    return pairs

def merge_vocab(pair, v_in):
    v_out = {}
    bigram = re.escape(' '.join(pair))
    p = re.compile(r'(?<!\S)' + bigram + r'(?!\S)')
    for word in v_in:
        w_out = p.sub(''.join(pair), word)
        v_out[w_out] = v_in[word]
    return v_out

vocab = {'l o w _' : 5, 'l o w e r _' : 2,
'n e w e s t _':6, 'w i d e s t _':3}

num_merges = 10

for i in range(num_merges):
    pairs = get_stats(vocab)
#    print(sort(pairs))
    
    sorted_dict = {k: v for k, v in sorted(pairs.items(), key=lambda item: item[1], reverse=True)}
    print(sorted_dict)
    
    best = max(pairs, key=pairs.get)
    vocab = merge_vocab(best, vocab)
    print(best)
    print("-----------")