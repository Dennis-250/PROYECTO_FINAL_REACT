// src/components/ActivityHistory.js
import React, { useState } from 'react';
import { Table, Container, Button, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const ActivityHistory = () => {
  const { activities, setActivities } = useAuth();
  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editDistance, setEditDistance] = useState('');

  const handleEdit = (index) => {
    const activity = activities[index];
    setEditIndex(index);
    setEditType(activity.type);
    setEditDuration(activity.duration);
    setEditDistance(activity.distance);
  };

  const handleSave = () => {
    const updatedActivities = [...activities];
    updatedActivities[editIndex] = {
      type: editType,
      duration: parseFloat(editDuration),
      distance: parseFloat(editDistance),
    };
    setActivities(updatedActivities);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  return (
    <Container>
      <h2>Historial de Actividades</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Actividad</th>
            <th>Duración (min)</th>
            <th>Distancia (km)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editIndex === index ? (
                  <Form.Control
                    type="text"
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                  />
                ) : (
                  activity.type
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Form.Control
                    type="number"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                  />
                ) : (
                  activity.duration
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Form.Control
                    type="number"
                    value={editDistance}
                    onChange={(e) => setEditDistance(e.target.value)}
                  />
                ) : (
                  activity.distance
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <Button variant="success" onClick={handleSave}>
                      Guardar
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditIndex(null)}
                      className="ml-2"
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                      className="ml-2"
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ActivityHistory;
