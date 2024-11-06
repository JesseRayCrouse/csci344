import "./Profile.css";
import React from "react";

export default function Profile({name, picture}) {
    return (
        <section className="profile">
            {name} <img src = {picture} />
        </section>
    );
}