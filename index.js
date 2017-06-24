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
    if (SSMLtag.exec(string) == null) {
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
    if (SSMLtag.exec(string) !== null) {
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
    const planText = PollyMolly.ssml2text(string) //!arg1
    return `<speak>${planText}</speak>`;
  },

  /**
   * Download .mp3 from AWS Polly
   * @param  {string} string - Text or SSML string
   * @param  {string} file - Path to file including .mp3 extension
   * @param  {function} fn - Callback function
   * @return {string}
   */
  download: function(string, file, fn) {
    let params = {
      'Text': string, //!arg1
      'OutputFormat': 'mp3',
      'VoiceId': 'Joanna'
    }
    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.log(err)
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          Fs.writeFile(file, data.AudioStream, function(err) { //!arg2
            if (err) {
              return console.log(err)
            }
            if (fn) {
              fn(file)
            }
          })
        }
      }
    })
  }

}

module.exports = PollyMolly
