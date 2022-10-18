import Tags from '../lib/consts/Tags.js'
import AzuraCast from '../lib/sources/AzuraCast.js'

export const metadata = {
  id: 'truckersfm',
  name: 'TruckersFM',
  logo: 'https://i.imgur.com/AXcYBF8.png',
  aliases: ['tfm', 'Truckers FM', 'Truckers.FM'],
  tagline: 'TruckersFM is a community radio station that is dedicated to the Truck Sim Community!',
  tags: [Tags.Simulation, Tags.Community, Tags.Pop, Tags.Gaming],
  website: 'https://truckers.fm',
  discord: 'truckersfm',
  premid: 'TruckersFM',
  sources: [{
    name: 'TruckersFM',
    url: 'https://live.truckers.fm',
    default: true,
  }],
}

export const NowPlaying = AzuraCast({
  baseUri: 'https://azura.truckers.fm',
  stationId: 1,
})