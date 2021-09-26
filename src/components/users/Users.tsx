import PieChart from "../../ui-components/chart/PieChart";
import CardContainer from "../../ui-components/card/Card";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import TableComponent from '../../ui-components/table/Table';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import statisticsStyles from "../statistics/Statistics.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";

const cardWidth = "280px";
const cardHeight = "104px";

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

const keywordHeaders = [
  { value: 'Keyword', alignment: TableAlignment.LEFT },
  { value: 'Clicks', alignment: TableAlignment.RIGHT },
  { value: 'Impressions', alignment: TableAlignment.RIGHT }
];

const keywordRows = [
  { data: [{ 'row-0': 'esentico', alignment: TableAlignment.LEFT }, { 'row-1': 5, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'boki doo', alignment: TableAlignment.LEFT }, { 'row-1': 4, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'ruska caga', alignment: TableAlignment.LEFT }, { 'row-1': 14, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'esentico boki doo', alignment: TableAlignment.LEFT }, { 'row-1': 12, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'caga cajetina', alignment: TableAlignment.LEFT }, { 'row-1': 47, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] }
];

const filetypeRows = [
  { data: [{ 'row-0': 'javascript file', alignment: TableAlignment.LEFT }, { 'row-1': 5, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'png image', alignment: TableAlignment.LEFT }, { 'row-1': 4, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'txt file', alignment: TableAlignment.LEFT }, { 'row-1': 14, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] },
  { data: [{ 'row-0': 'html file', alignment: TableAlignment.LEFT }, { 'row-1': 12, alignment: TableAlignment.RIGHT }, { 'row-2': 2, alignment: TableAlignment.RIGHT }] }
]; 

const filetypeHeaders = [
  { value: 'File', alignment: TableAlignment.LEFT },
  { value: 'Clicks', alignment: TableAlignment.RIGHT },
  { value: 'Impressions', alignment: TableAlignment.RIGHT }
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
      <CardContainer style={{ width: cardWidth, height: cardHeight }}>
          <div className={statisticsStyles["card__content"]}>
            <span
              className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--user"]}`}
            >
              <PhoneAndroidIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={statisticsStyles["card__content--value"]}>
                19k
                <span
                  className={`${statisticsStyles["card__content--subheader"]} ${statisticsStyles["card__content--subheader-decrease"]}`}
                >
                  <KeyboardArrowDownIcon />
                  23.74%
                </span>
              </h3>
              <span className={statisticsStyles["card__content--label"]}>
                Mobile phone users
              </span>
            </div>
          </div>
        </CardContainer>
        <CardContainer style={{ width: cardWidth, height: cardHeight }}>
          <div className={statisticsStyles["card__content"]}>
            <span
              className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--comment"]}`}
            >
              <DesktopMacIcon sx={{ fontSize: 35, color: "#D96FF8" }} />
            </span>
            <div>
              <h3 className={statisticsStyles["card__content--value"]}>
                683
                <span
                  className={`${statisticsStyles["card__content--subheader"]} ${statisticsStyles["card__content--subheader-increase"]}`}
                >
                  <KeyboardArrowUpIcon />
                  67.37%
                </span>
              </h3>
              <span className={statisticsStyles["card__content--label"]}>
                Desktop PC users
              </span>
            </div>
          </div>
        </CardContainer>
      </div>
      <div className={statisticsStyles.card}>
        <CardContainer style={{ width: '600px', height: '300px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Geolocation</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={rows} headers={headers} minWidth={450}></TableComponent>
            </div>
          </div>
        </CardContainer>

        <CardContainer style={{ width: '400px', height: '300px' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Visits duration</h3>

            <PieChart data={doughnutData} options={dougnutOptions} width={350} height={250}
            >
            </PieChart>
          </div>
        </CardContainer>
      </div>

      <div className={statisticsStyles.card}>
        <CardContainer style={{ width: '500px', height: '280px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Keywords</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={keywordRows} headers={keywordHeaders} minWidth={450}></TableComponent>
            </div>
          </div>
        </CardContainer>

        <CardContainer style={{ width: '500px', height: '280px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>File type</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={filetypeRows} headers={filetypeHeaders} minWidth={450}></TableComponent>
            </div>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Users;
