import $ from 'jquery'

$(document).ready(() => {
  getTopWord();
})

const getTopWord = () => {
  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
  .then((response) => response.json())
  .then(sanitizeTopWord)
  .catch((error) => console.log( { error } ))
}

const sanitizeTopWord = (topWord) => {
  var topWordWord = Object.keys(topWord.word)[0]
  var wordNumber = Object.values(topWord.word)[0]
  placeTopWord(topWordWord)
  placeTopNumber(wordNumber)
}

const placeTopWord = (topWord) => {
  $('#top-word-place').append(`
    ${topWord}
    `)
}

const placeTopNumber = (wordNumber) => {
  $('#top-word-place').append(`
    , count: ${wordNumber}
  `)
}

const siftWords = () => {
  let wordBlock = $('#new-words').val()
  $('#new-words').html('')
  var allWords = wordBlock.split(' ')
  allWords.forEach(word => {
    postWord(word)
  });
  $('#top-word-place').html('')
  getTopWord()
}

const postWord = (wordTarget) => {
  fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({word: { value: `${wordTarget}` } })
  }).then((response) => response.json())
  .then((responseMessage))
}

const responseMessage = (responseMessage) => {
  console.log(responseMessage.message)
}

$('#word-breakdown').click(()=>{siftWords()});
