import React, {useState} from "react";

import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Like({ token, likeId, postId}) {
    const [stateLikeId, setStateLikeId] = useState(likeId);

    async function createLike() {
        const sendData = {
            post_id: postId,
        }
        console.log(sendData);
        console.log("creating a like")
        const responseData = await postDataToServer(token, "/api/likes/", sendData);
        console.log(responseData);
        setStateLikeId(responseData.id);
    }

    async function deleteLike() {
        const responseData = await deleteDataFromServer(token, "/api/likes/" + stateLikeId);
        console.log(responseData);
        console.log("deleting a like")
        setStateLikeId(null);
    }

    console.log(stateLikeId);
    if(stateLikeId) {
        return (
            <button aria-label="Unlike This Post" aria-checked="true" aria-role="toggle" onClick={deleteLike}><i className="fas fa-heart"></i></button>
        );
    } else {
        return (
            <button aria-label="Like This Post" aria-checked="false" aria-role="toggle" onClick={createLike}><i className="far fa-heart"></i></button>
        );
    }

};