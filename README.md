# PollyMolly
PollyMolly is a AWS Polly node.js wrapper with a better speech synthesis algorithm to provided a more natural sounding voice. The base of the project uses the Speech Synthesis Markup Language (SSML). https://www.w3.org/TR/speech-synthesis/

## Install
`npm install pollymolly`

## Features
- Convert Text to SSML
- Convert SSML to Text
- Download mp3 from AWS Polly

## Todo
- [x] Download mp3s from AWS Polly
  - [ ] Large file download
- [ ] "Natural Pause" Algorithm
- [ ] Improved Pronunciation  
- [ ] Change Voice
- [ ] Change region

## Usage
```
const PollyMolly = require('pollymolly')
```

### Text -> SSML `text2ssml()`
Convert a plain text string to the Speech Synthesis Markup Language
```
PollyMolly.text2ssml('Hello World')
> <speak>Hello World</speak>
```

### SSML -> Text `ssml2text()`
Convert Speech Synthesis Markup Language to plain text
```
PollyMolly.ssml2text('<speak>Hello World</speak>')
> Hello World
```

### is SSML `isSSML()`
Check to see if string is SSML
```
PollyMolly.isSSML('<speak>Hello World</speak>')
> true
```

### is Text `isText()`
Check to see if string is not SSML
```
PollyMolly.isSSML('<speak>Hello World</speak>')
> false
```

### Download File `download()`
Download .mp3 from AWS Polly
```
PollyMolly.download('Hello World', 'sound.mp3')
```

## Changelog
**0.1v**
- `text2ssml()`
- `ssml2text()`
- `download()`

**0.2v**
- `isSSML()`
- `isText()`
