import React, { useState, useRef } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../../Supports/Constants/UrlAPI';
import '../../Supports/Stylesheets/Components/Cards.css';
import { useSelector } from 'react-redux';

export const DeleteAddressModal = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onDeleteData = () => {
        let ID = props.data.val.ID;
        console.log(ID);

        try {
            // if (!ID || !Address_Label || !Districts || !Province || !Recipient_Name || !Recipient_Phone || !City || !Zip_Code || !Full_Address) throw { message: 'Data Must Be Filled' };

            Axios.delete(`${API_URL}/user/deleteAddress/${ID}`)
                .then((res) => {
                    alert('Delete Address Success!');
                    setOpenModal(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} className='border-start'>Hapus</button>
            <Modal toggle={() => setOpenModal(false)} isOpen={openModal} centered>
                <ModalBody>
                    <div className="delete-modal-container">
                        <div className="delete-header text-center">
                            <p>Hapus Alamat</p>
                        </div>
                        <div className="delete-body text-center">
                            <p>Apakah anda yakin untuk mengapus <br />
                                "{props.data.val.Address_Label}" ? Anda tidak dapat mengembalikan <br />
                                alamat yang sudah dihapus.
                            </p>
                        </div>
                        <div className="delete-button d-flex justify-content-center mt-4 mb-3">
                            <button
                                className='batal-del-btn me-2'
                                onClick={() => setOpenModal(false)}>Batal</button>
                            <button
                                className='jadi-del-btn ms-2'
                                onClick={onDeleteData}>Hapus</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};