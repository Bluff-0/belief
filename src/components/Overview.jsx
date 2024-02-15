import React, { useState, useEffect } from "react";
import { Item } from "./mini/Item";
import { BarChart } from '@mui/x-charts/BarChart';
import Grid from '@mui/material/Unstable_Grid2';

import { topTrackFeature } from '../functions/topTrackFeature';
import { moodFn } from "../functions/detectMood";
import '../App.css';

export default function Overview() {

    const disk = {
        cover: {
            position: 'relative',
            borderRadius: '50%',
            width: '100%',
            aspectRatio: '1/1',
            display: 'block',
            backgroundColor: 'inherit',
            margin: '50% 0 0',
            transform: 'translateY(-25%)'
        },
        image: {
            width: '100%',
            borderRadius: 'inherit',
            aspectRatio: '1/1',
            transform: 'translateY(1%)',
            border: '1px solid #ccc'
        },
        center: {
            position: 'absolute',
            width: '20%',
            aspectRatio: '1/1',
            borderRadius: '50%',
            backgroundColor: '#1A2027',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc'
        }
    }

    const [tracks, setTracks] = useState({});
    useEffect(() => { topTrackFeature(setTracks); }, [])

    return (
        <Item style={{
            boxShadow: '0 0 6px 1px #ccc'
        }}>
            <Grid container spacing={2} xs={12}>
                <Grid xs={3}>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Valence'], hideTooltip: true }]}
                        series={[{ data: [tracks.sentiment] }, { data: [0] }]}
                        yAxis={[{ min: 0, max: 1, hideTooltip: true }]}
                        height={300}
                    />
                </Grid>
                <Grid xs={6}>
                    So you are listening to {tracks.tracks && tracks.tracks[0].name}, {tracks.tracks && tracks.tracks[1].name} & {tracks.tracks && tracks.tracks[2].name} on repeat
                    these days. Also your detection score indicates that you were mostly in a {moodFn(tracks.sentiment, tracks.arousal)} mood. 
                </Grid>
                <Grid xs={3}>
                    <div style={disk.cover}>
                        <img src={(tracks.tracks && tracks.tracks[0].image)} alt="Most Played Track" style={disk.image} className="slow-rotating"/>
                        <div style={disk.center} />
                    </div>
                </Grid>
            </Grid>
        </Item>
    );
}