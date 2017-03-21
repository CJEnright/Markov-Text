/**
 * MarkovText object for generating text in a markov like way
 */
function MarkovText() {
	this.words = {};
}

/**
 * "Learn" word by word from a given text
 * @param {String} Text Text to learn from (best with minimal special characters)
 */
MarkovText.prototype.learn = function(text) {
	// Break up the text into individual words by spaces
	var newWords = text.split(" ");

	for(var i=0; i<newWords.length - 1; i++) {
		if(!this.words[newWords[i]]) {
			this.words[newWords[i]] = {
				__max: 0
			}
		}

		if(!this.words[newWords[i]][newWords[i+1]]) {
			this.words[newWords[i]][newWords[i+1]] = 1;
		}
		else {
			this.words[newWords[i]][newWords[i+1]]++;	
		}

		// Shift all values up by one
		for(var prop in this.words[newWords[i]]) {
			if(this.words[newWords[i]][prop] >= this.words[newWords[i]][newWords[i+1]] && prop !== newWords[i+1]) {
				this.words[newWords[i]][prop]++;
			}
		}

		this.words[newWords[i]].__max++;
	}
}

/**
 * Produce a string of a given length given what the model knows
 * @param {Number} SentenceLength Length of sentence to produce in words
 * @return {String} 
 */
MarkovText.prototype.output = function(numberOfWords) {
	// Start with a random word
	var previousWord = this.randomRootWord();
	var outputString = previousWord + " ";

	for(var i=0; i<numberOfWords; i++) {
		var newWord;

		if(typeof this.words[previousWord] === "object") {
			var newWordIndex = this.randomFromZero(Object.keys(this.words[previousWord]).length);
			newWord = this.findByIndex(newWordIndex, this.words[previousWord]);
		}
		// If we couldn't get a child word (as in this word doesn't have one) find a new root word
		if(this.newWord === undefined) {
			newWord = this.randomRootWord();
		}

		
		outputString += newWord + " ";
		previousWord = newWord;
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
		if(object[prop] <= index && prop !== "__max") {
			// Return the word (aka the prop)
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