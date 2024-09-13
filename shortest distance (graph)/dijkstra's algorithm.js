class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(item, priority) {
    this.elements.push({ item, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  } 
}

class Graph {
  constructor() {
    this.edges = {}; // Adjacency list
    this.nodes = []; // List of nodes
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.edges[node1].push({ node: node2, weight });
    this.edges[node2].push({ node: node1, weight }); // For undirected graph
  }

  dijkstraAlgorithm(startNode) {
    let distances = {};
    let prev = {};
    let pq = new PriorityQueue();

    // Set distances to all nodes to be infinite except startNode
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach((node) => {
      if (node !== startNode) distances[node] = Infinity;
      prev[node] = null;
    });

    while (!pq.isEmpty()) {
      let minNode = pq.dequeue();
      let currNode = minNode.item; // Use 'item' instead of 'data'
      this.edges[currNode].forEach((neighbor) => {
        let alt = distances[currNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = currNode;
          pq.enqueue(neighbor.node, distances[neighbor.node]);
        }
      });
    }

    return { distances, previous: prev };
  }

  // Method to reconstruct the shortest path
  getShortestPath(startNode, endNode) {
    const { previous } = this.dijkstraAlgorithm(startNode);
    let path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return path.length ? path : null; // Return the path or null if no path exists
  }
}

// ==================================================
// for testing
let g = new Graph();
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");
g.addNode("F");
g.addNode("G");

g.addEdge("A", "C", 100);
g.addEdge("A", "B", 3);
g.addEdge("A", "D", 4);
g.addEdge("D", "C", 3);
g.addEdge("D", "E", 8);
g.addEdge("E", "F", 10);
g.addEdge("B", "G", 9);
g.addEdge("E", "G", 50);

console.log(g.dijkstraAlgorithm("A"));
