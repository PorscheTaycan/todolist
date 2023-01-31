import './TitleListModal.css'
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button
} from "reactstrap";
import React, { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";





const ModifyModal = ({ setModifyModal, modifyModal, upDateTodos, tempName, setTempName, setChange, pickerDate, setPickerDate }) => {
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
        if (pickerDate) {
            //console.log(pickerDate)
        }
    }, [pickerDate])

    const closeButton = () => {

        setModifyModal(false)
    }




    return (
        <Modal isOpen={modifyModal} toggle={upDateTodos}>
            <ModalHeader toggle={upDateTodos} className="handle">자주 있는 일정</ModalHeader>
            <ModalBody>
                <div>
                    <input type="text" onChange={(e) => setTempName(e.target.value)} value={tempName}></input>
                </div>
            </ModalBody>

            <ModalFooter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        value={pickerDate}
                        onChange={setPickerDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button style={{ backgroundColor: "red", borderColor: "red" }} onClick={closeButton}>취소</Button>
                <Button onClick={(e) => setChange(pickerDate)}>확인</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModifyModal;