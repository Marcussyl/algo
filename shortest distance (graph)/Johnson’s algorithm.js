// source: https://www.geeksforgeeks.org/johnsons-algorithm/

// Introduction:
// Johnson's algorithm is a shortest path algorithm that can handle graphs with negative edge weights.
// It is an improvement over Dijkstra's algorithm and can be used to find the shortest paths between all pairs of vertices in a graph.

// Time Complexity: The main steps in the algorithm are Bellman-Ford Algorithm called once and Dijkstra called V times. Time complexity of Bellman Ford is O(VE) and time complexity of Dijkstra is O(VLogV). So overall time complexity is O(V2log V + VE). 
// The time complexity of Johnson’s algorithm becomes the same as Floyd Warshall’s Algorithm (https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/?ref=lbp)
// when the graph is complete (For a complete graph E = O(V2). But for sparse graphs, the algorithm performs much better than Floyd Warshall’s Algorithm( https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/?ref=lbp ). 
// Auxiliary Space: O(V2)

const INF = Number.MAX_VALUE;

// Function to find the vertex with minimum distance from the source
function minDistance(dist, visited) {
    let min = INF;
    let minIndex = -1;

    for (let v = 0; v < dist.length; v++) {
        if (!visited[v] && dist[v] < min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

// Function to perform Dijkstra's algorithm on the modified graph
function dijkstraAlgorithm(graph, alteredGraph, source) {
    const V = graph.length;
    const dist = Array(V).fill(INF);
    const visited = Array(V).fill(false);

    dist[source] = 0;

    for (let count = 0; count < V - 1; count++) {
        const u = minDistance(dist, visited);
        visited[u] = true;

        for (let v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + alteredGraph[u][v] < dist[v]) {
                dist[v] = dist[u] + alteredGraph[u][v];
            }
        }
    }

    console.log(`Shortest Distance from vertex ${source}:`);
    for (let i = 0; i < V; i++) {
        console.log(`Vertex ${i}: ${dist[i] === INF ? "INF" : dist[i]}`);
    }
}

// Function to perform Bellman-Ford algorithm to calculate shortest distances
function bellmanFordAlgorithm(edges, V) {
    const dist = Array(V + 1).fill(INF);
    dist[V] = 0;

    const edgesWithExtra = edges.slice();
    for (let i = 0; i < V; i++) {
        edgesWithExtra.push([V, i, 0]);
    }

    for (let i = 0; i < V; i++) {
        for (const [src, dest, weight] of edgesWithExtra) {
            if (dist[src] !== INF && dist[src] + weight < dist[dest]) {
                dist[dest] = dist[src] + weight;
            }
        }
    }

    return dist.slice(0, V);
}

// Function to implement Johnson's Algorithm
function johnsonAlgorithm(graph) {
    const V = graph.length;
    const edges = [];

    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (graph[i][j] !== 0) {
                edges.push([i, j, graph[i][j]]);
            }
        }
    }

    const alteredWeights = bellmanFordAlgorithm(edges, V);
    const alteredGraph = Array.from({ length: V }, () => Array(V).fill(0));

    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (graph[i][j] !== 0) {
                alteredGraph[i][j] = graph[i][j] + alteredWeights[i] - alteredWeights[j];
            }
        }
    }

    console.log("Modified Graph:");
    alteredGraph.forEach(row => {
        console.log(row.join(' '));
    });

    for (let source = 0; source < V; source++) {
        console.log(`\nShortest Distance with vertex ${source} as the source:`);
        dijkstraAlgorithm(graph, alteredGraph, source);
    }
}

// Driver Code
const graph = [
    [0, -5, 2, 3],
    [0, 0, 4, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0]
];

johnsonAlgorithm(graph);