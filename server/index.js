const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const xml = require("libxmljs");
const fs = require("fs");

const app = express();

const option = {
    origin: "http://localhost:4200",
    method: "*",
    optionsSuccessStatus: 200
};

app.use(bodyParser.json());

let file;
fs.readFile("./czasopisma.xml", (err, data) => {
    if (err) {
        throw err;
    }
    const datatmp = data.toString().replace(/\r?\n|\r| {2,}/g, '');
    // console.log(datatmp)
    file = xml.parseXmlString(datatmp);
});

// app.use(cors(option));

app.options("/magazines/get/magazines", cors(option));

app.post("/magazines/get/magazines", cors(option), (req, res) => {
    let resp = [];
    const {name} = req.body;
    let year = (req.body.year === "all") ? "*" : `*[@rok=\'${req.body.year}\']`;
    let obj = file.find(`/czasopisma/${name}/${year}`);
    console.log(obj[0].text());
    for (let value of obj) {
        let tmp = {};
        if (value.attr("brak")) {
            tmp.nazwa =""
            tmp.numer =""
            tmp.wydawca =""
            tmp.format =""
            tmp.stron =""
            tmp.miniaturka =""
            tmp.plik =""
            tmp.skan =""
            tmp.przetworzenie =""
            tmp.podeslal =""
            tmp.brak = value.attr("brak").value();
        } else {
            tmp.nazwa = value.get("nazwa").text();
            tmp.numer = value.get("numer").text();
            tmp.wydawca = value.get("wydawca").text();
            tmp.format = value.get("format").text();
            tmp.stron = value.get("stron").text();
            tmp.miniaturka = `http://atarionline.pl/biblioteka/czasopisma/${name}/${value.get("miniaturka").text()}`;
            tmp.plik = `http://atarionline.pl/biblioteka/czasopisma/${name}/${value.get("plik").text()}`;
            tmp.skan = value.get("skan").text();
            tmp.przetworzenie = value.get("przetworzenie").text();
            tmp.podeslal = value.get("podeslal").text();
            tmp.brak = "";
        }

        resp.push(tmp)
    }

    res.json(resp);
});

app.options("/magazines/get/years", cors(option));

app.post("/magazines/get/years", cors(option), (req, res) => {
    let resp = [];
    console.log(req);
    const {name} = req.body;
    // let year = (req.body.year === "all") ? "*" : `*[@rok=${req.body.year}]`;
    let obj = file.get(`//lata/${name}`).text();
    resp = obj.split(",");
    res.json(resp);
});

app.get("/magazines/list", cors(option), (req, res) => {
    // console.log(req);
    let resp = []
    // console.log(file.get("//").text());
    let obj = file.find("//zmienne/*");
    console.log(obj);
    for (let objElement of obj) {
        let tmp = {}
        tmp.img = `http://www.atarionline.pl/biblioteka/czasopisma/img/${objElement.get("src").text()}`
        tmp.name = objElement.get("klik").text();
        resp.push(tmp)
    }
    resp = resp.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    res.json(resp)
});

const port = 9000;



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
