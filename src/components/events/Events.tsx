import { useEffect } from 'react';
import styles from './Events.module.scss';
import TrafficIcon from '@mui/icons-material/Traffic';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from './ts/enums/event-type.enum';
import Loader from '../../ui-components/loader/Loader';
import SecurityIcon from '@mui/icons-material/Security';
import BarChart from "../../ui-components/chart/BarChart";
import CardContainer from "../../ui-components/card/Card";
import LineChart from "../../ui-components/chart/LineChart";
import TableComponent from "../../ui-components/table/Table";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DoughnutChart from "../../ui-components/chart/DoughnutChart";
import statisticsStyles from "../statistics/Statistics.module.scss";
import { IEventStore } from '../../store/ts/models/event-store.model';
import { loadEvents, loadAttackEvents } from '../../store/EventIndex';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { dougnutOptions, lineOptions } from '../../ui-components/chart/util/chart-util';
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as eventDataUtility from './event-data-util';
import * as eventsUtil from './events-util';
import { Skeleton, Stack } from '@mui/material';

const cardWidth = "280px";
const cardHeight = "104px";

const barData = {
  labels: ['443', '80', '445', 'Others'],
  datasets: [
    {
      label: '443',
      data: [54, 0, 0, 0],
      fill: false,
      backgroundColor: eventsUtil.YELLOW_COLOR
    },
    {
      label: '80',
      data: [0, 80, 0, 0],
      fill: false,
      backgroundColor: eventsUtil.BLUE_COLOR
    },
    {
      label: '445',
      data: [0, 0, 445, 0],
      fill: false,
      backgroundColor: eventsUtil.RED_COLOR
    },
    {
      label: 'Others',
      data: [0, 0, 0, 1993],
      fill: false,
      backgroundColor: eventsUtil.PURPLE_COLOR
    }
  ],
};

const attackHeaders = [
  { value: 'Attacker', alignment: TableAlignment.LEFT },
  { value: 'Number of attacks', alignment: TableAlignment.RIGHT }
];

const Events = () => {
  const dispatch = useDispatch();
  const { isLoading, data, attackData } = useSelector((state: IEventStore) => state.events);

  const {
    showUpIcon: showEventsUpIcon, totalPercentage: totalEventsPercentage
  } = eventDataUtility.getTotalEventsPercentage(data);
  const {
    showUpIcon: showAttacksUpIcon, totalPercentage: totalAttacksPercentage
  } = eventDataUtility.getTotalEventsPercentage(data, EventType.MALWARE_ATTACK);

  useEffect(() => {
    dispatch(loadEvents());
    dispatch(loadAttackEvents());
  }, [dispatch]);

  return (
    <>
      <Loader isLoading={isLoading}></Loader>

      <div className={statisticsStyles.card}>
        {/* {
          isLoading &&   <Stack spacing={1} direction="row" alignItems="center">
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </Stack>
        } */}

        <CardContainer style={{ width: cardWidth, height: cardHeight }}>
          <div className={statisticsStyles["card__content"]}>
            <span
              className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--user"]}`}
            >
              <ManageSearchIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={statisticsStyles["card__content--value"]}>
                {eventDataUtility.getTotalEventsForTheWeek(data)}
                <span
                  className={`${statisticsStyles["card__content--subheader"]} 
                  ${statisticsStyles[`card__content--subheader-${showEventsUpIcon ? 'increase' : 'decrease'}`]}`}
                >
                  {!showEventsUpIcon && <KeyboardArrowDownIcon />}
                  {showEventsUpIcon && <KeyboardArrowUpIcon />}
                  {totalEventsPercentage}%
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
                {eventDataUtility.getTotalEventsForTheWeek(data, EventType.MALWARE_ATTACK)}
                <span
                  className={`${statisticsStyles["card__content--subheader"]} 
                  ${statisticsStyles[`card__content--subheader-${showAttacksUpIcon ? 'increase' : 'decrease'}`]}`}
                >
                  {!showAttacksUpIcon && <KeyboardArrowDownIcon />}
                  {showAttacksUpIcon && <KeyboardArrowUpIcon />}
                  {totalAttacksPercentage}%
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
                52
                <span className={styles.unit}>MB</span>
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
            <h3>All Events - last 7 days</h3>

            <LineChart data={eventDataUtility.getLineData(data)} options={lineOptions} width={650} height={230}></LineChart>
          </div>
        </CardContainer>

        <CardContainer
          style={{ width: '400px', height: '300px' }}
        >
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>All events by event type</h3>

            <DoughnutChart data={eventDataUtility.getDoughnutData(data)} options={dougnutOptions} width={350} height={250}
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
              <TableComponent rows={eventDataUtility.getAttackTableRows(attackData)} headers={attackHeaders} minWidth={450}></TableComponent>
            </div>
          </div>
        </CardContainer>

        <CardContainer
          style={{ width: '600px', height: '260px' }}
        >
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Traffic by destination port</h3>

            <BarChart data={barData} options={lineOptions} width={560} height={190}></BarChart>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Events;
