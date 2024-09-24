import React, { useEffect, useMemo, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { Layout, PieData } from 'plotly.js';
import { Fruit } from '../types';

interface PieChartProps {
  selectedFruits: Fruit[];
}

const PieChart: React.FC<PieChartProps> = ({ selectedFruits }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const data: Partial<PieData>[] = useMemo(() => [
    {
      values: selectedFruits.map((fruit) => fruit.nutritions.calories),
      labels: selectedFruits.map((fruit) => fruit.name),
      type: 'pie',
      marker: {
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
      },
    },
  ], [selectedFruits]);

  const layout: Partial<Layout> = {
    height: 400,
    width,
    title: 'Fruit Calories Distribution',
    showlegend: true,
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default PieChart;
