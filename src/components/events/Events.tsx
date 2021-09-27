import Modal from '../../ui-components/modal/Modal';
import { loadEvents } from '../../store/EventIndex';
import TrafficIcon from '@mui/icons-material/Traffic';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from './ts/enums/event-type.enum';
import { useCallback, useEffect, useMemo } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import BarChart from "../../ui-components/chart/BarChart";
import CardContainer from "../../ui-components/card/Card";
import LineChart from "../../ui-components/chart/LineChart";
import TableComponent from "../../ui-components/table/Table";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StatsCard from '../../ui-components/stats-card/StartsCard';
import DoughnutChart from "../../ui-components/chart/DoughnutChart";
import statisticsStyles from "../statistics/Statistics.module.scss";
import { IEventStore } from '../../store/ts/models/event-store.model';
import LoaderStack from '../../ui-components/loader-stack/LoaderStack';
import { Alert, AlertTitle, CircularProgress, Skeleton } from '@mui/material';
import { dougnutOptions, getLineOptions } from '../../ui-components/chart/util/chart-util';
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as eventDataUtility from './event-data-util';
import * as mainUtil from '../../utils/main-util';

const cardWidth = "280px";
const cardHeight = "104px";

const attackHeaders = [
  { value: 'Attacker', alignment: TableAlignment.LEFT },
  { value: 'Number of attacks', alignment: TableAlignment.RIGHT }
];

const Events = () => {
  const dispatch = useDispatch();

  const memoizedTableHeaders = useMemo(() => attackHeaders, []);
  const memoizedLineOptions = useMemo(() => getLineOptions(), []);
  const memoizedDougnutOptions = useMemo(() => dougnutOptions, []);
  const memoizedBarOptions = useMemo(() => getLineOptions('B'), []);

  useEffect(() => {
    dispatch(loadEvents()); 
  }, [dispatch]);

  const { isLoading, data, attackData, bandwidthData, showErrorModal } = useSelector((state: IEventStore) => state.events);

  const {
    showUpIcon: showEventsUpIcon, totalPercentage: totalEventsPercentage
  } = eventDataUtility.getTotalEventsPercentage(data);
  const {
    showUpIcon: showAttacksUpIcon, totalPercentage: totalAttacksPercentage
  } = eventDataUtility.getTotalEventsPercentage(data, EventType.MALWARE_ATTACK);

  const { showBandwidthUpIcon, totalBandwidthPercentage } = eventDataUtility.getTotalBandwidthPercentage(bandwidthData);

  const totalPercentage = useCallback(() => eventDataUtility.getTotalEventsForTheWeek(data), [data]);
  const bandwidth = useCallback(() => eventDataUtility.getTotalDataTraffic(bandwidthData), [bandwidthData]);
  const numberOfAttacks = useCallback(() => eventDataUtility.getTotalEventsForTheWeek(data, EventType.MALWARE_ATTACK), [data]);

  return (
    <>
      <Modal show={isLoading} color={mainUtil.BLUE_COLOR}>
        <CircularProgress color="inherit" />
      </Modal>

      <Modal show={showErrorModal}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Problem occured while fetching data. Please check internet connection!
        </Alert>
      </Modal>

      <div className={statisticsStyles.card}>
        {
          isLoading && <LoaderStack>
            <Skeleton variant="circular" width={70} height={70} />
            <Skeleton variant="rectangular" width={210} height={cardHeight} />
          </LoaderStack>
        }

        {
          !isLoading &&
          <StatsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<ManageSearchIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
            percentageCallback={totalPercentage} showUpIcon={showEventsUpIcon} totalEventsPercentage={totalEventsPercentage} showPercentageIcon={true}
            label="Total events this week"
          />
        }

        {
          isLoading && <LoaderStack>
            <Skeleton variant="circular" width={70} height={70} />
            <Skeleton variant="rectangular" width={210} height={cardHeight} />
          </LoaderStack>
        }

        {
          !isLoading &&
          <StatsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<SecurityIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
            percentageCallback={numberOfAttacks} showUpIcon={showAttacksUpIcon} totalEventsPercentage={totalAttacksPercentage} showPercentageIcon={true}
            label="Blocked attacks this week"
          />
        }

        {
          isLoading && <LoaderStack>
            <Skeleton variant="circular" width={70} height={70} />
            <Skeleton variant="rectangular" width={210} height={cardHeight} />
          </LoaderStack>
        }

        {!isLoading &&
          <StatsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<TrafficIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
            percentageCallback={bandwidth} showUpIcon={showBandwidthUpIcon} totalEventsPercentage={totalBandwidthPercentage} showPercentageIcon={true}
            label=" Data exchanged this week"
          />}
      </div>

      <div className={statisticsStyles.card}>
        {
          isLoading && <LoaderStack>
            <Skeleton variant="rectangular" width={700} height={300} />
          </LoaderStack>
        }

        {
          !isLoading && <CardContainer
            style={{ width: '700px', height: '300px' }}
          >
            <div className={`${statisticsStyles["card__content--chart"]}`}>
              <h3>All Events - last 7 days</h3>

              <LineChart data={eventDataUtility.getLineData(data)} options={memoizedLineOptions} width={650} height={230}></LineChart>
            </div>
          </CardContainer>
        }

        {
          isLoading && <LoaderStack>
            <Skeleton variant="rectangular" width={400} height={300} />
          </LoaderStack>
        }

        {
          !isLoading &&
          <CardContainer
            style={{ width: '400px', height: '300px' }}
          >
            <div className={`${statisticsStyles["card__content--chart"]}`}>
              <h3>All events by event type</h3>

              <DoughnutChart data={eventDataUtility.getDoughnutData(data)} options={memoizedDougnutOptions} width={350} height={250}
              >
              </DoughnutChart>
            </div>
          </CardContainer>
        }
      </div>

      <div className={statisticsStyles.card}>

        {
          isLoading && <LoaderStack>
            <Skeleton variant="rectangular" width={500} height={260} />
          </LoaderStack>
        }

        {!isLoading &&
          <CardContainer style={{ width: '500px', height: '260px', overflow: 'auto' }}>
            <div className={`${statisticsStyles["card__content--chart"]}`}>
              <h3>Attackers</h3>

              <div className={`${statisticsStyles["card__content"]}`}>
                <TableComponent rows={eventDataUtility.getAttackTableRows(attackData)} headers={memoizedTableHeaders} minWidth={450}></TableComponent>
              </div>
            </div>
          </CardContainer>}

        {
          isLoading && <LoaderStack>
            <Skeleton variant="rectangular" width={600} height={260} />
          </LoaderStack>
        }

        {!isLoading && <CardContainer
          style={{ width: '600px', height: '260px' }}
        >
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Total traffic by ports</h3>

            <BarChart data={eventDataUtility.getTrafficChartData(bandwidthData)} options={memoizedBarOptions} width={560} height={190}></BarChart>
          </div>
        </CardContainer>}
      </div>
    </>
  );
};

export default Events;
