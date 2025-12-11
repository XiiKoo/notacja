export function findEntryArgs(userCode, entryName) {
    // function main(...) { ... }
    // const main = (...) => { ... }
    // let main = (...) => { ... }
    // var main = (...) => { ... }

    const fnRegex = new RegExp(`function\\s+${entryName}s*\\(([^)]*)\\)`, "m");

    let match = userCode.match(fnRegex);
    if (!match) {
        // try different regex.
        console.log("no match");
        return [];
    }

    const args = match[1];
    if (!args) return [];
    return args
        .split(",")
        .map(x => x.trim().toUpperCase());
}

