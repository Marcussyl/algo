const graph = {
  0: [1, 4],
  1: [2, 4],
  2: [2, 3],
  3: [],
  4: [3],
};

// depth first search (recursive)
// step 1: in each visiting node, visit all its unvisited connected nodes
// step 2: for each unvisited connected node, repeat step 1 untill the visiting node has no unvisited connected node
{
  const visited = new Set();
  const dfs = (n) => {
    console.log(n);
    visited.add(n); // 访问过添加记录
    graph[n].forEach((c) => {
      if (!visited.has(c)) {
        // 判断是否访问过
        dfs(c);
      }
    });
  };
}

// breadth first search
// in each loop, access the "first" node in the queue and add all its unvisited connected nodes in the queue for visiting later
{
  const visited = new Set();
  const bfs = (n) => {
    visited.add(n);
    const q = [n];
    while (q.length) {
      const n = q.shift();
      console.log(n);
      graph[n].forEach((c) => {
        if (!visited.has(c)) {
          q.push(c);
          visited.add(c);
        }
      });
    }
  };
}
