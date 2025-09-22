const { Sonos } = require('sonos')
const speaker = new Sonos('172.29.15.168') // заміни на свою IP

const customTrack = 'https://github.com/vasylhrabovskyi/sonos-silence/raw/refs/heads/main/SKELAR_1.mp3'

async function minuteOfSilenceWithCustomTrack() {
  try {
    const originalTrack = await speaker.currentTrack()
    console.log('🎶 Original track URI:', originalTrack.uri)

    const state = await speaker.getCurrentState()
    console.log('📻 Current state:', state)

    if (state === 'playing') {
      await speaker.pause()
      console.log('⏸️ Music paused for a minute of silence.')

      setTimeout(async () => {
        console.log('▶️ Playing custom track...')
        await speaker.play(customTrack)

        // 🔄 Чекаємо, поки трек закінчиться
        const checkInterval = setInterval(async () => {
          const trackInfo = await speaker.currentTrack()
          const status = await speaker.getCurrentState()

          if (status !== 'playing' || !trackInfo.uri.includes('SKELAR_1.mp3')) {
            clearInterval(checkInterval)
            console.log('✅ Custom track finished. Resuming original...')

            if (originalTrack.uri) {
              await speaker.play(originalTrack.uri)
              console.log('🔁 Original track resumed.')
            }
          }
        }, 5000) // перевіряємо кожні 5 сек

      }, 60000) // перерва 1 хвилина

    } else {
      console.log('⛔ Speaker is not playing. Nothing to pause.')
    }
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

minuteOfSilenceWithCustomTrack()
