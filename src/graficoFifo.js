import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const GraficoHorizontal = ({ processos }) => {
  const [chart, setChart] = useState(null);
  const canvasRef = React.useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: processos.map((_, index) => `P${index + 1}`),
        datasets: [{
          label: 'Tempo de Execução (ms)',
          data: processos.map(processo => processo.tempoExecucao),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });

    setChart(newChart);

    return () => {
      newChart.destroy();
    }
  }, [processos]);

  useEffect(() => {
    if (chart) {
      chart.data.datasets[0].data = processos.map(processo => processo.tempoExecucao);
      chart.update();
    }
  }, [processos, chart]);

  return <canvas ref={canvasRef} />;
};

export default GraficoHorizontal;
