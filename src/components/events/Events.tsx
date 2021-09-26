import { useEffect } from 'react';
import { Skeleton, Stack } from '@mui/material';
import { loadEvents } from '../../store/EventIndex';
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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { dougnutOptions, getLineOptions } from '../../ui-components/chart/util/chart-util';
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as eventDataUtility from './event-data-util';

const cardWidth = "280px";
const cardHeight = "104px";

const attackHeaders = [
  { value: 'Attacker', alignment: TableAlignment.LEFT },
  { value: 'Number of attacks', alignment: TableAlignment.RIGHT }
];

const Events = () => {
  const dispatch = useDispatch();
  const { isLoading, data, attackData, bandwidthData } = useSelector((state: IEventStore) => state.events);

  const {
    showUpIcon: showEventsUpIcon, totalPercentage: totalEventsPercentage
  } = eventDataUtility.getTotalEventsPercentage(data);
  const {
    showUpIcon: showAttacksUpIcon, totalPercentage: totalAttacksPercentage
  } = eventDataUtility.getTotalEventsPercentage(data, EventType.MALWARE_ATTACK);

  const { showBandwidthUpIcon, totalBandwidthPercentage } =  eventDataUtility.getTotalBandwidthPercentage(bandwidthData);

  useEffect(() => {
    dispatch(loadEvents());
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
                {eventDataUtility.getTotalDataTraffic(bandwidthData)}
                <span
                  className={`${statisticsStyles["card__content--subheader"]} 
                  ${statisticsStyles[`card__content--subheader-${showBandwidthUpIcon ? 'increase' : 'decrease'}`]}`}
                >
                  {!showBandwidthUpIcon && <KeyboardArrowDownIcon />}
                  {showBandwidthUpIcon && <KeyboardArrowUpIcon />}
                  {totalBandwidthPercentage}%
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

            <LineChart data={eventDataUtility.getLineData(data)} options={getLineOptions()} width={650} height={230}></LineChart>
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
            <h3>Total traffic by ports</h3>

            <BarChart data={eventDataUtility.getTrafficChartData(bandwidthData)} options={getLineOptions('B')} width={560} height={190}></BarChart>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Events;
