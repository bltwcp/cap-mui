# MemorizedGrid
Grid的memo版，用於減少Grid的over re-rendering問題
由於Grid已經有使用react-window來限制rendering的量，不一定需要再透過memorized的方式進一步控制rendering

##### 使用範例
```
const columns = [
  { Header: 'Name', accessor: 'name', },
  { Header: 'Employee ID', accessor: 'employeeID', },
  { Header: 'Phone', accessor: 'phone', },
]
const rows = [
  { id: 1, name: 'Kevin', employeeID: '5566', phone: '@kevin.twcp', },
]

<MemorizedGrid
  columns={columns}
  rows={rows}
/>
```

##### 說明
MemorizedGrid透過JSON.stringify與內部的簡易deepCompare function檢核所有Grid的參數是否有異動，並以此為依據來減少更新Grid輸入，做到減少Grid re-rendering可能帶來的效能問題
這邊要注意，Grid的輸入值中有部分為函式，使用者需要自行透過[useCallback](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecallback)或其他方式控制其記憶體位置不會變動

##### 輸入
MemorizedGrid的輸入與[Grid](grid.md)完全相同