/**
 * MarkovText object for generating text in a markov like way
 * @param {Number} WordDepth Depth of each key
 * @param {String} Text (Optional) Text to learn from
 */
function MarkovText(wordDepth, text) {
	// Essentially the n in n-gram
	this.wordDepth = wordDepth || 2;
	this.words = {};

	if(text) {
		this.learn(text);
	}
}

/**
 * "Learn" word by word from a given text
 * @param {String} Text Text to learn from (best with minimal special characters)
 */
MarkovText.prototype.learn = function(text) {
	// Break up the text into individual words by spaces
	var newWords = text.split(" ");

	for(var i=0; i<newWords.length - this.wordDepth; i++) {
		var key = "";
		for(var k=0; k<this.wordDepth-1; k++) {
			key += newWords[i+k] + " ";
		}

		// Make sure a key with these word(s) exists
		if(!this.words[key]) {
			this.words[key] = {
				__m: 0
			}
		}

		// See if there's an object with this key followed by the next word
		if(!this.words[key][newWords[i+this.wordDepth-1]]) {
			
			this.words[key][newWords[i+this.wordDepth-1]] = {
				__i: this.words[key].__m,
				__o: 1 // max index is index + occurrences
			}
		}
		else {
			this.words[key][newWords[i+this.wordDepth-1]].__o++;	
		}

		// Shift all __m values above this up by one (unless it is this)
		for(var prop in this.words[key]) {
			if(this.words[key][prop].__i >= this.words[key][newWords[i+this.wordDepth-1]].__i && prop !== newWords[i+this.wordDepth-1]) {
				this.words[key][prop].__i++;
			}
		}

		this.words[key].__m++;
	}
}

/**
 * Produce a string of a given length given what the model knows
 * @param {Number} SentenceLength Length of sentence to produce in words
 * @return {String} Sentence Generated sentence
 */
MarkovText.prototype.output = function(SentenceLength) {
	var key = this.randomRootWord();
	var generatedWords = key.split(" ");
	var outputString = generatedWords.join(" ");

	for(var i=0; i<SentenceLength; i++) {
		var newWord = this.findByIndex(this.randomFromZero(this.words[key].__m), this.words[key]);
		var key = generatedWords.splice(1, this.wordDepth-1);
		key.pop(); // Last element is always blank, pop it for easiness
		key.push(newWord);
		key = key.join(" ") + " ";

		var generatedWords = key.split(" ");

		outputString += newWord + " ";
	}

	return outputString;
}

/**
 * Get a random word from the root word list
 * @return {String} Word Random word that was found
 */
MarkovText.prototype.randomRootWord = function() {
	return Object.keys(this.words)[this.randomFromZero(Object.keys(this.words).length)];
}

/**
 * Generate a random number between 0 and the number passed
 * @param {Number} Maximum Highest possible number to generate
 * @return {Number} RandomNumber Number we generated between 0 and the number passed
 */
MarkovText.prototype.randomFromZero = function(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Find a word given its index (and if it's nested, its object)
 * @param {Number} Index Index of the 
 * @param {Object} WordObject Object holding possible words
 * @return {String} Word Word found within that index
 */
MarkovText.prototype.findByIndex = function(index, object) {
	for(var prop in object || this.words) {
		if(object[prop].__i <= index && 
			 object[prop].__i + object[prop].__o > index && 
			 prop !== "__m") {
			// Return the word
			return prop;
		}
	}
}

/**
 * Clear out the model's memory
 */
MarkovText.prototype.reset = function() {
	this.words = {};
}

/**
 * Load in a set of words
 * @param {Object} Words Words to load into the 
 */
MarkovText.prototype.load = function(words) {
	this.words = words;
}