export async function main(ns) {
    const knownServers = new Set();
    const newServers = new Set();
    newServers.add("home");

    while (newServers.size > 0) {
        const server = newServers.values().next().value;
        newServers.delete(server);
        const neighbors = ns.scan(server);
        for (const neighbor of neighbors) {
            if (!knownServers.has(neighbor)) {
                knownServers.add(neighbor);
                newServers.add(neighbor);
            }
        }
    }

    ns.tprint([...knownServers]);
}