
# Markov-Text
Javascript library for generating text in a Markov chain like way.
 * Learn from an input string
 * Define relations between words in that string
 * Create random (but often coherent) output based on that string  
 
Check out the example at [CJEnright.github.io/Markov-Text/Example/](https://CJEnright.github.io/Markov-Text/Example/)

Why?
------
Mostly because sites like [watchout4snakes](http://watchout4snakes.com/) are cool.

Of Note
------
 * The Pride and Prejudice set uses a word depth of 3, and has all punctuation removed.
 * You can make output more realistic by keeping punctuation when learning, and generating words until you reach one that ends with . ? or !
 * Using a word depth of 2 is good for small text, 3 for large, and anything beyond that needs a massive amount of text to output text that's not just the training data.

Sample Code
------
```javascript
// Create a MarkovText object with a word depth of 3
var myMarkov = new MarkovText(3);

// Learn from our text
myMarkov.learn("This is sample text to show usage of the MarkovText class.");

// Output 10 words
var generatedWords = myMarkov.output(10);
console.log(generatedWords);
```
