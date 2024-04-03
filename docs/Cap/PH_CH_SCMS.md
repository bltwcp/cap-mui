# PH CH SCMS Hierarchy Component
CAP 組資架構hierarchy components

## 說明
目前實作中，因hierarchy架構與現有PBSC API回傳資料相似度，P Hierarchy與C Hierarchy使用的是相同的控制程式碼，SCMS是幾乎相似但有其特殊性的程式碼。

在兩個實作中，相同的在其底層有利用useContext在儲存API回傳的所有項目作為cache，用於比對使用者輸入的項目。不同的部分在於SCMS項目較少，所有的hierarchy項目會在初始化時就會擷取並存放於useContext之內

P Hierarchy, C Hierarchy, SCMS Components 的組成分為兩部分：文字輸入與挑選視窗

#### 文字輸入
文字輸入部分是簡單的text input，當使用者輸入合法的字串後，會自動對應到hierarchy項目上，有對應到的項目可以從tooltip上或點入dialog內看到；各個項目是利用","隔開

#### 挑選視窗
挑選視窗基本上參考PBSC原始版本，並新增部分功能
- 排版上，上方為hierarchy用於挑選的項目，下方為已經挑選的項目，最下方為確認已選擇的項目，右上角為關閉視窗(不將選擇項目回傳表單中)，右上左側增加搜尋
- 點擊上方項目，會以該項目為中心，更新整個hierarchy dialog，如點擊PH Sub-Division的SD / KB項目，Type與Class與Item項目會更新，Category. Industry, Division類別不變，所以不會變動
- 點擊項目左方方框，即選擇該項目，則下方以選擇區會多出該項目
- dialog排版與項目字元長度關係，部分項目可能會被切割；因此每個項目都有做tooltip，只要滑鼠放置一段時間就會出現
- 已選擇的項目，可以點擊下方該項目，上方供選擇的區塊會自動以該項目為中心顯示
- 點選以選擇項目左方的勾選方框，會取消選擇該項目
- 搜尋欄位，因目前API並沒有提供模糊搜尋功能，必須完整項目，有搜尋到會談跳出該項目，點擊選擇

## CAP Hierarchies
#### P Hierarhcy
P Hierarchy是產品的分類樹狀結構，總共有7層，將所有有形與無形產品歸類的架構，最終產品與服務都是Item (第7層)，而1~6層都是分類 (branch)

P Hierarchy的各個項目都有獨立的UID (注意：發生過UID為null事件)，P Hierarchy API目前並沒有回傳已經停用的項目，所以目前PH Dialog並沒有提供"顯示停用"的功能

#### C Hierarchy
C Hierarchy是公司各個單位(行政單位、工廠、倉庫等)的結構，總共有7層

與P Hierarchy相同的，各個項目都有獨立的UID，另外，每個項目也有其代表的location ID，用於後續資料搜尋使用

#### SCMS
SCMS的結構與P Hierarchy, C Hierarchy有一定的差別，SCMS最上層為SCMS Type，目前共有4類，每一類下的項目分為6類 (SC1 ~ SC6)，並非樹狀結構的關係

每個SCMS項目代表的是一系列的location ID，用於後續資料搜尋使用。

## 搜尋
PH 與 CH因為是樹狀結構關係，帶入搜尋條件需要預先過濾，移除有選擇子項目的母項目，如P Hiearchy中，若搜尋條件為
```
  PH = Merchandise,Free Weights,Yoga,SD / KB
```
從最底層的項目往上
1. SD / KB: Sub-division層，列入搜尋項目
2. Yoga: Division層，因Yoga下並沒有任何子項目被選擇，所以列入搜尋項目
3. Free Weights: Division層，因SD / KB屬於Free Weights的子項目，忽略
4. Merchandise: Category層，因Yoga與Free Weights都是Merchandise的子項目，忽略
因此最後PH的搜尋條件是item 屬於 'Yoga' || 'SD / KB'，詳細的過濾相關資料方式則依每個程式實作而異

CH 與 SCMS最後都是對應到location ID，在搜尋上，CH與SCMS是AND關係，即搜尋資料必須同時滿足CH與SCMS所代表的location ID
