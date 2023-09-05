## 在树结构中, 给定子节点 A, 获取根节点到 A 的完整路径

子节点可能是叶子结点/中间节点/根节点/不存在的节点

[CodeSandBox 在线运行示例](https://codesandbox.io/s/findvalueintree-779cof?file=/index.test.ts)

```ts
type TNode = { label: string; value: string };

interface ITreeNode extends TNode {
  children?: ITreeNode[];
}

// 辅助方法 类似 _.omit
const omit = (keyToOmit: string, { [keyToOmit]: _, ...omittedPropObj } = {}) =>
  omittedPropObj;

export const findValueInTree = (tree, value, pathStack = []) => {
  if (tree.value === value) return [...pathStack, omit("children", tree)];

  pathStack.push(omit("children", tree));

  for (const node of tree.children ?? []) {
    const result = findValueInTree(node, value, [...pathStack]);
    if (result?.length) return result;
  }
};

// 之前版本的方法已废弃
export const findValueInTree_OLD = (
  singleTree: ITreeNode,
  targetValue: string
) => {
  let result: TNode[] = []; //保存路径
  let isMatched = false; // 单次查找过程中是否匹配到

  function deepFinds(node: ITreeNode, targetValue: string) {
    result.push({ label: node.label, value: node.value });

    if (node.value === targetValue) {
      isMatched = true;
    } else if (
      node.children &&
      Array.isArray(node.children) &&
      node.children.length
    ) {
      for (let i = 0; i < node.children.length; i++) {
        let matchedFlag = deepFinds(node.children[i], targetValue);
        if (matchedFlag) {
          break;
        } else {
          result.pop(); // 没有找到就把添加的值删除
        }
      }
    }

    return isMatched;
  }

  if (deepFinds(singleTree, targetValue)) {
    return result;
  }
};
```

测试用例如下:

```ts
import { findValueInTree } from "./index";

let singleTree = {
  label: "A",
  value: "A",
  children: [
    {
      label: "A1",
      value: "A1",
      children: [
        {
          label: "A11",
          value: "A11",
        },
        {
          label: "A12",
          value: "A12",
        },
      ],
    },
    {
      label: "A2",
      value: "A2",
      children: [
        {
          label: "A21",
          value: "A21",
        },
        {
          label: "A22",
          value: "A22",
        },
      ],
    },
    {
      label: "A3",
      value: "A3",
      children: [
        {
          label: "A31",
          value: "A31",
        },
        {
          label: "A32",
          value: "A32",
          children: [
            {
              label: "A321",
              value: "A321",
            },
          ],
        },
      ],
    },
  ],
};

describe("findValueInTree", () => {
  it("叶子节点", () => {
    const data = findValueInTree(singleTree, "A321");

    expect(data).toStrictEqual([
      { label: "A", value: "A" },
      { label: "A3", value: "A3" },
      { label: "A32", value: "A32" },
      { label: "A321", value: "A321" },
    ]);
  });

  it("中间节点", () => {
    const data = findValueInTree(singleTree, "A32");

    expect(data).toStrictEqual([
      { label: "A", value: "A" },
      { label: "A3", value: "A3" },
      { label: "A32", value: "A32" },
    ]);
  });

  it("根节点", () => {
    const data = findValueInTree(singleTree, "A");

    expect(data).toStrictEqual([{ label: "A", value: "A" }]);
  });

  it("不存在的节点", () => {
    const data = findValueInTree(singleTree, "ABCDEFG");

    expect(data).toStrictEqual(undefined);
  });
});
```
