import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSave, FaPlus, FaTimes } from 'react-icons/fa';

const initialFormState = {
  id: null,
  nombreCompleto: '',
  correoElectronico: '',
  numeroTelefono: '',
};

const UserForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialFormState);
  };
  
  const handleCancel = () => {
    setFormData(initialFormState);
    if (onCancel) onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formData.id && 
        <Form.Group as="fieldset" className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={formData.id} disabled />
        </Form.Group>
      }

      <Form.Group className="mb-3" controlId="nombreCompleto">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control 
          type="text" 
          name="nombreCompleto" 
          value={formData.nombreCompleto} 
          onChange={handleChange} 
          placeholder="Ingrese el nombre completo"
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="correoElectronico">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control 
          type="email" 
          name="correoElectronico" 
          value={formData.correoElectronico} 
          onChange={handleChange} 
          placeholder="ejemplo@correo.com"
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="numeroTelefono">
        <Form.Label>Número de Teléfono</Form.Label>
        <Form.Control 
          type="tel" 
          name="numeroTelefono" 
          value={formData.numeroTelefono} 
          onChange={handleChange} 
          placeholder="Ej. 123-456-7890"
          required 
        />
      </Form.Group>

      <div className="d-grid gap-2">
        <Button variant="primary" type="submit">
          {formData.id ? <><FaSave /> Guardar Cambios</> : <><FaPlus /> Crear Usuario</>}
        </Button>
        {formData.id && (
          <Button variant="secondary" type="button" onClick={handleCancel}>
            <FaTimes /> Cancelar Edición
          </Button>
        )}
      </div>
    </Form>
  );
};

export default UserForm;
