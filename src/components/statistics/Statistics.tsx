import styles from "./Statistics.module.scss";
import List from "../../ui-components/list/List";
import Card from "../../ui-components/card/Card";
import PublicIcon from "@mui/icons-material/Public";
import GoogleIcon from '@mui/icons-material/Google';
import MessageIcon from "@mui/icons-material/Message";
import FacebookIcon from '@mui/icons-material/Facebook';
import LineChart from "../../ui-components/chart/LineChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoughnutChart from "../../ui-components/chart/DoughnutChart";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const cardWidth = "280px";
const cardHeight = "104px";

const doughnutData = {
  labels: ["Mobile", "Tablet", "Laptop", "Desktop PC"],
  datasets: [
    {
      label: "Users by devices",
      data: [12, 19, 3, 5],
      backgroundColor: ["#FFE576", "#3363FF", "#F65354", "#E18CF9"],
      borderWidth: 0,
    },
  ],
};

const lineData = {
  labels: ['April', 'May', 'June', 'July', 'August', 'September'],
  datasets: [
    {
      label: 'New Visitors',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: '#003CFF',
      borderColor: 'rgba(0, 60, 255, 0.2)'
    },
    {
      label: 'Returning Visitors',
      data: [18, 5, 16, 55, 29, 36],
      fill: false,
      backgroundColor: '#D96FF8',
      borderColor: 'rgba(217, 111, 248, 0.2)'
    },
  ],
};

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

const refferalsData = [
  {
    iconToUse: <GoogleIcon sx={{ fontSize: 30, color: "#18BA92" }} />,
    name: 'google',
    service: 'google.com',
    users: 45904
  },
  {
    iconToUse: <FacebookIcon sx={{ fontSize: 30, color: "#003CFF" }} />,
    name: 'facebook',
    service: 'facebook.com',
    users: 20796
  }
];

const mostPopularPagesData = [
  {
    name: '/en-en/p/products',
    pageViews: 5948
  },
  {
    name: '/en-en/p/signup',
    pageViews: 6025
  },
  {
    name: '/en-en/p/home',
    pageViews: 1439
  }
];

const Statistics = () => {
  return (
    <>
      <div className={styles.card}>
        <Card style={{ width: cardWidth, height: cardHeight }}>
          <div className={styles["card__content"]}>
            <span
              className={`${styles["card__icon"]} ${styles["card__icon--globe"]}`}
            >
              <PublicIcon sx={{ fontSize: 35, color: "#18BA92" }} />
            </span>
            <div>
              <h3 className={styles["card__content--value"]}>279</h3>
              <span className={styles["card__content--label"]}>
                Online users
              </span>
            </div>
          </div>
        </Card>
        <Card style={{ width: cardWidth, height: cardHeight }}>
          <div className={styles["card__content"]}>
            <span
              className={`${styles["card__icon"]} ${styles["card__icon--user"]}`}
            >
              <AccountCircleIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={styles["card__content--value"]}>
                19k
                <span
                  className={`${styles["card__content--subheader"]} ${styles["card__content--subheader-decrease"]}`}
                >
                  <KeyboardArrowDownIcon />
                  23.74%
                </span>
              </h3>
              <span className={styles["card__content--label"]}>
                Subscribers this week
              </span>
            </div>
          </div>
        </Card>
        <Card style={{ width: cardWidth, height: cardHeight }}>
          <div className={styles["card__content"]}>
            <span
              className={`${styles["card__icon"]} ${styles["card__icon--comment"]}`}
            >
              <MessageIcon sx={{ fontSize: 35, color: "#D96FF8" }} />
            </span>
            <div>
              <h3 className={styles["card__content--value"]}>
                683
                <span
                  className={`${styles["card__content--subheader"]} ${styles["card__content--subheader-increase"]}`}
                >
                  <KeyboardArrowUpIcon />
                  67.37%
                </span>
              </h3>
              <span className={styles["card__content--label"]}>
                Comments this week
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.card}>
        <Card
          style={{ width: '400px', height: '336px' }}
        >
          <div className={`${styles["card__content--chart"]}`}>
            <h3>Users by devices</h3>

            <DoughnutChart data={doughnutData} options={dougnutOptions} width={350} height={300}
            >
              <span className={styles['card__content--chart-value']}>2846</span>
              <span className={styles['card__content--chart-label']}>Total</span>
            </DoughnutChart>
          </div>
        </Card>

        <Card
          style={{ width: '700px', height: '336px' }}
        >
          <div className={`${styles["card__content--chart"]}`}>
            <h3>Visitors</h3>

            <h2 className={`${styles['card__content--chart-subheader']}`}>254852</h2>
            <div className={`${styles['card__content--chart-subheader-container']}`}>
              <h5 className={`${styles['card__content--chart-subheader-label']}`}>New / Returning</h5>
              <h5 className={`${styles['card__content--chart-subheader-label']}`}>45762 / 2491</h5>
            </div>

            <LineChart data={lineData} options={lineOptions} width={650} height={190}></LineChart>
          </div>
        </Card>
      </div>

      <div className={styles.card}>
        <Card
          style={{ width: '500px', height: '250px' }}
        >
          <div className={`${styles["card__content--chart"]}`}>
            <h3>Referrals</h3>

            <List firstColumn='Source' secondColumn='Users'>
              {
                refferalsData.map(refferalData => {
                  const { iconToUse, service, users, name } = refferalData;

                  return <div className={styles['list__item']} key={service}>
                    <div className={styles['list__item--label']}>
                      <span className={`${styles["card__icon"]} ${styles['list__item--icon']} ${styles[`list__item--icon-${name}`]}`}>
                        {iconToUse}
                      </span>

                      {service}
                    </div>
                    <div className={styles['list__item--value']}>{users}</div>
                  </div>;
                })
              }
            </List>
          </div>
        </Card>

        <Card
          style={{ width: '500px', height: '250px' }}
        >
          <div className={`${styles["card__content--chart"]}`}>
            <h3>Most Popular Pages</h3>

            <List firstColumn='Page' secondColumn='Unique page views'>
              {
                mostPopularPagesData.map((pageDataItem, index) => {
                  const { name, pageViews } = pageDataItem;

                  return <div className={styles['list__item']} key={name}>
                    <div className={styles['list__item--label']}>
                      <span className={`${styles["card__icon"]} ${styles['list__item--icon']}`}>
                        <b>{index + 1}</b>
                      </span>
                      {name}
                    </div>
                    <div className={styles['list__item--value']}>{pageViews}</div>
                  </div>;
                })
              }
            </List>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Statistics;
