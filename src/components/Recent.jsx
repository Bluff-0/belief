import React, { useState, useEffect } from "react";
import { Item } from "./mini/Item";
import { BarChart } from '@mui/x-charts/BarChart';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

import { recentTrackFeature } from "../functions/recentTrackFeature";
import { moodFn } from "../functions/detectMood";
import '../App.css';

export default function Recent() {

    const [tracks, setTracks] = useState({});
    useEffect(() => { recentTrackFeature(setTracks); }, [])

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
                <Grid xs={4}>
                    With the recently played tracks, your mood seems {moodFn(tracks.sentiment, tracks.arousal)}
                </Grid>
                <Grid xs={5}>
                    <ImageList cols={3}>
                        <ImageListItem key="Subheader" cols={3}>
                            <ListSubheader component="div">Recently Played</ListSubheader>
                        </ImageListItem>
                        {tracks.tracks && tracks.tracks.slice(0, 6).map((item) => (
                            <ImageListItem key={item.image}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    subtitle={item.name}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </Item>
    );
}