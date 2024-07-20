// src/components/ActivityStats.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const ActivityStats = () => {
  const { activities } = useAuth();

  const types = [...new Set(activities.map((activity) => activity.type))];
  const durations = types.map((type) =>
    activities
      .filter((activity) => activity.type === type)
      .reduce((acc, cur) => acc + cur.duration, 0)
  );
  const distances = types.map((type) =>
    activities
      .filter((activity) => activity.type === type)
      .reduce((acc, cur) => acc + cur.distance, 0)
  );

  const dataBar = {
    labels: types,
    datasets: [
      {
        label: 'Duración (min)',
        data: durations,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
      {
        label: 'Distancia (km)',
        data: distances,
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  const dataPie = {
    labels: types,
    datasets: [
      {
        label: 'Actividades',
        data: durations,
        backgroundColor: [
          'rgba(255,99,132,0.6)',
          'rgba(54,162,235,0.6)',
          'rgba(255,206,86,0.6)',
          'rgba(75,192,192,0.6)',
          'rgba(153,102,255,0.6)',
          'rgba(255,159,64,0.6)',
        ],
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estadísticas de Actividades (Barras)',
      },
    },
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Actividades (Pastel)',
      },
    },
  };

  return (
    <Container>
      <h2>Estadísticas y Gráficas</h2>
      <Bar data={dataBar} options={optionsBar} />
      <Pie data={dataPie} options={optionsPie} />
    </Container>
  );
};

export default ActivityStats;
