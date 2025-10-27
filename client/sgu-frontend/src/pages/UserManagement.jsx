import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import UserForm from '../components/User.Form';
import UserTable from '../components/UserTable';
import axios from 'axios';

const API_BASE_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar la lista de usuarios. Por favor, intente de nuevo más tarde.');
      console.error("Error al cargar usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (userData) => {
    try {
      if (userData.id) {
        await axios.put(`${API_BASE_URL}/${userData.id}`, userData);
      } else {
        await axios.post(API_BASE_URL, userData);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Ocurrió un error en el servidor.';
      alert(`Error al guardar: ${msg}`);
      console.error("Error al guardar usuario:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al eliminar el usuario.';
      alert(`Error al eliminar: ${msg}`);
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <Container fluid className="p-5">
      <h1 className="text-center mb-4">Gestión de Usuarios</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {/* Columna del Formulario */}
        <Col md={12} lg={4} className="mb-4">
          <Card>
            <Card.Header as="h5">{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</Card.Header>
            <Card.Body>
              <UserForm 
                initialData={editingUser} 
                onSave={handleSave}
                onCancel={() => setEditingUser(null)}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Columna de la Tabla */}
        <Col md={12} lg={8}>
          <Card>
            <Card.Header as="h5">Usuarios Existentes</Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </Spinner>
                </div>
              ) : (
                <UserTable 
                  users={users} 
                  onEdit={setEditingUser}
                  onDelete={handleDelete}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;
