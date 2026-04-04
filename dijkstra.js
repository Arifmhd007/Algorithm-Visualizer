export function dijkstra(graph, start) {
    const dist = {};
    const visited = new Set();

    for (let node in graph) dist[node] = Infinity;
    dist[start] = 0;

    while (true) {
        let closest = null;

        for (let node in dist) {
            if (!visited.has(node)) {
                if (closest === null || dist[node] < dist[closest]) {
                    closest = node;
                }
            }
        }

        if (closest === null) break;
        visited.add(closest);

        for (let neighbor in graph[closest]) {
            let newDist = dist[closest] + graph[closest][neighbor];
            if (newDist < dist[neighbor]) dist[neighbor] = newDist;
        }
    }

    return dist;
}