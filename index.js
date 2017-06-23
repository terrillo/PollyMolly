'use strict'

const AWS = require('aws-sdk')
const Fs = require('fs')

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
})

module.exports = {

  /**
   * Text -> SSML
   * @param  {string} string - Plain text
   * @return {string}
   */
  ssml2text: function(string) {
   return (string).replace(/<[^>]+>/ig,'');
  },

  /**
   * SSML -> Text
   * @param  {string} string - SSML string
   * @return {string}
   */
  text2ssml: function(string) {
    const planText = ssml2text(string)
    return `<speak>${planText}</speak>`;
  },

}
