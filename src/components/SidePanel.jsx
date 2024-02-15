import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Item } from './mini/Item';

import beliefLogo from '../asset/image/belief-logo.png';


export default function SidePanel({ user }) {

    return (
        <Grid xs={3}>
            <Item>
                <h3>Hi {user.name},</h3>
                <p>
                    I am Belief, your mighty friend. I have gone through your spotify details, but I don't store any of your informations.
                    You just granted me a handful of accesses like reading your name and email and a bunch of songs you listen to. And those
                    details are just valid for the session you are in. You are kinda jamming with me. But I can tell you some insights from the
                    details you have provided. Like your mood for the last few days. To enjoy the complete experience you can turn on the sound
                    by clicking the button below. If you like me, do share your thoughts with your friends. I will be happy to support others
                    as well.
                </p>
                <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <strong>Session ID: </strong> {`${sessionStorage.getItem("spotify-state").toLocaleUpperCase()}${user.id && user.id.toLocaleUpperCase()}`}
                </p>
                <p>
                    <strong>Country: </strong> {user.country}
                </p>
                <img src={beliefLogo} style={{
                    height: '5vh',
                    margin: '0 25%',
                    backgroundColor: 'whitesmoke',
                    borderRadius: 10
                }} alt='Belief Logo' />
            </Item>
        </Grid>

    );
}
