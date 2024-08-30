//in-order traversal
const inOrderRecur = (root) => {
  if (!root) {
    return;
  }
  inOrderRecur(root.left);
  console.log(root.val);
  inOrderRecur(root.right);
};

const inOrder = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};

//pre-order traversal
const preOrderRecur = (root) => {
  if (!root) {
    return;
  }
  console.log(root);
  preOrderRecur(root.left);
  preOrderRecur(root.right);
};

// 如果不使用递归版本，可以借助栈先进后出的特性实现，先将根节点压入栈，再分别压入右节点和左节点，直到栈中没有元素，如下:
const preOrder = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    if (n.right) {
      stack.push(n.right);
    }
    if (n.left) {
      stack.push(n.left);
    }
  }
};

//post-order traversal
const postOrderRecur = (root) => {
  if (!root) {
    return;
  }
  postOrderRecur(root.left);
  postOrderRecur(root.right);
  console.log(n.val);
};

const postOrder = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  const outPut = [];
  while (stack.length) {
    const n = stack.pop();
    outPut.push(n.val);
    if (n.right) {
      stack.push(n.right);
    }
    if (n.left) {
      stack.push(n.left);
    }
  }
  while (outPut.length) {
    const n = outPut.pop();
    console.log(n.val);
  }
};

//level-order traversal
const levelOrder = (root) => {
  if (!root) {
    return [];
  }
  const queue = [[root, 0]];
  const res = [];
  while (queue.length) {
    const n = queue.shift();
    const [node, leval] = n;
    if (!res[leval]) {
      res[leval] = [node.val];
    } else {
      res[leval].push(node.val);
    }
    if (node.left) {
      queue.push([node.left, leval + 1]);
    }
    if (node.right) {
      queue.push([node.right, leval + 1]);
    }
  }
  return res;
};
