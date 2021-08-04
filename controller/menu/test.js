let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]
let tree = arr.reduce(
  (total, item, index, list) =>
    total.concat({
      ...item,
      children: list.filter(f => f.pid == item.id),
    }),
  []
)
console.log(tree)
