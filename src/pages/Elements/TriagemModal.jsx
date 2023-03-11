import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, CardActions } from "@material-ui/core";
import '../../App.css';

const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '100vh',
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: "80%",
    overflowY: "auto",
};

const headerStyle = {
    bgcolor: "#EDEEF0",
    padding: "20px 44px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px 4px 0 0",
};

const bodyStyle = {
    bgcolor: "#ffffff",
    padding: "40px 80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "4px 4px 0 0",
};

const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px",
    bgcolor: "#F5F5F5",
    borderRadius: "0 0 4px 4px",
};

export default function TriagemModal({ open, handleClose }) {

    const handleDelete = () => {
        handleClose();
    }

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={headerStyle}>
                    Chamar próxima senha
                </Typography>
                <Typography id="modal-modal-description" sx={bodyStyle}>
                   aa
                </Typography>
                <CardActions sx={footerStyle}>
                    <Button variant="outlined" color="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        <i className="fas fa-chevron-right"></i>    Chamar
                    </Button>
                </CardActions>
            </Box>
        </Modal>
    );
}
