import Tags from '../lib/consts/Tags.js'
import AzuraCast from '../lib/sources/AzuraCast.js'

export const metadata = {
  id: 'hype',
  name: 'Hype',
  logo: 'https://i.imgur.com/FpzEpLw.png',
  aliases: ['hyperadio.net'],
  tagline: 'Hype is your destination for music.',
  tags: [Tags.Community, Tags.Pop],
  website: 'https://hyperadio.net',
  discord: 'MQD4DNuXg9',
  sources: [{
    name: 'Hype',
    url: 'https://azura.hyperadio.net/radio/8000/radio.mp3',
    default: true,
  }],
}

export const NowPlaying = AzuraCast({
  baseUri: 'https://azura.hyperadio.net',
  stationId: 1,
})