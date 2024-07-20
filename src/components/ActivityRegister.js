// src/components/ActivityRegister.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const ActivityRegister = () => {
  const { addActivity } = useAuth();
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type && duration && distance) {
      const newActivity = {
        type,
        duration: parseFloat(duration),
        distance: parseFloat(distance),
      };
      addActivity(newActivity);
      setType('');
      setDuration('');
      setDistance('');
      alert('Actividad registrada con éxito');
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  return (
    <Container>
      <h2>Registrar Actividad</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formActivityType">
          <Form.Label>Tipo de Actividad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ejemplo: Correr, Nadar, Bicicleta"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDuration">
          <Form.Label>Duración (min)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Duración en minutos"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDistance">
          <Form.Label>Distancia (km)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Distancia en kilómetros"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default ActivityRegister;

