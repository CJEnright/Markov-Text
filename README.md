
# Markov-Text
Javascript library for generating text in a Markov model like way.
 * Read from an input string
 * Define relations between words in that string
 * Create random (but sometimes coherent) output based on that string  
 
Check out the example at [CJEnright.github.io/Markov-Text/Example/](https://CJEnright.github.io/Markov-Text/Example/)

Sample Code
------
```javascript
var myMarkov = new MarkovText();

// Learn from our text
myMarkov.learn("This is sample text to show usage of the MarkovText class.");

// Output a certain number of words
var generatedWords = myMarkov.output(3);
console.log(generatedWords);
```
