# Export Excel
excel.js提供了excel (xlsx) format IO的功能，在CapMui裡主要根據excel.js的定義將grid內容轉換為xlsx style format，讓後續開發可以在最簡單的條件下就能完成excel format filling的功能

Excel binary完成後，需要額外透過file-saver將excel binary從記憶體匯出為下載檔案，讓使用者自己決定下載資料夾

```
import * as Excel from 'exceljs'
import { saveAs } from 'file-saver'

const gridRef = useRef<GridRef>(null)

const exportExcel = () => {
    let workbook = new Excel.Workbook()
    const sheet = workbook.addWorksheet('sheet')
    gridRef.current?.fillExcelSheet(sheet)
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
        saveAs(blob, `capmui.xlsx`, { autoBom: true })
    })
}

<Grid
    ref={gridRef}
    ...
/>
```

