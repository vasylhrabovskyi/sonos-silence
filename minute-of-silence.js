console.log('🧪 Script started') // #1

const { Sonos } = require('sonos')
console.log('✅ Sonos module loaded') // #2

const speaker = new Sonos('172.29.15.168')
console.log('📡 Speaker initialized') // #3

async function minuteOfSilence() {
  try {
    console.log('🔍 Getting current state...') // #4
    const state = await speaker.getCurrentState()
    console.log(`📻 Current state: ${state}`) // #5

    if (state === 'playing') {
      await speaker.pause()
      console.log('⏸️ Music paused for a minute of silence.')

      setTimeout(async () => {
        await speaker.play()
        console.log('▶️ Music resumed.')
      }, 60000)
    } else {
      console.log('⛔ Speaker is not playing. Nothing to pause.')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

console.log('🚀 Running minuteOfSilence()') // #6
minuteOfSilence()