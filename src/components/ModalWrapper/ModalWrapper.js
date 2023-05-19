import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container} from "react-bootstrap";
import './style.m.scss';

const ModalWrapper = props => {
    const {
        isShow, handleClose,
        modalTitle, subTitle, onConfirm,
        confirmButtonText, confirmButtonDisabled, children
    } = props;

    const onConfirmClick = () => {
        onConfirm()
            .then(() => {
                handleClose();
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Modal className="modal" show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            {subTitle && <div className="subtitle">{subTitle}</div>}
            <Container>
                {children}
            </Container>
            <Modal.Footer>
                {onConfirm && <Button
                    variant="primary"
                    onClick={onConfirmClick}
                    disabled={confirmButtonDisabled}
                >
                    {confirmButtonText}
                </Button>}
            </Modal.Footer>
        </Modal>
    );
};

ModalWrapper.propTypes = {
    isShow: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    confirmButtonText: PropTypes.string,
    confirmButtonDisabled: PropTypes.bool,
    modalTitle: PropTypes.string,
    children: PropTypes.node
}

export default ModalWrapper;