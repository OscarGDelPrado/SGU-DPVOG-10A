import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = ({ users, onEdit, onDelete }) => {
  if (!users || users.length === 0) {
    return <Alert variant="info">No hay usuarios registrados. ¡Crea uno nuevo!</Alert>;
  }

  return (
    <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre Completo</th>
          <th>Correo Electrónico</th>
          <th>Teléfono</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.nombreCompleto}</td>
            <td>{user.correoElectronico}</td>
            <td>{user.numeroTelefono}</td>
            <td className="text-center">
              <Button 
                variant="warning" 
                size="sm" 
                onClick={() => onEdit(user)} 
                className="me-2"
              >
                <FaEdit /> Editar
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => onDelete(user.id)}
              >
                <FaTrash /> Borrar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;