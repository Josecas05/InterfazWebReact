import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const Card = ({ idarticulo, autor, articulo, fecha }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminarClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/autorArticulo/${idarticulo}`, {

      });

      if (response.ok) {
        console.log("Artículo eliminado con éxito");
        // Cierra el diálogo después de eliminar
        handleClose();
        // Puedes recargar la página si es necesario
        window.location.reload();
      } else {
        console.error("Error al eliminar el artículo");
      }
    } catch (error) {
      console.error("Error durante la eliminación:", error);
    }
  };

  return (
    <div className="card">
      <h5 className="card-header">{articulo}</h5>
      <div className="card-body">
        <h5 className="card-title">{autor}</h5>
        <p className="card-text">{fecha}</p>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Eliminar
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmación de Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar este artículo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleEliminarClick} color="primary" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
