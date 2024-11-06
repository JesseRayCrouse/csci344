import React from "react";
import Profile from  "./Profile.jsx";
export default function App() {

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
                <Profile  name = "jesse" picture="https://picsum.photos/id/216/100/100" />
                <Profile  name = "sarah" picture="https://picsum.photos/id/216/100/100" />
                <Profile  name = "ben"  picture="https://picsum.photos/id/216/100/100" />
                <Profile  name = "chip" picture="https://picsum.photos/id/216/100/100" />
            </main>
        </>
    );
}