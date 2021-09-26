import CardContainer from "../../ui-components/card/Card";
import LineChart from "../../ui-components/chart/LineChart";
import DoughnutChart from "../../ui-components/chart/DoughnutChart";
import statisticsStyles from "../statistics/Statistics.module.scss";
import TableComponent from "../../ui-components/table/Table";
import BarChart from "../../ui-components/chart/BarChart";
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SecurityIcon from '@mui/icons-material/Security';
import TrafficIcon from '@mui/icons-material/Traffic';

const cardWidth = "280px";
const cardHeight = "104px";

const doughnutData = {
  labels: ["User Login", "User Logout", "File Data Write", "Service Start", "Malware attack"],
  datasets: [
    {
      label: "Users by devices",
      data: [12, 19, 3, 5, 6],
      backgroundColor: ["#FFE576", "#3363FF", "#F65354", "#E18CF9", 'green'],
      borderWidth: 0,
    },
  ],
};

const lineData = {
  labels: ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'],
  datasets: [
    {
      label: 'Events',
      data: [12, 19, 3, 5, 2, 3, 95],
      fill: false,
      backgroundColor: '#003CFF',
      borderColor: 'rgba(0, 60, 255, 0.2)'
    }
  ],
};

const barData = {
  labels: ['443', '80', '445', 'Others'],
  datasets: [
    {
      label: '443',
      data: [4, 0, 0, 0],
      fill: false,
      backgroundColor: "#FFE576"
    },
    {
      label: '80',
      data: [0, 80, 0, 0],
      fill: false,
      backgroundColor: "#3363FF"
    },
    {
      label: '445',
      data: [0, 0, 445, 0],
      fill: false,
      backgroundColor: "#F65354"
    },
    {
      label: 'Others',
      data: [0, 0, 0, 1993],
      fill: false,
      backgroundColor: "#E18CF9"
    }
  ],
};

const dougnutOptions = {
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

const keywordHeaders = [
  { value: 'Attacker', alignment: TableAlignment.LEFT },
  { value: 'Number of attacks', alignment: TableAlignment.RIGHT },
  { value: 'Ban will reset', alignment: TableAlignment.RIGHT }
];

const keywordRows = [
  { data: [{ 'row-0': '88.45.65.24', alignment: TableAlignment.LEFT }, { 'row-1': 5, alignment: TableAlignment.RIGHT }, { 'row-2': '7h 30 min', alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': '192.168.0.65', alignment: TableAlignment.LEFT }, { 'row-1': 4, alignment: TableAlignment.RIGHT }, { 'row-2': '2h 50 min', alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': '74.145.65.98', alignment: TableAlignment.LEFT }, { 'row-1': 14, alignment: TableAlignment.RIGHT }, { 'row-2': '7d 5h 35 min', alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': '11.11.11.12', alignment: TableAlignment.LEFT }, { 'row-1': 12, alignment: TableAlignment.RIGHT }, { 'row-2': '6d 1h 20 min', alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': '96.56.7.45', alignment: TableAlignment.LEFT }, { 'row-1': 47, alignment: TableAlignment.RIGHT }, { 'row-2': '1d 1h 10 min', alignment: TableAlignment.RIGHT }] }
];

const lineOptions = {
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

const Events = () => {
  return (
    <>
      <div className={statisticsStyles.card}>
        <CardContainer style={{ width: cardWidth, height: cardHeight }}>
          <div className={statisticsStyles["card__content"]}>
            <span
              className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--user"]}`}
            >
              <ManageSearchIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={statisticsStyles["card__content--value"]}>
                245
                <span
                  className={`${statisticsStyles["card__content--subheader"]} ${statisticsStyles["card__content--subheader-decrease"]}`}
                >
                  <KeyboardArrowDownIcon />
                  23.74%
                </span>
              </h3>
              <span className={statisticsStyles["card__content--label"]}>
                Total events this week
              </span>
            </div>
          </div>
        </CardContainer>

        <CardContainer style={{ width: cardWidth, height: cardHeight }}>
          <div className={statisticsStyles["card__content"]}>
            <span
              className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--user"]}`}
            >
              <SecurityIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={statisticsStyles["card__content--value"]}>
                55
                <span
                  className={`${statisticsStyles["card__content--subheader"]} ${statisticsStyles["card__content--subheader-decrease"]}`}
                >
                  <KeyboardArrowDownIcon />
                  23.74%
                </span>
              </h3>
              <span className={statisticsStyles["card__content--label"]}>
                Blocked attacks this week
              </span>
            </div>
          </div>
        </CardContainer>

        <CardContainer style={{ width: cardWidth, height: cardHeight }}>
          <div className={statisticsStyles["card__content"]}>
            <span
              className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--user"]}`}
            >
              <TrafficIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={statisticsStyles["card__content--value"]}>
                5MB
                <span
                  className={`${statisticsStyles["card__content--subheader"]} ${statisticsStyles["card__content--subheader-decrease"]}`}
                >
                  <KeyboardArrowDownIcon />
                  23.74%
                </span>
              </h3>
              <span className={statisticsStyles["card__content--label"]}>
                Data exchanged this week
              </span>
            </div>
          </div>
        </CardContainer>
      </div>

      <div className={statisticsStyles.card}>
        <CardContainer
          style={{ width: '700px', height: '300px' }}
        >
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>All Events</h3>

            <LineChart data={lineData} options={lineOptions} width={650} height={190}></LineChart>
          </div>
        </CardContainer>

        <CardContainer
          style={{ width: '400px', height: '300px' }}
        >
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>All events by event type</h3>

            <DoughnutChart data={doughnutData} options={dougnutOptions} width={350} height={250}
            >
            </DoughnutChart>
          </div>
        </CardContainer>
      </div>

      <div className={statisticsStyles.card}>
        <CardContainer style={{ width: '500px', height: '260px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Attackers</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={keywordRows} headers={keywordHeaders} minWidth={450}></TableComponent>
            </div>
          </div>
        </CardContainer>

        <CardContainer
          style={{ width: '600px', height: '260px' }}
        >
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Traffic by destination port</h3>

            <BarChart data={barData} options={lineOptions} width={550} height={190}></BarChart>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Events;
