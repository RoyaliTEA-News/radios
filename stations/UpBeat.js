import Tags from '../lib/consts/Tags.js'
import UpBeat from '../lib/sources/UpBeat.js'

export const metadata = {
  id: 'upbeat',
  name: 'UpBeat',
  logo: 'https://i.imgur.com/p6LZAQJ.png',
  aliases: ['ub', 'UpBeat Radio', 'UpBeatRadio', 'upbeat.pw', 'upbeatradio.net'],
  tagline: 'UpBeat is a community powered online radio, providing 24/7 ad-free radio entertainment.',
  tags: [Tags.Community, Tags.Pop, Tags.Gaming],
  website: 'https://upbeatradio.net',
  discord: 'Asmw8HYcAx',
  premid: 'UpBeatRadio',
  sources: [{
    name: 'UpBeat',
    url: 'https://live.upbeat.pw',
    default: true,
  }],
}

export const NowPlaying = UpBeat({
  baseUri: 'https://upbeatradio.net',
})