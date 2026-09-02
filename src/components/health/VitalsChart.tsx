import React, { useState } from 'react';
import type { MetricDataPoint } from '../../types';

interface VitalsChartProps {
  data: MetricDataPoint[];
  color: string;
  unit: string;
  title: string;
}

export const VitalsChart: React.FC<VitalsChartProps> = ({
  data,
  color,
  unit,
  title
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<MetricDataPoint | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-xs text-slate-400">
        No telemetry records available
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.15 || 5;
  const yMin = Math.floor(minVal - padding);
  const yMax = Math.ceil(maxVal + padding);

  const width = 500;
  const height = 180;
  const margin = { top: 20, right: 20, bottom: 30, left: 35 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const getX = (index: number) => {
    if (data.length <= 1) return innerWidth / 2;
    return margin.left + (index / (data.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    if (yMax === yMin) return margin.top + innerHeight / 2;
    return margin.top + innerHeight - ((val - yMin) / (yMax - yMin)) * innerHeight;
  };

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPoints = `${margin.left},${margin.top + innerHeight} ${points} ${
    margin.left + innerWidth
  },${margin.top + innerHeight}`;

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span className="font-semibold">{title}</span>
        {hoveredPoint ? (
          <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            {hoveredPoint.timeLabel}: {hoveredPoint.value} {unit}
          </span>
        ) : (
          <span>
            Avg: {Math.round(values.reduce((a, b) => a + b, 0) / values.length)} {unit}
          </span>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          <line
            x1={margin.left}
            y1={margin.top}
            x2={width - margin.right}
            y2={margin.top}
            stroke="currentColor"
            strokeDasharray="3 3"
            className="text-slate-200 dark:text-slate-800"
          />
          <line
            x1={margin.left}
            y1={margin.top + innerHeight / 2}
            x2={width - margin.right}
            y2={margin.top + innerHeight / 2}
            stroke="currentColor"
            strokeDasharray="3 3"
            className="text-slate-200 dark:text-slate-800"
          />
          <line
            x1={margin.left}
            y1={margin.top + innerHeight}
            x2={width - margin.right}
            y2={margin.top + innerHeight}
            stroke="currentColor"
            className="text-slate-300 dark:text-slate-700"
          />

          {/* Y Axis text */}
          <text
            x={margin.left - 8}
            y={margin.top + 4}
            textAnchor="end"
            className="text-[10px] fill-slate-400 font-mono"
          >
            {yMax}
          </text>
          <text
            x={margin.left - 8}
            y={margin.top + innerHeight}
            textAnchor="end"
            className="text-[10px] fill-slate-400 font-mono"
          >
            {yMin}
          </text>

          {/* Shaded Area */}
          <polygon points={areaPoints} fill={`url(#gradient-${title})`} />

          {/* Line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHovered = hoveredPoint === d;

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#ffffff' : color}
                  stroke={color}
                  strokeWidth="2.5"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(d)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text
                  x={cx}
                  y={height - 8}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 font-medium"
                >
                  {d.timeLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
