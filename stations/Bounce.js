import Tags from '../lib/consts/Tags.js'
import AzuraCast from '../lib/sources/AzuraCast.js'

export const metadata = {
  id: 'bounce',
  name: 'Bounce',
  logo: 'https://i.imgur.com/UxCwL4u.png',
  aliases: ['itsbounce', 'wearebounce'],
  tagline: 'An internet radio station with the aim of providing fantastic entertainment from presenters all around the world.',
  tags: [Tags.Community, Tags.Pop],
  website: 'https://itsbounce.net',
  discord: '57puVnwW4Y',
  sources: [{
    name: 'Bounce',
    url: 'https://live.itsbounce.net',
    default: true,
  }],
}

export const NowPlaying = AzuraCast({
  baseUri: 'https://derrick.xonosho.st',
  stationId: 40,
})