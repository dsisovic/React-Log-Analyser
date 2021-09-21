import PieChart from "../../ui-components/chart/PieChart";
import CardContainer from "../../ui-components/card/Card";
import TableComponent from '../../ui-components/table/Table';
import statisticsStyles from "../statistics/Statistics.module.scss";
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";

const headers = [
  { value: 'Country', alignment: TableAlignment.LEFT },
  { value: 'Clicks', alignment: TableAlignment.RIGHT },
  { value: 'Impressions', alignment: TableAlignment.RIGHT }
];

const rows = [
  { data: [{ 'row-0': 'Italy', alignment: TableAlignment.LEFT, showImage: true }, { 'row-1': 1, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'Serbia', alignment: TableAlignment.LEFT, showImage: true }, { 'row-1': 1, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'Croatia', alignment: TableAlignment.LEFT, showImage: true }, { 'row-1': 1, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'Japan', alignment: TableAlignment.LEFT, showImage: true }, { 'row-1': 1, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'Hungary', alignment: TableAlignment.LEFT, showImage: true }, { 'row-1': 1, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] }
];

const doughnutData = {
  labels: ["0 sec - 30 sec", "30 sec - 2 min", "2 min - 5 min", "5 min - 15 min"],
  datasets: [
    {
      label: "Users by devices",
      data: [91.3, 2.3, 1.1, 1.1],
      backgroundColor: ["#FFE576", "#3363FF", "#F65354", "#E18CF9"],
      borderWidth: 0,
    },
  ],
};

const dougnutOptions = {
  maintainAspectRatio: false,
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

const Users = () => {
  return (
    <>
      <div className={statisticsStyles.card}>
      <CardContainer style={{ width: '400px', height: '300px' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Visits duration</h3>

            <PieChart data={doughnutData} options={dougnutOptions} width={350} height={250}
            >
            </PieChart>
          </div>
        </CardContainer>

        <CardContainer style={{ width: '600px', height: '300px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Geolocation</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={rows} headers={headers} minWidth={450}></TableComponent>
            </div>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Users;
