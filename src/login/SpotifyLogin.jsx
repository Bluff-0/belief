import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { encode } from "js-base64";
import axios from "axios";
import Loading from "../components/Loading";
import {ReactComponent as LoadingIcon} from '../asset/image/spotify-logo.svg';

const SpotifyLogin = (setToken) => {

    const [code, setCode] = useState(null);
    const [collectToken, setCollectToken] = useState(false);

    const initiateSpotifyLogin = async () => {
        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }
        const codeVerifier = generateRandomString(64);

        const sha256 = async (plain) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }

        const base64encode = (input) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);

        let state = uuidv4().split("-")[0];
        sessionStorage.setItem("spotify-code-verifier", codeVerifier);
        sessionStorage.setItem("spotify-state", state);

        const params = {
            response_type: 'code',
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            scope: process.env.REACT_APP_SPOTIFY_SCOPE,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: 'http://localhost:3000',
            state
        }

        const AUTH_URL = new URL("https://accounts.spotify.com/authorize");
        AUTH_URL.search = new URLSearchParams(params).toString();
        setCollectToken(true);
        window.location.href = AUTH_URL.toString();
    };

    useEffect(() => {
        if (sessionStorage.getItem("spotify-state") !== null)
            setCollectToken(true);
    }, []);

    useEffect(() => {
        setSessionCode();
        validateCode();
    }, [code, collectToken])

    const setSessionCode = () => {
        const urlParams = new URLSearchParams(window.location.search);
        let spotifyCode = urlParams.get('code');
        (spotifyCode != null) && setCode(spotifyCode);
    }

    const validateCode = () => {
        if (!code) return;
        axios
            .post("https://accounts.spotify.com/api/token", {
                client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "http://localhost:3000",
                code_verifier: sessionStorage.getItem("spotify-code-verifier")
            }, {
                headers: {
                    "Authorization": `Basic ${encode(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`)}`,
                    "Content-Type": "application/x-www-form-urlencoded;",
                },
            })
            .then((res) => {
                sessionStorage.setItem('spotify_token', res.data.access_token);
                sessionStorage.setItem('spotify_refresh_token', res.data.refresh_token);
                window.location.replace(window.location.pathname);
            })
            .catch((err) => {
                console.log("ERROR");
                console.log(err);
                setCode(null);
            });
    }

    return (
        (code == null) ?
            (
                <div className="App" style={{
                    display: "flex", 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100vh',
                    backgroundColor: 'lightgreen'
                }}>
                    <button 
                        onClick={initiateSpotifyLogin}
                        style={{
                            backgroundColor: 'lightgreen',
                            border: '2px solid darkgreen',
                            fontSize: '1.5rem',
                            color: 'darkgreen',
                            padding: '1rem 1.5rem',
                            borderRadius: '1rem',
                            cursor: 'pointer'
                        }}
                    >Log in to Spotify <LoadingIcon  style={{ height: '1.4rem', width: '2rem', transform: 'translate(0.25rem, 0.25rem)'}}/></button>
                </div>
            ) :
            (<Loading />)
    );
};

export default SpotifyLogin;