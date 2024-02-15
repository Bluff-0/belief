import axios from "axios";
import { handleException } from "./handleException";
import { RECENT_FETCH_LIMIT } from "./constants";

export const recentTrackFeature = async (setTracks) => {

    axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        params: {
            "limit": RECENT_FETCH_LIMIT
        },
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('spotify_token')}`
        }
    }).then(res => {
        return res.data.items.map(el => {
            let track= el.track;
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
            audios.sentiment= sentiment / RECENT_FETCH_LIMIT;
            let arousal= feature.data.audio_features
            .map(af => Number(af.danceability) * 0.25 + Number(af.energy) * 0.6 + Number(af.liveness) * 0.15)
            .reduce((total, ar) => total + ar);
            audios.arousal= arousal / RECENT_FETCH_LIMIT;
            
        })
        await setTracks(audios);
    }).catch(e => handleException(e));
}