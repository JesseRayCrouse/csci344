// 1. Create your getBusinesses function here:
async function getBusinesses(location, term, limit) {
    const url = `https://www.apitutor.org/yelp/simple/v3/businesses/search?location=${location},%20NC&term=${term}&limit=${limit}`
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

// 2. When you're done, uncomment the test code below and preview index.html in your browser:


console.log(
    "Should display 3 pizza restaurants in Asheville:",
    getBusinesses("Asheville, NC", "pizza", 3,)
);
console.log(
    "Should display 10 thai restaurants in San Francisco:",
    getBusinesses("San Francisco, CS", "thai", 10)
);


