const graph = {
  0: [1, 4],
  1: [2, 4],
  2: [2, 3],
  3: [],
  4: [3],
};

// 深度优先遍历
{
  const visited = new Set();
  const dfs = (n) => {
    console.log(n);
    visited.add(n); // 访问过添加记录
    graph[n].forEach((c) => {
      if (!visited.has(c)) {
        // 判断是否访问呢过
        dfs(c);
      }
    });
  };
}

// 广度优先遍历
{
  const visited = new Set();
  const dfs = (n) => {
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
