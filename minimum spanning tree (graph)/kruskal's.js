// source: https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/

// Introduction:
// Kruskal's algorithm is a greedy algorithm used to find the minimum spanning tree
// of a weighted, undirected graph. A minimum spanning tree is a subset of edges
// that connects all vertices in the graph with the minimum total edge weight.
// The algorithm works by sorting all edges by weight and then iteratively adding
// the smallest edge that doesn't create a cycle. This process continues until all
// vertices are connected, resulting in a minimum spanning tree.

// Time Complexity: O(E * logE) or O(E * logV)
// Sorting of edges takes O(E * logE) time.
// After sorting, we iterate through all edges and apply the find-union algorithm. The find and union operations can take at most O(logV) time.
// So overall complexity is O(E * logE + E * logV) time.
// The value of E can be at most O(V2), so O(logV) and O(logE) are the same. Therefore, the overall time complexity is O(E * logE) or O(E*logV)
// Auxiliary Space: O(V + E), where V is the number of vertices and E is the number of edges in the graph.

// JavaScript implementation of the krushkal's algorithm.

function makeSet(parent, rank, n) {
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    rank[i] = 0;
  }
}

function findParent(parent, component) {
  if (parent[component] == component) return component;

  return (parent[component] = findParent(parent, parent[component]));
}

function unionSet(u, v, parent, rank, n) {
  //this function unions two set on the basis of rank
  //as shown below
  u = findParent(parent, u);
  v = findParent(parent, v);

  if (rank[u] < rank[v]) {
    parent[u] = v;
  } else if (rank[u] < rank[v]) {
    parent[v] = u;
  } else {
    parent[v] = u;
    rank[u]++; //since the rank increases if the ranks of two sets are same
  }
}

function kruskalAlgo(n, edge) {
  //First we sort the edge array in ascending order
  //so that we can access minimum distances/cost
  edge.sort((a, b) => {
    return a[2] - b[2];
  });
  //inbuilt quick sort function comes with stdlib.h
  //go to https://www.geeksforgeeks.org/comparator-function-of-qsort-in-c/
  //if there is any doubt regarding the function
  let parent = new Array(n);
  let rank = new Array(n);

  makeSet(parent, rank, n); //function to initialize parent[] and rank[]

  let minCost = 0; //to store the minimun cost

  document.write("Following are the edges in the constructed MST");
  for (let i = 0; i < n; i++) {
    let v1 = findParent(parent, edge[i][0]);
    let v2 = findParent(parent, edge[i][1]);
    let wt = edge[i][2];

    if (v1 != v2) {
      //if the parents are different that means they are in
      //different sets so union them
      unionSet(v1, v2, parent, rank, n);
      minCost += wt;
      document.write(edge[i][0] + " -- " + edge[i][1] + " == " + wt);
    }
  }

  document.write("Minimum Cost Spanning Tree:", minCost);
}

//Here 5 is the number of edges, can be asked from the user
//when making the graph through user input
//3 represents the no of index positions for storing u --> v(adjacent vertices)
//and its cost/distance;
let edge = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];

kruskalAlgo(5, edge);

// The code is contributed by Arushi Jindal.
