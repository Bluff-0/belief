import axios from "axios";

export const getUser = async (setUser) => {

    axios.get("https://api.spotify.com/v1/me", {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('spotify_token')}`
        }
    }).then(res => {
        let user = {};
        user['name']= res.data.display_name;
        user['country']= res.data.country;
        user['email']= res.data.email;
        user['followers']= res.data.followers.total;
        user['image']= res.data.images[1].url;
        user['id']= res.data.id;
        setUser(user);
    });
}