import axios from 'axios'
import FallbackMetadata from '../consts/FallbackMetadata.js'

export default ({ baseUri, stationId }) => async () => {
  try {
    const response = await axios.get(`${baseUri}/api/nowplaying/${stationId}`)
    if (!response.data) {
      return FallbackMetadata
    }
    const { data } = response
    const listeners = data.listeners?.total ?? 0
    return {
      title: data.now_playing?.song?.title ?? null,
      artist: data.now_playing?.song?.artist ?? null,
      dj: (data.live?.is_live ? data.live.streamer_name : null) || null,
      listeners: isNaN(listeners) ? 0 : listeners,
    }
  } catch {
    return FallbackMetadata
  }
}