import ivm from "isolated-vm";
import {findEntryArgs} from "./args.js";

export async function runScript(userCode, scriptResult) {
    const isolate = new ivm.Isolate({
        memoryLimit: 64 // MB
    });

    const context = await isolate.createContext();
    const { global } = context;

    await global.set("globalThis", global.derefInto());
    await global.set("log", function(...args) {
        console.log("[SCRIPT]", ...args);
        scriptResult.stdout.push(args.map(String).join(" "));
    });



    const code = `
        "use strict";  
        
        globalThis.console = {
            log: (...args) => log(...args),
        };
        
        let entryName = "main";
        
        // USER CODE
        ${userCode}
        // END OF USER CODE
        
        let entry = globalThis[entryName];
        if (!entry) {
            throw new Error("Nie znaleziono funkcji do testu: " + entryName);
        }
        if (typeof entry !== "function") {
            throw new Error(entryName + " powinien byc funkcja");
        }
        
        globalThis.entryName = entryName;
        globalThis.__notacja_entry = entry;
    `;

    const script = await isolate.compileScript(code);

    await script.run(context, {
        timeout: 10 * 1000,
    });

    const entryName = await context.eval("globalThis.entryName");
    console.log("ENTRY NAME: ", entryName);
    const userDefinitionArgs = findEntryArgs(userCode, entryName);
    console.log("ARGS: ", userDefinitionArgs);

    const entry = await context.eval("globalThis.__notacja_entry", {
        result: { reference: true }
    });

    const SIZES = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
    for (const n of SIZES) {

        let args = [];
        for (let keyword of userDefinitionArgs) {
            if (keyword === "N") {
                args.push(n);
                continue;
            }
            if (keyword === "MEME") {
                args.push("67");
                continue;
            }
            // TODO: more keywords
            if (keyword === "ARRAY_INT") {
                args.push(Array.from({ length: n }, () =>
                    Math.floor(Math.random() * 1000)
                ));
                continue;
            }

            args.push(undefined);
        }
        let ret = entry(...args);

        const SAMPLE_COUNT = 5;
        let sum = 0;
        for (let i = 0; i < SAMPLE_COUNT; ++i) {
            const start = process.hrtime.bigint();
            entry(...args);
            const end = process.hrtime.bigint();
            const diffNs = end - start;

            sum += Number(diffNs);
        }




        scriptResult.timings.push({
            n,
            time: sum / SAMPLE_COUNT, // TODO: different avg
        });

        if (ret !== undefined)
            scriptResult.stdout.push(`Funkcja zwrocila: ${ret}`)
    }

    isolate.dispose();
}