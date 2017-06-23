# PollyMolly
PollyMolly is a AWS Polly node.js wrapper with a better speech synthesis algorithm to provided a more natural sounding voice. The base of the project uses the Speech Synthesis Markup Language (SSML). https://www.w3.org/TR/speech-synthesis/

## Install
`npm install pollymolly`

## Features
- Convert Text to SSML
- Convert SSML to Text

## Todo
- [ ] Download mp3s from AWS Polly
  - [ ] Large file download 
- [ ] "Natural Pause" Algorithm
- [ ] Improved Pronunciation  

## Usage
```
const PollyMolly = require('pollymolly')

/**
 * Text -> SSML
 * @param  {string} Plain text
 * @return {string}
 */
PollyMolly.text2ssml('Hello World') # <speak>Hello World</speak>

/**
 * SSML -> Text
 * @param  {string} SSML string
 * @return {string}
 */
PollyMolly.text2ssml('<speak>Hello World</speak>') # Hello World

```

## Changelog
- `text2ssml()`
- `ssml2text()`
