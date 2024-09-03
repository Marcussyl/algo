const WeightedGraph = require("../WeightedGraph");

class DijstrasAlgo extends WeightedGraph {
  djikstraAlgorithm(startNode) {
    let distances = {};

    let prev = {}; //An object to keep track of the previous node for each node, which helps reconstruct the shortest path later.
    let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

    // Set distances to all nodes to be infinite except startNode
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach((node) => {
      if (node !== startNode) distances[node] = Infinity;
      prev[node] = null;
    });

    while (!pq.isEmpty()) {
      let minNode = pq.dequeue();
      let currNode = minNode.data;
      let weight = minNode.priority;
      this.edges[currNode].forEach((neighbor) => {
        let alt = distances[currNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = currNode;
          pq.enqueue(neighbor.node, distances[neighbor.node]);
        }
      });
    }
    return distances;
  }
}

// ==================================================
// for testing
let g = new DijstrasAlgo();
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");
g.addNode("F");
g.addNode("G");

g.addDirectedEdge("A", "C", 100);
g.addDirectedEdge("A", "B", 3);
g.addDirectedEdge("A", "D", 4);
g.addDirectedEdge("D", "C", 3);
g.addDirectedEdge("D", "E", 8);
g.addDirectedEdge("E", "F", 10);
g.addDirectedEdge("B", "G", 9);
g.addDirectedEdge("E", "G", 50);

console.log(g.djikstraAlgorithm("A"));
