import React, { useState, useEffect } from "react";

import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion"

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions() {
        const data = await getDataFromServer(token, "/api/suggestions/");
        console.log(data);
        setSuggestions(data);
    }

    useEffect(() => {
        getSuggestions();
    }, []);

    function outputSuggestions(suggestionObj) {
        return <Suggestion token={token} key={suggestionObj.id} suggestionData={suggestionObj} />
    }

    return (
        
        <header>
            {
                suggestions.map(outputSuggestions)
            }
        </header>
    );
}