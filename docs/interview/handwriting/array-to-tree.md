# 扁平数组转树形结构

## 方法1 使用 `map` + `filter`

如果要将扁平的数组转换为树结构而不使用 `for` 循环，可以使用 `map` 和 `filter` 结合递归的方式来实现。以下是一个示例代码：

```javascript
function buildTree(flatArray, parentId = null) {
  return flatArray
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: buildTree(flatArray, item.id)
    }));
}

const flatData = [{
    id: 1,
    name: 'Node 1',
    parentId: null
  },
  {
    id: 2,
    name: 'Node 1.1',
    parentId: 1
  },
  {
    id: 3,
    name: 'Node 1.2',
    parentId: 1
  },
  {
    id: 4,
    name: 'Node 2',
    parentId: null
  },
  {
    id: 5,
    name: 'Node 2.1',
    parentId: 4
  },
  {
    id: 6,
    name: 'Node 2.2',
    parentId: 4
  },
];

const treeData = buildTree(flatData);
console.log(JSON.stringify(treeData, null, 2));
```

在这个代码中， `filter` 用来筛选出当前父节点的子节点，然后 `map` 用来对筛选出的子节点递归调用 `buildTree` 函数，以创建树结构。这种方式避免了显式的 `for` 循环，而是使用了函数式编程的方法来处理数组。

注意：虽然这个方法更加函数式，但可能会在性能方面存在一些问题，特别是在处理大型数据集时。

## 方法2 - 使用for 循环

将扁平的数组转换为树结构是一个常见的操作，可以使用递归的方法来实现。下面是一个示例代码，用于将扁平的数组转换为树结构：

假设有如下的扁平数组表示树结构：

```javascript
const flatData = [{
    id: 1,
    name: 'Node 1',
    parentId: null
  },
  {
    id: 2,
    name: 'Node 1.1',
    parentId: 1
  },
  {
    id: 3,
    name: 'Node 1.2',
    parentId: 1
  },
  {
    id: 4,
    name: 'Node 2',
    parentId: null
  },
  {
    id: 5,
    name: 'Node 2.1',
    parentId: 4
  },
  {
    id: 6,
    name: 'Node 2.2',
    parentId: 4
  },
];
```

以下是将上述扁平数组转换为树结构的 JavaScript 代码：

```javascript
function buildTree(flatArray, parentId = null) {
  const tree = [];

  for (const item of flatArray) {
    if (item.parentId === parentId) {
      const children = buildTree(flatArray, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }

  return tree;
}

const treeData = buildTree(flatData);
console.log(JSON.stringify(treeData, null, 2));
```

代码解释：

1. `buildTree` 函数是核心递归函数，它接受一个扁平数组和一个父节点的 `parentId`。在每次调用时，它会在扁平数组中查找与给定 `parentId` 匹配的项，然后递归调用自身，将找到的子节点传递给新的调用。如果一个节点有子节点，它会在 `children` 属性中存储这些子节点。

2. 循环遍历扁平数组，对于每个项，检查其 `parentId` 是否与当前父节点匹配。如果匹配，递归调用 `buildTree` 来查找子节点。

3. 最终，调用 `buildTree(flatData)` 将扁平数组转换为树结构，并通过 `JSON.stringify` 打印到控制台。

这段代码将会把扁平数组转换成如下的树结构：

```json
[
  {
    "id": 1,
    "name": "Node 1",
    "parentId": null,
    "children": [
      {
        "id": 2,
        "name": "Node 1.1",
        "parentId": 1
      },
      {
        "id": 3,
        "name": "Node 1.2",
        "parentId": 1
      }
    ]
  },
  {
    "id": 4,
    "name": "Node 2",
    "parentId": null,
    "children": [
      {
        "id": 5,
        "name": "Node 2.1",
        "parentId": 4
      },
      {
        "id": 6,
        "name": "Node 2.2",
        "parentId": 4
      }
    ]
  }
]
```
