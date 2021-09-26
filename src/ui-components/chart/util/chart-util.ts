import * as mainUtil from '../../../utils/main-util';

export const dougnutOptions = {
    maintainAspectRatio: false,
    cutout: 95,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 13,
            weight: 400
          },
        },
        onHover: (event: { native: MouseEvent }) =>
          ((event.native.target as HTMLCanvasElement).style.cursor = "pointer"),
      },
      tooltip: {
        displayColors: false,
        bodyFont: {
          size: 14,
          weight: 600
        },
        callbacks: {
          label: (tooltipItem: { formattedValue: string }) => tooltipItem.formattedValue + '%'
        }
      }
    },
    onHover: (event: { native: MouseEvent }) =>
      ((event.native.target as HTMLCanvasElement).style.cursor = "default")
  };
  
  export const getLineOptions = (yAxisPrefix = '') => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            padding: 20,
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12,
              weight: 400
            },
          },
          onHover: (event: { native: MouseEvent }) =>
            ((event.native.target as HTMLCanvasElement).style.cursor = "pointer")
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: { parsed: { y: Number } }) => mainUtil.unitSeparator(tooltipItem.parsed.y.toString()) + yAxisPrefix
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            }
          }
        },
        y: {
          stacked: true,
          ticks: {
            font: {
              size: 13,
              weight: 400
            },
            callback: (value: string) => mainUtil.unitSeparator(value) + yAxisPrefix
          }
        }
      },
      onHover: (event: { native: MouseEvent }) =>
        ((event.native.target as HTMLCanvasElement).style.cursor = "default")
    };
  }