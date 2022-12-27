import { Card, CardBody, Col, Row, Input } from "reactstrap";
import React, { Fragment, useEffect, useState } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { useDispatch, useSelector } from "react-redux";
import { changePageData } from "../reducers/GridReducer";
// import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createDefaultClause } from "typescript";

const Aggrid = (props) => {
    const gridReducer = useSelector((state) => state.GridReducer);

    let tmpGridOptions = props.gridOptions;
    tmpGridOptions.enableCellTextSelection = true;

    tmpGridOptions.defaultColDef.tooltipComponent = "customTooltip";

    tmpGridOptions.components = {
        customTooltip: CustomTooltip,
    };

    if (tmpGridOptions.hasOwnProperty("columnDefs")) {
        tmpGridOptions.tooltipShowDelay = 0;
        tmpGridOptions.columnDefs.map((item) => {
            if (
                item.field != "mwocFile" &&
                item.field != "modcFile" &&
                item.field != "meImage" &&
                item.field != "mehImage"
            )
                item.tooltipField = item.field;
        });
    }

    function CustomTooltip() { }
    CustomTooltip.prototype.init = function (params) {
        var eGui = (this.eGui = document.createElement("div"));
        var data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        eGui.classList.add("custom-tooltip");
        eGui.style["background-color"] = "white";
        eGui.style["padding"] = "5px";
        const fieldNm = params.column.colId;
        const headerNm = params.column.userProvidedColDef.headerName;
        var test = document.getElementById("spanStrWidth");
        if (headerNm == "품목정보") {
            test.textContent = data.mpiNm + "(" + data.mpiCode + ")";
        } else if (headerNm == "주소") {
            let addr = fieldNm.replace("Zip", "");
            test.textContent =
                "(" +
                data[fieldNm] +
                ") " +
                data[addr + "Addr1"] +
                " " +
                data[addr + "Addr2"];
        } else {
            test.textContent = params.value;
        }
        const textWidth = test.offsetWidth;
        const cellWidth = params.column.getActualWidth() - 17 * 2;
        if (textWidth > cellWidth) {
            if (headerNm == "주소") {
                eGui.innerHTML = test.textContent;
            } else if (headerNm == "품목정보") {
                eGui.innerHTML = test.textContent;
            } else {
                eGui.innerHTML = data[fieldNm];
            }
        } else {
            eGui.style.display = "none";
        }
    };

    CustomTooltip.prototype.getGui = function () {
        return this.eGui;
    };

    //21.09.14 임시수정
    function onPaginationChanged(params) {
        params.deselectAll();
        let paginationSize = params.paginationGetPageSize();
        let curPageNum = params.paginationGetCurrentPage();
        let totalRowsCount = params.getDisplayedRowCount();

        let curPageStartIdx = curPageNum * paginationSize;
        let curPageLastIdx = curPageStartIdx + paginationSize;
        if (curPageLastIdx > totalRowsCount) curPageLastIdx = totalRowsCount;

        for (let i = curPageStartIdx; i < totalRowsCount; i++) {
            let isCurPageRows = i >= curPageStartIdx && i < curPageLastIdx;

            params.getDisplayedRowAtIndex(i).setRowSelectable(isCurPageRows);
        }
    }

    const [node, setNode] = useState();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [modules, setModules] = useState(AllCommunityModules);
    const [isDragLeave, setIsDragLeave] = useState(false);
    const [pageSize, setPageSize] = useState(100);
    const keyField = props.keyField; //키 필드
    const rowData = props.rowData; //데이터
    const gridOptions = tmpGridOptions; //헤더
    const funcParams = props.funcParams || null;
    const pagination = props.pagination || false; //페이지 네비게이션 사용여부
    const paginationPageSize = props.paginationPageSize || 100;
    const rowSelection = props.rowSelection || "single";
    const style = props.style || { height: "700px" };
    const fixedClass = props.fixedClass || "fixHeader";
    const usecheckbox = props.useCheckbox || false;
    const pageSizeChange = props.pageSizeChange || false;
    const tableKey = props.tableKey || null; //테이블을 구별하기 위해 사용
    const rowHeight = props.rowHeight || 26;
    const secondTable = props.secondTable || false; //두번째 테이블 클릭
    const thirdTable = props.thirdTable || false; //세번째 테이블 클릭
    const fourthTable = props.fourthTable || false; //네번째 테이블 클릭
    const fifthTable = props.fifthTable || false; //다섯번째 테이블 클릭
    const sixthTable = props.sixthTable || false; //여섯번째 테이블 클릭
    const innerRef = props.innerRef || null;
    const pinnedData = props.pinnedBottomRowData || null; //평균,합계 하단 고정 row
    const dispatch = useDispatch();

    useEffect(() => {
        let pageData = [];
        let flag = false;

        if (gridReducer.page.length !== 0) {
            gridReducer.page.map((data, index) => {
                if (data.tableKey == tableKey) {
                    flag = true;
                }
            });
        }

        if (!flag) {
            pageData = [...gridReducer.page];
            pageData.push({ tableKey: tableKey, pageSize: 100 });
            dispatch(changePageData(pageData));
        }
    }, []);

    useEffect(() => {
        gridReducer.page.map((data, index) => {
            if (data.tableKey == tableKey) {
                setPageSize(data.pageSize);
            }
        });
    }, [gridReducer.page]);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

        if (funcParams && funcParams.hasOwnProperty("setGridparentApi")) {
            funcParams.setGridparentApi(params.api);
        }

        if (tableKey == "processListSelect" || tableKey == "orderSelectTable") {
            funcParams.firstSelect(params.api);
        }
        if (tableKey == "processingSelect") {
            funcParams.processingSelect(params.api);
        }
    };

    const onRowDataChanged = (params) => {
        if (funcParams && funcParams.hasOwnProperty("gridDataChange")) {
            funcParams.gridDataChange(params);
        }
    };

    const onRowDragEnter = (e) => {
        // console.log("onRowDragEnter", e.overIndex);
    };

    const onRowDragEnd = (e) => {
        // console.log("onRowDragEnd", e.overIndex);
        let tableModel = gridApi.getModel();
        funcParams.changeOrderFnc(tableModel.rowsToDisplay);
    };

    const onRowDragMove = (e) => {
        // console.log("onRowDragMove", e.overIndex);
    };

    const onRowDragLeave = (e) => {
        // console.log("onRowDragLeave", e.overIndex);
    };

    const onPageSizeChanged = (newPageSize) => {
        var value = document.getElementById("page-size-" + tableKey).value;

        dispatch(
            changePageData(
                gridReducer.page.map((item) =>
                    item.tableKey === tableKey ? { ...item, pageSize: value } : item
                )
            )
        );
        gridApi.paginationSetPageSize(Number(value));
    };

    // for (const key in gridOptions.columnDefs) {
    //   if (key != "0") {
    //     gridOptions.columnDefs[key].cellStyle = { paddingLeft: "2px" };
    //   }
    // }

    return (
        <Fragment>
            <span
                id="spanStrWidth"
                style={{ visibility: "hidden", position: "absolute", top: -10000 }}
            ></span>
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
            >
                <Row>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <div className="row-fluid no-gutters">
                                    <div
                                        className={"ag-theme-alpine " + fixedClass}
                                        style={style}
                                    >
                                        {/* {pageSizeChange ? (
                                            <div className="page-size">
                                                <select
                                                    onChange={onPageSizeChanged}
                                                    id={"page-size-" + tableKey}
                                                    className="form-control"
                                                    value={pageSize}
                                                >
                                                    <option value="100">100개보기</option>
                                                    <option value="500">500개보기</option>
                                                    <option value="1000">1000개보기</option>
                                                </select>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )} */}
                                        <AgGridReact
                                            ref={innerRef}
                                            modules={modules}
                                            onGridReady={onGridReady}
                                            rowData={rowData}
                                            gridOptions={gridOptions}
                                            pagination={pagination}
                                            paginationPageSize={pageSize}
                                            animateRows={true}
                                            rowDragManaged={true}
                                            enableMultiRowDragging={true}
                                            rowSelection={rowSelection}
                                            noRowsOverlayComponentFramework={() => {
                                                return <></>;
                                            }}
                                            onRowDataChanged={onRowDataChanged}
                                            onRowDragEnter={onRowDragEnter}
                                            onRowDragEnd={onRowDragEnd}
                                            onRowDragMove={onRowDragMove}
                                            onRowDragLeave={onRowDragLeave}
                                            onRowClicked={(e) => {
                                                var selectedRows = gridApi.getSelectedRows();
                                                var selectedNodes = gridApi.getSelectedNodes();
                                                for (let i = 0; i < selectedRows.length; i++) {
                                                    selectedRows[i].rowIndex = selectedNodes[i].rowIndex;
                                                }

                                                if (secondTable) {
                                                    if (funcParams) {
                                                        funcParams.onSecondRowClicked(
                                                            selectedRows[0],
                                                            gridApi.getFocusedCell(),
                                                            e
                                                        );
                                                    }
                                                } else if (thirdTable) {
                                                    if (funcParams) {
                                                        funcParams.onThirdRowClicked(
                                                            selectedRows[0],
                                                            gridApi.getFocusedCell(),
                                                            e
                                                        );
                                                    }
                                                } else if (fourthTable) {
                                                    if (funcParams) {
                                                        funcParams.onFourthRowClicked(
                                                            selectedRows[0],
                                                            gridApi.getFocusedCell(),
                                                            e
                                                        );
                                                    }
                                                } else if (fifthTable) {
                                                    if (funcParams) {
                                                        funcParams.onFifthRowClicked(
                                                            selectedRows[0],
                                                            gridApi.getFocusedCell(),
                                                            e
                                                        );
                                                    }
                                                } else if (sixthTable) {
                                                    if (funcParams) {
                                                        funcParams.onSixthRowClicked(
                                                            selectedRows[0],
                                                            gridApi.getFocusedCell(),
                                                            e
                                                        );
                                                    }
                                                } else {
                                                    if (funcParams) {
                                                        funcParams.onRowClicked(
                                                            selectedRows[0],
                                                            gridApi.getFocusedCell(),
                                                            e
                                                        );
                                                    }
                                                }
                                            }}
                                            onSelectionChanged={(e) => {
                                                if (gridApi !== null) {
                                                    var selectedRows = gridApi.getSelectedRows();
                                                    var selectedNodes = gridApi.getSelectedNodes();

                                                    for (let i = 0; i < selectedRows.length; i++) {
                                                        selectedRows[i].rowIndex =
                                                            selectedNodes[i].rowIndex;
                                                    }
                                                    if (usecheckbox) {
                                                        if (secondTable) {
                                                            funcParams.setSecondSelectedRow(selectedRows);
                                                        } else if (thirdTable) {
                                                            funcParams.setThirdSelectedRow(selectedRows);
                                                        } else if (fourthTable) {
                                                            funcParams.setFourthSelectedRow(selectedRows);
                                                        } else if (fifthTable) {
                                                            funcParams.setFifthhSelectedRow(selectedRows);
                                                        } else if (sixthTable) {
                                                            funcParams.setSixthhSelectedRow(selectedRows);
                                                        } else {
                                                            funcParams.setSelectedRow(selectedRows);
                                                        }
                                                        if (funcParams.hasOwnProperty("onSelectedList")) {
                                                            funcParams.onSelectedList(selectedRows, e);
                                                        }
                                                    }
                                                }
                                            }}
                                            rowHeight={rowHeight}
                                            pinnedBottomRowData={pinnedData}
                                            getRowStyle={function (params) {
                                                if (params.node.rowPinned) {
                                                    return { "font-weight": "bold" };
                                                }
                                            }}
                                            //21.09.14 임시수정
                                            onPaginationChanged={(e) => {
                                                if (e.newPage) {
                                                    onPaginationChanged(gridApi);
                                                }
                                            }}
                                        ></AgGridReact>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CSSTransitionGroup>
        </Fragment>
    );
};

export default Aggrid;
