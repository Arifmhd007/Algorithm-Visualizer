export function dfs(graph, start) {
    let visited = new Set();
    let result = [];

    function helper(node) {
        if (visited.has(node)) return;
        visited.add(node);
        result.push(node);
        graph[node].forEach(helper);
    }

    helper(start);
    return result;
}