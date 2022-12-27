import React from "react";
import ReactTooltip from "react-tooltip";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
//import React, { Fragment, useEffect, useState } from "react";
import { Input } from "reactstrap";

const style = {
    position: "absolute",
    top: " 0",
    right: " 0",
    minWidth: "10%",
    minHeight: "10%",
    fontSize: "10px",
    textAlign: "right",
    filter: "alpha(opacity=0)",
    opacity: "0",
    outline: "none",
    background: "white",
    cursor: "inherit",
    display: "block",
};

export const columns = () => {
    function isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }

    const gridOptions = {
        defaultColDef: {
            minWidth: 100,
            editable: false,
            filter: false,
            resizable: true,
            flex: 1,
            height: 800,
            sortable: true,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
            suppressSizeToFit: true,
        },
        tooltipShowDelay: 0,
        columnDefs: [
            {
                field: "title",
                headerName: "주제",
            },
            // {
            //     field: "meNm",
            //     headerName: "설비명",
            //     cellRendererFramework: function (params) {
            //         return (
            //             console.log(params)
            //         )
            //     }
            // },
            // {
            //     field: "meImage",
            //     headerName: "설비이미지",
            //     cellRendererFramework: function (row) {
            //         if (row) {
            //             return (
            //                 <div className="">
            //                     {row.value[0] == ("null" || "" || null || undefined) ||
            //                         row.value.toString().split("/")[
            //                         row.value.toString().split("/").length - 1
            //                         ] == ("null" || "" || null || undefined) ? (
            //                         <div style={{ height: 40 }} />
            //                     ) : (
            //                         <div>
            //                             <div
            //                                 data-tip=""
            //                                 data-for={row.value.toString()}
            //                                 className="meImage"
            //                             >
            //                                 <img
            //                                     style={{ height: 40 }}
            //                                     loading="lazy"
            //                                     src={row.value}
            //                                     alt=""
            //                                 />
            //                             </div>
            //                             {/* <ReactTooltip
            //           id={row.value.toString()}
            //           place="left"
            //           effect="float"
            //           type="light"
            //         >
            //           <div>
            //             <img
            //               style={{ width: 100, height: 100 }}
            //               loading="lazy"
            //               src={row.value == null ? "" : row.value}
            //             />
            //           </div>
            //         </ReactTooltip> */}
            //                         </div>
            //                     )}
            //                 </div>
            //             );
            //         } else return null;
            //     },
            // },
            // {
            //     field: "meStatus",
            //     headerName: "상태",
            //     maxWidth: 90,
            //     cellRendererFramework: function (params) {
            //         let color = "cell-bg-blue";
            //         if (
            //             params.data.meStatus === "고장" ||
            //             params.data.meStatus === "AS"
            //         ) {
            //             color = "cell-bg-gray";
            //         } else if (params.data.meStatus === "정상") {
            //             color = "cell-bg-green";
            //         }

            //         return <span className={color}>{params.data.meStatus}</span>;
            //     },
            // },
        ],
    };

    return gridOptions;
};
