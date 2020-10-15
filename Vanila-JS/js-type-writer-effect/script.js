class TypeWriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    // Type method 
    type() {
        // current index of word
        const current = this.wordIndex % this.words.length;

        // get the full text of current word
        const fulltext = this.words[current];


        // check if deleting 
        if (this.isDeleting) {
            // remove char 
            this.text = fulltext.substring(0, this.text.length - 1);
        }
        else {
            // add char 
            this.text = fulltext.substring(0, this.text.length + 1);
        }

        // insert text into Element
        this.textElement.innerHTML = `<span class='text'>${this.text}</span>`;

        // initial type spreed 
        let typeSpreed = 300;

        if (this.isDeleting) {
            typeSpreed /= 2;
        }

        //if word is complete
        if (!this.isDeleting && this.text == fulltext) {
            // make pause at end 
            typeSpreed = this.wait;

            // set delete to true 
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.text == '') {
            this.isDeleting = false;

            // move to next word 
            this.wordIndex++;

            // pause before start typing next word 
            typeSpreed = 500;
        }

        setTimeout(() => this.type(), typeSpreed);
    }
}


// init on DOM load 
document.addEventListener('DOMContentLoaded', init);

// init app 
function init() {
    const textElement = document.querySelector('.text-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');

    // init typewriter
    new TypeWriter(textElement, words, wait);
}