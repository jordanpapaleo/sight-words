// http://responsivevoice.org/text-to-speech-languages/
import ResponsiveVoice from 'libs/ResponsiveVoice'
import Voices from 'constants/Voices'

const responsiveVoice = new ResponsiveVoice()

const SpeakService = {
  say (phrase) {
    if (typeof phrase === 'string') {
      // phrase = 'Bonjour Harper.  Tu voux un cookie.'
      responsiveVoice.speak(`${phrase}`, Voices.US_MALE, {
        pitch: 1, // 0 to 2
        rate: 0.75, // 0 to 1.5
        volume: 1, // 0 to 1
        onstart () {
          console.log('Started')
        },
        onend () {
          console.log('Ended')
        }
      })
    }
  }
}

export default SpeakService
