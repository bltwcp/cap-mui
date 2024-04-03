# Grid
table資料工具

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

<Grid
  columns={columns}
  rows={rows}
/>
```

##### 說明
Grid是基於[react table v7](https://react-table-v7.tanstack.com/)並整合[react window](https://react-window.vercel.app/)撰寫的表格工具
內部額外有整合[excel.js](https://github.com/exceljs/exceljs)提供快速export excel的功能

##### 輸入
* ref: react ref，主要提供fillExcelSheet, hideColumns, showColumns三個function (optional)
* columns: table的columns定義，型態為any[] (optional)
* rows: table內的資料，型態為any[] (optional)
* index: 顯示index (column index為A,B,C，row index為1,2,3)，型態為boolean，預設為false (optional)
* freezeRows: row頂置行數，型態為number，預設為0 (optional)
* hierarchyColumns: 用於設定tree struct的column，型態為string[]，可以設定多個column具有hierarchy階層顯示的功能，預設為[] (optional)
* emptyDisplay: 當沒有資料輸入時，會顯示的內容，型態為function或string，預設為"empty" (optional)
* onHeaderClick: 處理header cell click時的行為，型態為(field: string) => void，field為columns內設定的id (optional)
* onCellClick: 處理table cell click時的行為，型態為(field: string, row: any, value: any) => void，field為column id，row為該筆資料，value為row.field的資料 (optional)
* cellNameFn: 客製cell的class name的function，可以搭配sx設定調整cell style，型態為(field: string, row: any, value: any) => string (optional)
* sx: 客製cell style的style設定，型態為SxProps<Theme>，可以透過gridStyleFactory()將基本style擴展後提供完整得style行為 (optional)
* rowHeightEstimateFn: 客製row height估計function，型態為(index: number, row: any, columnIDs?: string[]) => number，回傳單位為px (optional)
* bottom: grid實作透過一個底置元件為依據，填滿整個視窗，bottom參數是用來控制底部留白的空間，型態為number，預設為0 (optional)
* height: 指定gird高度，型態為number，單位為px (optional)
* progressSx: 額外客製化progress circle style，型態為SxProps<Theme> (optional)

##### ref function
* fillExcelSheet: 
[Export Excel](../Others/ExportExcel.md)
* hideColumns: 用於外部控制隱藏欄位，型態為(cols: string[]) => void，輸入為col id array
* showColumns: 用於外部控制顯示欄位，型態為(cols: string[]) => void，輸入為col id array

## 輸入參數說明
##### Grid columns
基於React table Column的定義，並增加部分功能，目前columns定義包括
  - Header: column header顯示的內容 (optional)
  - id: 在cols內必須為唯一值，當沒有指定時會指派為accessor值，因此當accessor為function時必須要提供 (optional)
  - **accessor**: 型態為string | function，當為string時，在cell rendering時會尋找row[accessor]內容並填入；為function時會以function定義產生JSX.Element (required)
  - columns: 型態為Column[], 內容為子column array (optional)
  - width: 定義欄寬，型態為number，預設為150，如果要以最大cell寬度設置，可以使用gridMaxWidth(Header, field, rows, font)計算 (optional)
  - sticky: 定義col固定位置，可以為'left'或'right' (optional)
  - resizable: 允許使用者動態變更欄寬，預設為false (optional)
  - sortable: 提供sort功能 (optional)
  - hidden: 預設隱藏欄位 (optional)
  - headerStyle: 額外定義header cell style (optional)
  - headerContent: column header 新增內部元件
  - numFmt: exceljs 資料格式化的格式
  - useTotal: 允許計算欄位總合
  - index: 用於區間滾動計算一個區間的距離
  
  其他有提供的column功能，可以參考react table column定義

##### Grid rows
rows主要提供欄位所需要的資料，預設grid會依序將rows內的資料填入grid，而grid有提供的排序功能只會做最基本的值排序排序。對於hierarchy資料顯示，使用者需要自己控制rows內容順序
  - id: 用於提供row唯一值的資訊，型態為number(正整數) (required)
  - parentId: 用於指定該筆資料的hierarchy parent關係，當有指定狀態，row資料在render時會受到hierarchy設定影響，型態為number (optional)
  - expand: 當為hierarchy資料，且該row為branch時，可以設定預設是否展開子項目，型態為boolean (optional)
  - [data fileds] column內定義用來顯示grid資料，如文字型態的accessor、與function accessor內會使用到的field，都可以在這邊作定義。當找不到定義，react table會當undefined，cell在render時不會把值填入
  - __*: 保留field，內部用於計算用，避免使用

##### cellNameFn
React table demo是透過指派每個cell的class搭配grid設定的style來客製化每個cell的format style。grid component提供cellNameFn與sx來達成這個目的

cellNameFn的輸入參數有三個，field、row與value，基本上value傳入值是react table處理後的輸入值，不會是原始資料row[field]，建議直接透過field與row來做計算，組出特定的cell class name

row值也與grid的輸入rows不完全相同，也是react table前處理過的物件，原始資料會在row.original內

cellNameFn回傳值，只需傳回cell class name，該name會被指派到cell內，讓瀏覽器與excel export套用格式

範例
```
const cellNameFn = (field: string, row: any, value: any) => {
  if (field === 'Name')
    return 'NameField'
  if (field === 'rate') {
    const rate = row['rate'] as number
    if (rate > 0.5)
      return 'GoodRating'
    if (rate > 0.25)
      return 'NormalRating'
    return 'BadRating'
  }
  return ''
}
```

##### sx
grid各個cell在render時會一cellNameFn擁有自己的classname，讓瀏覽器自動套用sx定義的style

指定grid sx，建議將基本style型態定義完後，透過gridStyleFactory()自動產生完整的style，gridStyleFactory()額外定義的style主要是mouse over與row select的style
```
const basicSX = {
  '& .NameField': { backgroundColor: '#D9E1F2', fontWeight: 'bold' },
  '& .GoodRating': { backgroundColor: 'green', },
  '& .NormalRating': {},
  '& .BadRating': { backgroundColor: 'red', },
}
const sx = gridStyleFactory(basicSX)
```

## excel exporter
主要是透過Grid提供的fillExcelSheet()將grid內部的資料匯出至excel.js的sheet component上，在匯出的同時，會將grid繪製時的style填入excel儲存格內。

由於css style的範圍很廣，目前grid內的excel export有支援的style包括
- backgroundColor
- color
- textAlign
- fontStyle = italic
- fontWeight = bold

column.width的設定，會以width * 0.13設定到sheet column width上