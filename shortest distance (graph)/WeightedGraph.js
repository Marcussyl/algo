// weighted adjacency list
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ vertex: vertex2, weight: weight });
    this.adjacencyList[vertex2].push({ vertex: vertex1, weight: weight }); // For undirected graph
  }
}

module.export = {
  WeightedGraph,
};
