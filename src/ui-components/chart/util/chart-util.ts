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
  
  export const lineOptions = {
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
          }
        }
      }
    },
    onHover: (event: { native: MouseEvent }) =>
      ((event.native.target as HTMLCanvasElement).style.cursor = "default")
  };