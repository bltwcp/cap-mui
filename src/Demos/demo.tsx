import { useState, useRef, useCallback, memo, } from 'react'
import { Typography, } from '@mui/material'
import * as Excel from 'exceljs'
import { saveAs } from 'file-saver'

import {
    Button, ExcelButton,
    Report, TabPanels, //LoadingTheme,
    Bar, Bars, Tabs,
    Grid, GridRef, gridStyleFactory, gridMaxWidth,
    Checkbox, MultiSelect, DateRangePicker, DatePicker,
    TextInput, NumberValidator, Autocomplete
} from '../Components'
import {
    PaymentSelect, PortSelect, VendorAgentSelect, OrderTypeSelect, VendorSelect,
    BOLStageSelect, POStageSelect,
    PHierarchyComponent, CHierarchyComponent, SCMSComponent,
    SearchOption,
    DateFormat,
    VendorTypeSelect,
} from '../Cap'
import { StartSpan, /*InjectHeader,*/ } from '../Utils/tracer'

const rows = [
    {
        id: 1,
        expand: true,
        phierarchy: 'Merchandise',
        totalQty: 54818,
        poQty: 21288,
        poUnitCost: 'RMB 25.34\nUSD 5.31',
        poAMT: 'RMB 391120.31\nUSD 98765.04',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 2,
        parentId: 1,
        expand: true,
        phierarchy: 'SPORTING GOODS',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 3,
        parentId: 2,
        phierarchy: 'Free Weights',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 4,
        parentId: 3,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 5,
        parentId: 3,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 6,
        parentId: 0,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 7,
        parentId: 6,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    /*{
        id: 8,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 9,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 10,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 11,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 12,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 13,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 14,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 15,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 16,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 17,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 18,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 19,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 20,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 21,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 22,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 23,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 24,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 25,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 26,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 27,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 28,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 29,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },*/
]

const columns1 = [
    {
        Header: 'a',
        id: 'a',
        sticky: 'left',
    },
    {
        Header: 'b',
        id: 'b',
        width: 300,
    },
    {
        Header: 'c',
        id: 'c',
        width: 500,
    },
    {
        Header: 'd',
        id: 'd',
        width: 700,
    },
]

const columns2 = [
    {
        Header: ' ', // react table recommend use a space as freeze column group header
        columns: [ // column group
            {
                id: 'totalQty', // if accessor is a function, id is required
                Header: 'TOTAL QTY',
                accessor: (row: any) => (
                    <Typography
                        align='right'
                        sx={{paddingRight: '2px', fontSize: '13px', }}
                    >
                        {row['totalQty' as keyof typeof row]}
                    </Typography>
                ),
                width: 100,
                resizable: true,
                sortable: true,
            },
            {
                //id: 'phierarchy', // id is not necessary when accessor is a string
                Header: 'P Hierarchy', // display title
                accessor: 'phierarchy', // string for assign data source, function for custom rendering
                width: 300, // column width (number), default = 150
                resizable: true, // allow for change width
            },
        ],
        sticky: 'left', // use to freeze column(s)
        resizable: true, // ground resize
    },
    {
        id: 'po',
        Header: 'PO',
        headerStyle: { // define header style
            textAlign: 'left',
        },
        columns: [
            {
                Header: 'PO ORDER QTY',
                accessor: 'poQty',
                width: gridMaxWidth('PO ORDER QTY', 'poQty', rows, '16px Arial') + 10, // auto calculate max width
                headerStyle: {
                    color: 'red',
                    backgroundColor: 'blue',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                },
                resizable: true,
            },
            {
                id: 'poUnitCost',
                Header: 'PO UNIT COST',
                accessor: (row: any, index: number) => {
                    const lines = ((row['poUnitCost' as keyof typeof row] ?? '') as string).split('\n')
                    return (<Typography
                        component='span'
                        sx={{ display: 'block', fontSize: '13px', }}
                    >
                        {lines.map((line, lineIndex) => {
                            const lineContents = line.split(' ')
                            return <Typography
                                component='span'
                                key={`row${index}_line${lineIndex}`}
                                sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', }}
                            >
                                {lineContents.map((content, contentIndex) =>
                                    <span
                                        key={`row${index}_line${lineIndex}_${contentIndex}`}
                                        style={{paddingLeft: '2px', paddingRight: '2px'}}
                                    >
                                        {content}
                                    </span>
                                )}
                            </Typography>
                        })}
                    </Typography>)
                },
                width: 150,
            },
            {
                Header: 'PO AMT',
                accessor: 'poAMT',
                width: 150,
            },
            {
                Header: 'PO NW:LB',
                accessor: 'poNW_LB',
                width: 100,
                hidden: true,
            },
        ],
    },
    {
        id: 'bol',
        Header: 'BOL',
        columns: [
            {
                Header: 'BOL QTY',
                accessor: 'bolQty',
                width: 150,
            },
            {
                Header: 'BOL UNIT COST',
                accessor: 'bolUnitCost',
                width: 150,
            },
            {
                Header: 'BOL AMT',
                accessor: 'bolAMT',
                width: 150,
            },
            {
                Header: 'BOL NW:LB',
                accessor: 'bolNW_LB',
                width: 100,
            },
        ]
    },
]

const cols1 = [
    {
        Header: 'title A',
        sticky: 'left',
        accessor: 'a',
    },
    {
        id: 'b',
        Header: 'title B',
        accessor: 'b alias',
    },
    {
        id: 'c',
        Header: 'title C',
        accessor: (row: any) => row.enabled
            ? <span data-testid='ce'>{row.c}</span>
            : <span data-testid='cd'>null</span>
    }
]
const rows1 = [
    {
        id: 1,
        a: 'A1',
        b: 'B origin',
        'b alias': 'B1',
        enabled: true,
        c: 'C1',
    },
    {
        id: 2,
        parentId: 1,
        a: 'A2',
        'b alias': 'B2',
        enabled: false,
        c: 'C2',
    },
]

// export excel style & column style
const gridStyle = gridStyleFactory({
    '& .poColumn': { backgroundColor: '#D9E1F2', fontWeight: 'bold' },
    '& .poQtyColumn': {backgroundColor: '#d9e1f2', textAlign: 'center' },
    '& .bolColumn': { backgroundColor: '#FFF2CC', color: '#FF0000' },
    //'& .otherColumn': { backgroundColor: '#fff' },
})

function customCellName<Type>(field: string, row: any, value: Type | undefined): string {
    if (field === 'poQty')
        return 'poQtyColumn'
    if (field.includes('po'))
        return 'poColumn'
    if (field.includes('bol'))
        return 'bolColumn'
    return 'otherColumn'
}

const tabs = ['empty', 'tab 1', 'tabtab 2']
const PaymentSelectMemo = memo(PaymentSelect)
const PortSelectMemo = memo(PortSelect)
const VendorAgentSelectMemo = memo(VendorAgentSelect, (pre, next) => pre.disabled === next.disabled)

export const Demo = () => {
    const [currentTab, setCurrentTab] = useState<number>(0)
    const [payments, setPayments] = useState<string[]>([])
    const [agents, setAgents] = useState<string[]>([])
    const [orderTypes, setOrderTypes] = useState<string[]>([])
    const [comparison, setComparison] = useState<boolean>(true)

    const grid0Ref = useRef<GridRef>(null)
    const grid1Ref = useRef<GridRef>(null)
    const preGridRef = useRef<any>(null)

    const handlePaymentChange = (selectPayments: string[]) => {
        setPayments(selectPayments)
    }

    const handlePortChange = (selectPorts: string[]) => {
        console.log(selectPorts)
    }

    const handleAgentChange = (selectedAgents: string[]) => {
        setAgents(selectedAgents)
    }

    const handleOrderTypeChange = (selectedOrderTypes: string[]) => {
        setOrderTypes(selectedOrderTypes)
    }

    const handleVendorChange = (selectedVendors: string[]) => {
        console.log(selectedVendors)
    }

    const handlePOStageChange = (selectedPOStages: string[]) => {
        console.log(selectedPOStages)
    }

    const handleBOLStageChange = (selectedBOLStages: string[]) => {
        console.log(selectedBOLStages)
    }

    const handleComparisonChecked = (checked: boolean) => {
        setComparison(checked)
    }

    const handleCurrentTabChange = (tab: number) => setCurrentTab(tab)

    const exportExcel = () => {
        try {
            let workbook = new Excel.Workbook()
            const sheet0 = workbook.addWorksheet('grid0')
            grid1Ref.current?.fillExcelSheet(sheet0)
            workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
                saveAs(blob, `mui.xlsx`, { autoBom: true })
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleHeaderCellClick = (columnID: string) => {
        if (columnID === 'poQty')
            grid1Ref.current?.hideColumns(['poAMT'])
        if (columnID === 'po')
            grid1Ref.current?.showColumns(['poAMT', 'poNW_LB'])
    }

    return (<Report
        title='Report'
    >
        {/*<LoadingTheme />*/}
        <Tabs 
            tabs={tabs}
            onTabChange={useCallback(handleCurrentTabChange, [])}
            freezeTabs={2}
        />

        <Bars progressBar={true} ref={preGridRef}> {/* 用來把Bar分條顯示，並控制scrollbarX */}
            <Bar>
                <Autocomplete
                    label='test'
                    options={['Albert', 'Alan', 'Bob', 'Kevin', 'Carter', 'Jenifer']}
                    limitTags={2}
                    sx={{width: '250px'}}
                />
                <PaymentSelectMemo onChange={useCallback(handlePaymentChange, [])} />
                <PortSelectMemo onChange={useCallback(handlePortChange, [])} />
                <VendorAgentSelectMemo onChange={handleAgentChange} />
                <OrderTypeSelect onChange={useCallback(handleOrderTypeChange, [])} />
                <VendorSelect
                    onChange={useCallback(handleVendorChange, [])}
                    pHierarchies={['Merchandise']}
                    orderTypes={orderTypes}
                    payments={payments}
                    agents={agents}
                />
                <POStageSelect onChange={useCallback(handlePOStageChange, [])} />
                <BOLStageSelect onChange={useCallback(handleBOLStageChange, [])} />
            </Bar>
            <Bar>
                <Checkbox label='Comparison' onChange={handleComparisonChecked} checked={comparison} />
                <DateRangePicker
                    //disabled={true}
                    label='option'
                    periods={['Date', 'Week', 'Month', 'Quarter', 'Year']}
                    defaultPeriod='Date'
                    startYear={2000}
                    onRangeChange={(from: string, to: string) => console.log(from, to)}
                    tipDate2StrFn={DateFormat}
                />
                <PaymentSelect value={payments} onChange={handlePaymentChange} />
                <PortSelect label='POL' />
                <VendorAgentSelect />
                <VendorTypeSelect />
                <Button
                    name='tracer'
                    onClick={async () => {
                        const span = StartSpan('go')
                        console.log('go')
                        setComparison(!comparison)
                        span.end()
                    }}
                    sx={{marginLeft: '30px'}}
                >
                    GO
                </Button>
                <ExcelButton
                    onClick={() => exportExcel()}
                    sx={{marginLeft: '30px'}}
                />
            </Bar>
            <Bar>
                <Checkbox label='Comparison' onChange={handleComparisonChecked} checked={comparison} />
                <MultiSelect
                    label='Hierarchy select'
                    menuItems={[
                        {
                            name: 'a',
                        },
                        {
                            name: 'a1',
                            parent: 'a',
                        },
                        {
                            name: 'a2',
                            parent: 'a',
                        },
                        {
                            name: 'b',
                        },
                        {
                            name: 'c',
                            expand: true,
                        },
                        {
                            name: 'c1',
                            parent: 'c'
                        },
                    ]}
                />
                <DatePicker value={new Date()} onChange={(v) => { }} />
                <TextInput label='number' validator={NumberValidator} placeholder='empty' placeholderColor='red' />
            </Bar>
            <Bar>
                <SearchOption />
                <PHierarchyComponent
                    defaultSelected='Merchandise'
                    //disabled={true}
                    onChange={useCallback((items: any) => console.log(items), [])}
                />
                <CHierarchyComponent
                    defaultSelected='CAP GROUP,CAP N. America,CAP Asia/Pacific'
                    onChange={useCallback((items: any) => console.log(items), [])}
                />
                <SCMSComponent
                    //defaultSelected='SC3 TRADING CO, SC4 WHOLESALE CO'
                    onChange={useCallback((items: any) => console.log(items), [])}
                />
            </Bar>
        </Bars>

        <TabPanels
            anchorEl={preGridRef.current}
            currentTab={currentTab}
            //hideMethod='hide' default use none, which will not render inactive child component, notice if you use useRef that will be null
        >
            <Grid
                //columns={columns}
                //emptyDisplay={() => <span>123</span>}
                //emptyDisplay='321'
                
                columns={cols1}
                rows={rows1}
                index={true}
                hierarchyColumns={['a']}
                //expandable={false}
                /*emptyDisplay={
                    <div test-id='empty'>
                        Empty
                    </div>
                }*/
            />
            <Grid
                ref={grid0Ref}
                index={true}
                columns={columns1}
                rows={rows}
                sx={{ ...gridStyle, height: 'calc(100vh - 227px)', width: '100%' }}
                //sx={{ ...gridStyle, height: '100%' }}
                cellNameFn={customCellName}
                onHeaderClick={handleHeaderCellClick}
            />
            <Grid
                ref={grid1Ref}
                index={true}
                columns={columns2}
                rows={rows}
                sx={{ ...gridStyle, height: '100%' }}
                cellNameFn={customCellName}
                onHeaderClick={handleHeaderCellClick}
                hierarchyColumns={['phierarchy']}
            />
        </TabPanels>
    </Report>)
}
