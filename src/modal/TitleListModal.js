import './TitleListModal.css'
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button
} from "reactstrap";
import React, { useState, useEffect } from 'react';
import Aggrid from "../common/components/aggrid";
import { columns } from "../common/columns/columns"
import Draggable from "react-draggable";

const TitleListModal = ({ setTitleModalVisible, titleModalVisible, getTitleList, freSchedule, mergeTodoList }) => {
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
        if (titleModalVisible) {
        }
    }, [titleModalVisible])

    const onRowClicked = (obj) => {
        console.log(obj)
    }

    const closeButton = () => {
        setTitleModalVisible(false)
    }

    const assignButton = () => {
        if (selectedRow.length > 0) {
            let tempList = [];
            for (let i = 0; i < selectedRow.length; i++) {
                tempList.push({ id: 'jmyu', title: selectedRow[i].title, checked: true })
            }
            mergeTodoList(tempList)
        }
        setTitleModalVisible(false)
    }

    return (
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
        >
            <Modal isOpen={titleModalVisible} toggle={getTitleList}>
                <ModalHeader toggle={getTitleList} className="handle">자주 있는 일정</ModalHeader>
                <ModalBody>
                    <div>
                        <Aggrid
                            gridOptions={columns()}
                            paginationPageSize={13}
                            rowSelection={"multiple"}
                            rowData={freSchedule}
                            funcParams={{ onRowClicked, setSelectedRow }}
                            style={{ height: "400px" }}
                            pagination={true}
                            pageSizeChange={true}
                            useCheckbox={true}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button style={{ backgroundColor: "red", borderColor: "red" }} onClick={closeButton}>취소</Button>
                    <Button onClick={assignButton}>확인</Button>
                </ModalFooter>
            </Modal>
        </Draggable>
    )
}

export default TitleListModal;