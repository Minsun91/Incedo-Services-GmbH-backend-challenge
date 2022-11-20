const express = require("express");
const router = require("./router");
const app = express();
const port = 8000;

app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "./index.html");
});
app.use("/find", router);

app.listen(port, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${port} 🛡️
    ################################################`);
});
