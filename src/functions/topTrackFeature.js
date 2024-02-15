import axios from "axios";
import { handleException } from "./handleException";
import { TOP_FETCH_LIMIT } from "./constants";

export const topTrackFeature = async (setTracks) => {

    axios.get("https://api.spotify.com/v1/me/top/tracks", {
        params: {
            "time_range": "short_term",
            "limit": TOP_FETCH_LIMIT,
            "offset": 0
        },
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('spotify_token')}`
        }
    }).then(res => {
        return res.data.items.map(track => {
            let details = {
                id: track.id,
                image: track.album.images[1].url,
                name: track.name
            }
            return details;
        })
    }).then(async tracks => {
        let audios= {
            sentiment: 0,
            tracks,
            arousal: 0
        }
        await axios.get("https://api.spotify.com/v1/audio-features", {
            params: {
                "ids": tracks.map(track => track.id).join(",")
            },
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('spotify_token')}`
            }
        }).then(feature => {
            let sentiment= feature.data.audio_features
            .map(af => Number(af.valence))
            .reduce((total, valence) => total + valence)
            audios.sentiment= sentiment / TOP_FETCH_LIMIT;
            let arousal= feature.data.audio_features
            .map(af => Number(af.danceability) * 0.25 + Number(af.energy) * 0.6 + Number(af.liveness) * 0.15)
            .reduce((total, ar) => total + ar);
            audios.arousal= arousal / TOP_FETCH_LIMIT;
        })
        await setTracks(audios);
    }).catch(e => handleException(e));
}