import React, { useState, useEffect }  from "react";

import { getDataFromServer } from "../server-requests";

// 1. Query the server using the getDataFromServer function (See posts.jsx)
// 2. Once the data comes back from the server, set the profile state variable.
// 3. Use the profile state variable in my jsx.
export default function Profile({ profileData,token}) {
    const [ ,setProfile] = useState([]);
    console.log(profileData);

    async function getProfile() {
        const data = await getDataFromServer(token, "/api/profile/");
        console.log(data);
        setProfile(data);
    }
    
    useEffect(() => {
        getProfile();
    }, []);

    return (
        <header class="flex gap-4 items-center">
            <img src={Profile.thumb_url} alt={Profile.alt_text || "Profile Photo"} width= "30" height = "30" class="rounded-full w-16" />
            <h2 class="font-Comfortaa font-bold text-2xl">gibsonjack</h2>
        </header>
    );
}
