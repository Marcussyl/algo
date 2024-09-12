// source: https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/
// YouTube: https://www.youtube.com/watch?v=4OQeCuLYj-4 

// Introduction:
// The Floyd-Warshall algorithm, named after its creators Robert Floyd and Stephen Warshall, is a fundamental algorithm in computer science and graph theory. 
// It is used to find the shortest paths between all pairs of nodes in a weighted graph. 
// This algorithm is highly efficient and can handle graphs with both positive and negative edge weights, making it a versatile tool for solving a wide range of network and connectivity problems.

// Algorithm:
// The Floyd-Warshall algorithm works by iteratively updating a matrix that stores the shortest distances between all pairs of nodes. 
// Here's a step-by-step breakdown of the algorithm:
// 1. Initialize a matrix D with the weight of each edge if it exists, and infinity otherwise. If there is no edge between two nodes, the value in the matrix should be set to infinity.
// 2. For each pair of nodes (i, j), check if the distance through an intermediate node k is shorter than the current known distance. If so, update the matrix with this shorter distance.
// 3. Repeat this process for all possible intermediate nodes k.
// 4. After considering all intermediate nodes, the matrix D will contain the shortest distances between all pairs of nodes.

// Time Complexity: O(V3), where V is the number of vertices in the graph and we run three nested loops each of size V
// Auxiliary Space: O(V2), to create a 2-D matrix in order to store the shortest distance for each pair of nodes.

// Note: 
// 1. The order of considering intermediate vertices doesn't matter. If there's a shorter path using multiple intermediates, we'll find it regardless of the order we process them in.
// 2. Dynamic Programming is used to store the shortest path information in a matrix.

// A JavaScript program for Floyd Warshall All
      // Pairs Shortest Path algorithm.

      var INF = 99999;
      class AllPairShortestPath {
        constructor() {
          this.V = 4;
        }

        floydWarshall(graph) {
          var dist = Array.from(Array(this.V), () => new Array(this.V).fill(0));
          var i, j, k;

          // Initialize the solution matrix
          // same as input graph matrix
          // Or we can say the initial
          // values of shortest distances
          // are based on shortest paths
          // considering no intermediate
          // vertex
          for (i = 0; i < this.V; i++) {
            for (j = 0; j < this.V; j++) {
              dist[i][j] = graph[i][j];
            }
          }

          /* Add all vertices one by one to
        the set of intermediate vertices.
        ---> Before start of a iteration,
            we have shortest distances
            between all pairs of vertices
            such that the shortest distances
            consider only the vertices in
            set {0, 1, 2, .. k-1} as
            intermediate vertices.
        ---> After the end of a iteration,
            vertex no. k is added
            to the set of intermediate
            vertices and the set
            becomes {0, 1, 2, .. k} */
          for (k = 0; k < this.V; k++) {
            // Pick all vertices as source
            // one by one
            for (i = 0; i < this.V; i++) {
              // Pick all vertices as destination
              // for the above picked source
              for (j = 0; j < this.V; j++) {
                // If vertex k is on the shortest
                // path from i to j, then update
                // the value of dist[i][j]
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                  dist[i][j] = dist[i][k] + dist[k][j];
                }
              }
            }
          }

          // Print the shortest distance matrix
          this.printSolution(dist);
        }

        printSolution(dist) {
          document.write(
            "Following matrix shows the shortest " +
              "distances between every pair of vertices<br>"
          );
          for (var i = 0; i < this.V; ++i) {
            for (var j = 0; j < this.V; ++j) {
              if (dist[i][j] == INF) {
                document.write("&emsp;INF ");
              } else {
                document.write("&emsp;&emsp;" + dist[i][j] + " ");
              }
            }

            document.write("<br>");
          }
        }
      }
      // Driver Code
      /* Let us create the following
        weighted graph
            10
        (0)------->(3)
        |         /|\
        5 |         |
        |         | 1
        \|/         |
        (1)------->(2)
            3             */
      var graph = [
        [0, 5, INF, 10],
        [INF, 0, 3, INF],
        [INF, INF, 0, 1],
        [INF, INF, INF, 0],
      ];

      var a = new AllPairShortestPath();

      // Print the solution
      a.floydWarshall(graph);
      
      // This code is contributed by rdtaank.
