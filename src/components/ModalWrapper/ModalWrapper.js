import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container} from "react-bootstrap";

const ModalWrapper = props => {
    const {
        isShow, handleClose, modalTitle,
        onEdit, onDelete, onAdd,
        editButtonText, deleteButtonText, addButtonText,
        addButtonDisabled, editButtonDisabled, children
    } = props;

    const onConfirmEdit = async () => {
        onEdit && await onEdit();

        handleClose();
    }

    const onConfirmDelete = async () => {
        onDelete && await onDelete();

        handleClose();
    }

    const onConfirmAdd = async () => {
        onAdd && await onAdd();

        handleClose();
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Container>
                {children}
            </Container>
            <Modal.Footer>
                {deleteButtonText && <Button variant="danger" onClick={onConfirmDelete}>
                    {deleteButtonText}
                </Button>}
                {editButtonText && <Button variant="success" onClick={onConfirmEdit} disabled={editButtonDisabled}>
                    {editButtonText}
                </Button>}
                {addButtonText && <Button variant="primary" onClick={onConfirmAdd} disabled={addButtonDisabled}>
                    {addButtonText}
                </Button>}
            </Modal.Footer>
        </Modal>
    );
};

ModalWrapper.propTypes = {
    isShow: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onAdd: PropTypes.func,
    deleteButtonText: PropTypes.string,
    editButtonText: PropTypes.string,
    addButtonText: PropTypes.string,
    addButtonDisabled: PropTypes.bool,
    editButtonDisabled: PropTypes.bool,
    modalTitle: PropTypes.string,
    children: PropTypes.node
}

export default ModalWrapper;