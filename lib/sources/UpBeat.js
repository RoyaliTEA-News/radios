import axios from 'axios'
import FallbackMetadata from '../consts/FallbackMetadata.js'

export default ({ baseUri }) => async () => {
  try {
    const response = await axios.get(`${baseUri}/api/v1/stats`)
    if (!response.data) {
      return FallbackMetadata
    }
    const { data } = response
    const listeners = data.listeners ?? 0
    return {
      title: data.song?.title,
      artist: data.song?.artist,
      dj: data.onair?.name && data.onair?.name !== 'UpBeat' ? data.onair.name : null,
      listeners: isNaN(listeners) ? 0 : listeners,
    }
  } catch {
    return FallbackMetadata
  }
}