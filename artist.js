require("dotenv").config();
const fetch = require("node-fetch");
const axios = require("axios");

const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=${process.env.mykey}&format=json`;

const artistInfo = fetch(url)
    .then((res) => res.json())
    .then((data) => {
        // console.log(
        //     data.results.artistmatches.artist[0].mbid,
        //     data.results.artistmatches.artist.length
        // );

        for (let i = 0; i < data.results.artistmatches.artist.length; i++) {
            const artistInfo = data.results.artistmatches.artist.map((p) => {
                return {
                    name: p.name,
                    mbid: p.mbid,
                    url: p.url,
                    image_small: p.image[0]["#text"],
                    image: p.image[i],
                };
            });
            console.log("artists", artistInfo);
        }
    });
