// http://responsivevoice.org/text-to-speech-languages/
// import 
import ResponsiveVoice from './libs/ResponsiveVoice.js'
const responsiveVoice = new ResponsiveVoice()

const SpeakService = {
  say (phrase) {
    if (typeof phrase === 'string') {
      responsiveVoice.speak(phrase, 'US English Female', {
        pitch: 1, // 0 to 2
        rate: 0.75, // 0 to 1.5
        volume: 1, // 0 to 1
        onstart: function () {
          console.log('Started')
        },
        onend: function () {
          console.log('Ended')
        }
      })
    }
  }
}

export default SpeakService
