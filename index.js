'use strict'

const AWS = require('aws-sdk')
const Fs = require('fs')

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

const PollyMolly = {

  /**
   * is Text
   * @param  {string} string
   * @return {boolean}
   */
  isText: function(string) {
    const SSMLtag = /<[^>]+>/ig;
    if (SSMLtag.exec(string) == null) { //!arg1
      return true
    }
    else {
      return false
    }
  },

  /**
   * is SSML
   * @param  {string} string
   * @return {boolean}
   */
  isSSML: function(string) {
    const SSMLtag = /<[^>]+>/ig;
    if (SSMLtag.exec(string) !== null) { //!arg1
      return true
    }
    else {
      return false
    }
  },

  /**
   * Text -> SSML
   * @param  {string} string - Plain text
   * @return {string}
   */
  ssml2text: function(string) {
   return (string).replace(/<[^>]+>/ig,''); //!arg1
  },

  /**
   * SSML -> Text
   * @param  {string} string - SSML string
   * @return {string}
   */
  text2ssml: function(string) {
    if (PollyMolly.isText(string)) {
      string = PollyMolly.ssml2text(string) //!arg1
    }
    return `<speak>${string}</speak>`;
  },

  /**
   * Download .mp3 from AWS Polly
   * @param  {object} params - Text, OutputFormat, & VoiceId
   * @param  {string} file - Path to file including .mp3 extension
   * @param  {function} fn - Callback function
   * @return {object}
   */
  download: function(params, file, fn) {
    if (!params.Text) return false;
    const defaultParams = {
      'Text': 'Hello World',
      'OutputFormat': 'mp3',
      'VoiceId': 'Joanna'
    }
    const requestParams = Object.assign({}, defaultParams, params); //!arg1

    // Define Type
    if (PollyMolly.isSSML(requestParams.Text)) {
      requestParams.TextType = 'ssml';
    } else {
      requestParams.TextType = 'text';
    }

    Polly.synthesizeSpeech(requestParams, (err, data) => {
      if (err) {
        console.log(err)
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          Fs.writeFile(file, data.AudioStream, function(err) { //!arg2
            if (err) {
              return console.log(err)
            }
            if (fn) {
              const results = {
                'characters': (requestParams.Text).length,
              }
              fn(results)
            }
          })
        }
      }
    })
  },

  /**
   * Convert a string to a more natural speaking SSML
   * @param  {string} string
   * @return {string} - SSML
   */
  natural: function(string) {
    if (PollyMolly.isText(string)) {
      string = PollyMolly.text2ssml(string) //!arg1
    }

    // Natural Pauses
    string = string.replace('-', '<break time="200ms"/>')

    // Done
    return string
  }

}

module.exports = PollyMolly
