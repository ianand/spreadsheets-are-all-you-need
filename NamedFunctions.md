This file lists out the named functions used in Spreadsheets-are-all-you-need Excel file to implement OpenAI's GPT-2 model.



`bpe_get_score_for_pair`

- Syntax: `bpe_get_score_for_pair(left_char, right_char)`
- Description: Reads the `vocab_bpe tab` to get the popularity "score" for the pair made from `left_char` and `right_char`. If either one is blank or the pair is not present in the vocab_bpe tab then "" will be returned.
- Code:
```
=LAMBDA(left_char,right_char,         IF( (left_char = "") + (right_char = ""),      "",       IFERROR(      MAX(FILTER(vocab_bpe!C4,(left_char = vocab_bpe!C1) * (right_char = vocab_bpe!C2), "")),     "")))
```

`cosine_similarity`

- Syntax: `cosine_similarity(range1, range2)`
- Description: Returns the cosine similarity between `range1` and `range2`
- Code:
```
=LAMBDA(range1,range2, SUMPRODUCT(range1,range2)/(SQRT(SUMSQ(range1))*SQRT(SUMSQ(range2))))
```

`gelu`

- Syntax: `gelu(x)`
- Description: Implements the GELU activation function used by GPT-2's MLP stage.
- Code:
```
=LAMBDA(x, 0.5*x*(1 + TANH(SQRT(2/PI()) * (x + 0.044715 * POWER(x,3)))))
```

`get_non_blanks_in_range`

- Syntax: `get_non_blanks_in_range(range)`
- Description: Returns the array in `range` with blank cells removed. Helper function used by the BPE tokenization algorithm.
- Code:
```
=LAMBDA(range, IFERROR(FILTER(range, range <> ""), ""))
```

`Last_Non_Empty_Column`

- Syntax: `Last_Non_Empty_Column(range)`
- Description: Returns the index of the last non-empty column in a range. Helper function used by `Constants` tab.
- Code:
```
=LAMBDA(range, SUMPRODUCT(MAX((range<>"")*COLUMN(range))))
```

`Last_Non_Empty_Row`

- Syntax: `Last_Non_Empty_Row(range)`
- Description: Returns the index of the last non-empty row in a range. Helper function used by `Constants` tab.
- Code:
```
=LAMBDA(range, SUMPRODUCT(MAX((range<>"")*ROW(range))))
```


`layer_norm`

- Syntax: `layer_norm(range)`
- Description: Applies LayerNorm to `range`.
- Code:
```
=LAMBDA(range,(range-AVERAGE(range))/SQRT(VAR.P(range)+0.00001)
```

`softmax`

- Syntax: `softmax(range)`
- Description: Applies Softmax to all cells in `range`.
- Code:
```
=LAMBDA(range, EXP( range- MAX(range))/SUM(EXP( range- MAX(range))))
```


`Split_Into_Characters`
- Syntax: `Split_Into_Characters(word)`
- Description: Splits `word` into its component characters and returns it as an array cells. Used by the BPE tokenization tab.
- Code:
```
=LAMBDA(word, MID(word,SEQUENCE(1,LEN(word)),1))
```


`token_for_token_id`
- Syntax: `token_for_token_id(token_id)`
- Description: Returns the token for a given `token_id`
- Code:
```
=LAMBDA(token_id, VLOOKUP(token_id, id_to_tokens!C1:C2,2,FALSE))
```
