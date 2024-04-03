# Tabs
Tabs提供CAP style tab bar、tab button，與tab切換功能

##### 使用範例
```
const handleCurrentTabChange = (currentTab: number) => {
    //do something...
}

<Tabs
  tabs={['tab 1', 'tab 2']}
  onTabChange={handleCurrentTabChange}
/>
```

##### 說明
Tabs只有處理tab bar與tab切換功能，並沒有鎖定其他(如tab panel)的功能，這部分需要由使用者自行控制
Tabs可以與[TabPanels](TabPanel.md)搭配使用，或當作是條列式的button，而後藉由onTabChange控制行為
Tabs目前提供可關閉tab的功能，tab編號大於freezeTabs的tab會出現可以關閉的icon，使用者點擊後會觸發onTabClose event，後續由使用者自行控制後續行為

##### 輸入
* tabs: 顯示的頁簽，型態為string[] (required)
* onTabChange: 處理切換tab時所回傳的event，型態為(tab: number) => void，tab值為從0開始遞增的number (optional)
* onTabClose: 關閉tab時觸發event，型態為(tab: number) => void，tab值為從0開始遞增的number (optional)
* sx: 額外客製化Tabs style，型態為SxProps<Theme> (optional)
* tabSx: 額外客製化各tab style，型態為SxProps<Theme> (optional)
* currentTab: 控制目前顯示的tab，型態為number (optional)
* freezeTabs: 控制必定會顯示的tab編號，型態為number，當沒有設定時，所有tab都會為freeze (optional)