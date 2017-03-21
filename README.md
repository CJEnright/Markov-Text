
# Markov-Text
Javascript library for generating text in a Markov chain like way.
 * Read from an input string
 * Define relations between words in that string
 * Create random (but sometimes coherent) output based on that string  
 
Check out the example at [CJEnright.github.io/Markov-Text/Example/](https://CJEnright.github.io/Markov-Text/Example/)

Why?
------
Mostly because sites like [watchout4snakes](http://watchout4snakes.com/) are cool.

Notes
------
Markov chains are cool because of how effective they are for being so simple, but they're not perfect for generating english.  Learning from text with punctuation leads to some ugly output, and typically grammar rules aren't followed.  It's nice to see as a proof of concept for the idea of Markov chains, but don't expect to see the same results other machine learning options might give.

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
