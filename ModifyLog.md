# v1 版本說明:

-   ### 新增 headerContent 屬性

    在 columns 新增 headerContent 屬性，可在 header 新增內部元件

    ```typescript
      // utils.tsx
      indexingColumns 調整 headerContent 在索引中隱藏

      // Grid.tsx
      {column.headerContent && column.headerContent()}
    ```

-   ### 初始化卷軸位置

    ```typescript
    // Grid.tsx
    useEffect(() => {
        // 確保初始滾動位置正確
        handleScroll()
    }, [handleScroll, tbodyRef.current])
    ```

-   ### 排序調整

    點擊 header 時再顯示箭頭，並且可透過點擊 header 或點擊箭頭切換排序

    ```typescript
    // Grid.tsx
    const handleHeaderClick = (column: any) => {
        // 新增切換排序邏輯
    }

    // utils.tsx
    export const sorter = (column: any) => {
        // 有排序狀態時再顯示箭頭
        // onClick 新增 stopPropagation 阻止冒泡事件
    }
    ```

-   ### exceljs 資料格式化設定、匯出可見的欄位資料

    將 fillExcelSheetImp 的 allColumns 過濾出可見的欄位，以免資料錯位
    在 columns 新增 numFmt 屬性，並在 fillExcelSheetImp 進行設定

    ```typescript
    // utils.tsx
    const isVisibleColumns = allColumns.filter((column) => column.isVisible)
    isVisibleColumns.forEach((column: any, colIndex) => {
        sheetColumn.numFmt = column.numFmt
    })
    if (column.numFmt) {
        // 將資料轉換為數字型別，以符合 exceljs 格式化要求
    }
    ```

-   ### 新增 clearable 功能

    在輸入框和下拉式選單新增清除按鈕

    ```typescript
      // TextInput.tsx && Select.tsx
      在 endAdornment 新增清除按鈕

      // SCMSComponent.tsx && HierarchyBaseComponent.tsx && SearchOption.tsx
      在 TextInput 和 Select 開啟 clearable 功能

      // mui.tsx
      // 新增清除按鈕樣式
      export const StyledMuiSelect = styled(MuiSelect<string>)`
        & button.MuiButton-root[role="close"] { /* clear X button */
            position: absolute;
            right: 10px;
            visibility: hidden;
        }
        &:hover {
            & .MuiButton-root[role="close"] {
                visibility: visible;
            }
        }
      `
    ```

-   ### DateRangePicker 新增 comparison 參數

    在 comparison 時，From 的最小時間單位不能大於 To

    ```typescript
    // DateRangePicker.tsx
    ```

-   ### 新增標記行列

    在需要被標記的 row 新增 marked 屬性 (boolean)

    ```typescript
    // Grid.tsx
    export const gridStyleFactory = () => {
        const hoverMarkedBGColor = darken(markedBGColor, 0.05)
        let extendSX = {
            '& .marked': { backgroundColor: markedBGColor },
            '& .marked.hovered': { backgroundColor: hoverMarkedBGColor },
        }
        return extendSX
    }

    // GridRow.tsx
    marked={props.row.original['marked' as keyof typeof props.row.original]}

    // GridCell.tsx
    const classNames = () => {
        const marked = props.marked ? 'marked' : ''
        return `${propsCellName} ${marked} ${selected} ${hovered} td`.replaceAll('  ', ' ').trim()
    }
    ```

-   ### detail 選取功能狀態分離

    在沒有使用 ref 的情況下可改用 detailKey 來避免狀態共享

    ```typescript
    //Grid.tsx
    調整 selectedIDs 的處理方式 (型別和方法)

    // GridRow.tsx
    handleSelect 新增 props.rowKey 參數
    ```

-   ### 計算欄位總和

    在需要被計算的 column 新增 useTotal 屬性

    ```typescript
    //Grid.tsx
    <GridTotalPanel />
    ```

-   ### 限制 tab 的字數

    ```
    Tab.tsx 新增 MaxTabLength 和 ToolTip
    ```

-   ### 區間滾動

    ```typescript
    //Grid.tsx
    <GridScroll />

    在需要區間滾動的 columns 新增 index 屬性，用來計算一個區間的距離
    ```

-   ### detail 的 VariableSizeList 需重新計算高度

    ```typescript
    //Grid.tsx
    const listRef = useRef<VariableSizeList>(null)
    if (listRef?.current) {
        listRef.current.resetAfterIndex(0)
    }
    ref = { listRef }
    ```

-   ### 欄位索引高度調整
