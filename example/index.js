const PollyMolly = require('pollymolly')

// Text -> SSML
console.log(PollyMolly.text2ssml('Hello World'))

// SSML -> Text
console.log(PollyMolly.ssml2text('<speak>Hello World</speak>'))

// Download File
PollyMolly.download({ 'Text': 'Hello World' }, 'media/hello.mp3', function() {
  console.log('File Saved!')
})
