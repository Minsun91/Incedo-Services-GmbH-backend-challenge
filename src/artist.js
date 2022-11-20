require("dotenv").config();
const exportToCsv = require("export-to-csv");
const fetch = require("node-fetch");
const express = require("express");
const fs = require("fs");
const json2csv = require("json2csv");
const stringify = require("csv-stringify");

module.exports = new (class findInfo {
    artistInfo = async (req, res) => {
        const { artistName } = req.params;
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${process.env.mykey}&format=json`;
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let artists = await response.json();

        const artistInFo = await artists.results.artistmatches.artist.map(
            (p) => {
                return {
                    name: p.name,
                    mbid: p.mbid,
                    url: p.url,
                    image_small: p.image[0]["#text"],
                    image: p.image,
                };
            }
        );

        try {
            const resultCsv = json2csv.parse(artistInFo);
            fs.writeFileSync(`${artistName}.csv`, resultCsv);
            console.log("Success!", `${artistName}.csv`);
            return res.status(200).json({
                message: "Success! Please check downloaded csv.file.",
            });
        } catch {
            console.log("Failed!");
            return res.json({ message: "something went wrong" });
        }
    };
})();
