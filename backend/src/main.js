import express from "express";
import cors from "cors";
import {runScript} from "./runner.js";

const server = express();
const port = 2025;

server.use(express.json());
server.use(cors());

server.post("/analiza", async (req, res) => {

    if (!req.body) {
        // There is no body.
        res.status(400).send({
            "message": "body is required"
        });
        return;
    }

    if (!req.body["code"]) {
        res.status(400).send({
            "message": "code is required"
        });
        return;
    }

    const { code } = req.body;

    let scriptResult = {
        stdout: [],
        timings: [],
    };

    try {
        await runScript(code, scriptResult);
    } catch (error) {
        scriptResult.stdout.push(`ERROR: ${error.message}`);

        res.send({
            "message": `Code Error: ${error.message}`,
            "logs": scriptResult.stdout,
        });
        return;
    }

    res.send({
        "message": "ok",
        "logs": scriptResult.stdout,
        "timings": scriptResult.timings,
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
