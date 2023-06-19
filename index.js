let words = [
    {
        "inputs": 5,
        "title": "Guess Me",
        "category": "Board Game",
        "word": "Chess",
        // "word": `C<span class="rep_input">_____</span><span class="rep_input">_____</span>s<span class="rep_input">_____</span>`,
        // "word": ["Chess"],
        "letters": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"]
    },
    {
        "inputs": 10,
        "title": "Guess Me",
        // "word": `V<span class="rep_input">_____</span><span class="rep_input">_____</span>l<span class="rep_input">_____</span>y<span class="rep_input">_____</span>a<span class="rep_input">_____</span><span class="rep_input">_____</span>`,
        "category": "Sport",
        "word": "VolleyBall",
        // "word": ["VolleyBall"],
        // "letters": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"]
    },
    {
        "inputs": 7,
        "title": "Guess Me",
        // "word": `G<span class="rep_input">_____</span><span class="rep_input">_____</span>r<span class="rep_input">_____</span><span class="rep_input">_____</span><span class="rep_input">_____</span>`,
        "category": "Animal",
        "word": "Girrafe",
        // "words": ["Girrafe"],
        // "letters": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"]
    }
]

var gameOver = false
$(document).ready(function () {
    // displayWord();
    fillBlanks();
})

$(function() {
    // $(".input_field").keyup(function() {
    //     let id = $(this).attr("id")
    //     let inputNumber = id.split("_")[1];
    //     $(".rep_input").eq(inputNumber).html($(this).val());
    // })
    $("#next_word").click(function() {
        // displayWord();
        fillBlanks();
        
    })
})

$(function fillBlanks() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    $("#game-name").html(randomWord.title)
    $("#category").html(randomWord.category)

    for (let i = 0; i < randomWord.inputs; i++) {
        let input_html = `<span class="fill_blanks" id="input_${i}">_</span>`
        $("#blanks").append(input_html)
    }
    
    //Fill blanks only if the character match is found
    $(".clickable").click(function () {
        var gameOver = false
        var correctGuess = false;

        //Get the id of the button clicked
        let id = $(this).attr("id");

        //Get the life
        var life  = parseInt($("#life").text())

        if (life > 0 && correctGuess!=true && gameOver!=true) {           
            life = life - 1
            $("#life").text(life)
        }
        else if (life == 0) {
            $("#result").text("You Lost!!")
        }

        //Loop through all the letters
        for (var i=0; i < randomWord.word.length; i++) {
            //Check if the character matches the id of the bottom
            if (randomWord.word.charAt(i).toLowerCase() == id) {
                //Check if the life is still left and blank is empty / already filled
                if (life > 0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)) {
                    //fill blanks
                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    //Check if the word guess is complete
                    if ($("#blanks").text() === randomWord.word.toLowerCase()) {
                        $("#result").text("You Win!!")
                        correctGuess = true;
                        gameOver = true
                    }
                }
            }
        }
        
    })
})