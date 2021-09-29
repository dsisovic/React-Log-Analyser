import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
import overviewStyles from "../overview/Overview.module.scss";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StatsCard from '../../ui-components/stats-card/StatsCard';
import DoughnutChart from "../../ui-components/chart/DoughnutChart";
import { IEventStore } from '../../store/ts/models/event-store.model';
import LoaderStack from '../../ui-components/loader-stack/LoaderStack';
import ModuleModal from '../../ui-components/module-modal/ModuleModal';
import { dougnutOptions, getLineOptions } from '../../ui-components/chart/util/chart-util';
import * as eventDataUtility from './event-data-util';
import * as mainUtil from '../../utils/main-util';

const cardWidth = "280px";
const cardHeight = "104px";

const Events = () => {
  const { t } = useTranslation('index');
  const dispatch = useDispatch();

  const attackHeaders = mainUtil.getTableHeaders([t('events.attacker'), t('events.numberOfAttackers')], 2);

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

  const dougnutChartData = eventDataUtility.getDoughnutData(data, 
    [t('events.userLogin'), t('events.userLogout'), t('events.fileDataWrite'), t('events.serviceStart'), t('events.malwareAttack')
  ]);
  const { showBandwidthUpIcon, totalBandwidthPercentage } = eventDataUtility.getTotalBandwidthPercentage(bandwidthData);

  const totalPercentage = useCallback(() => eventDataUtility.getTotalEventsForTheWeek(data), [data]);
  const bandwidth = useCallback(() => eventDataUtility.getTotalDataTraffic(bandwidthData), [bandwidthData]);
  const numberOfAttacks = useCallback(() => eventDataUtility.getTotalEventsForTheWeek(data, EventType.MALWARE_ATTACK), [data]);

  return (
    <>
      <ModuleModal isLoading={isLoading} showErrorModal={showErrorModal}/>

      <div className={overviewStyles.card}>
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
            label={t('events.card1')}
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
            label={t('events.card2')}
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
            label={t('events.card3')}
          />}
      </div>

      <div className={overviewStyles.card}>
        {
          isLoading && <LoaderStack>
            <Skeleton variant="rectangular" width={700} height={300} />
          </LoaderStack>
        }

        {
          !isLoading && <CardContainer
            style={{ width: '700px', height: '330px' }}
          >
            <div className={`${overviewStyles["card__content--chart"]}`}>
              <h3>{t('events.allEventsTitle')}</h3>

              <LineChart data={eventDataUtility.getLineData(data, t('events.numberOfEventsTitle'))} options={memoizedLineOptions} width={650} height={230}></LineChart>
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
            style={{ width: '400px', height: '330px' }}
          >
            <div className={`${overviewStyles["card__content--chart"]}`}>
              <h3>{t('events.allEventsTypeTitle')}</h3>

              <DoughnutChart data={dougnutChartData} options={memoizedDougnutOptions} width={380} height={250}
              >
              </DoughnutChart>
            </div>
          </CardContainer>
        }
      </div>

      <div className={overviewStyles.card}>

        {
          isLoading && <LoaderStack>
            <Skeleton variant="rectangular" width={500} height={260} />
          </LoaderStack>
        }

        {!isLoading &&
          <CardContainer style={{ width: '500px', height: '260px', overflow: 'auto' }}>
            <div className={`${overviewStyles["card__content--chart"]}`}>
              <h3>{t('events.attackers')}</h3>

              <div className={`${overviewStyles["card__content"]}`}>
                <TableComponent rows={eventDataUtility.getAttackTableRows(attackData)} headers={attackHeaders} minWidth={450}></TableComponent>
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
          <div className={`${overviewStyles["card__content--chart"]}`}>
            <h3>{t('events.trafficTitle')}</h3>

            <BarChart data={eventDataUtility.getTrafficChartData(bandwidthData)} options={memoizedBarOptions} width={560} height={190}></BarChart>
          </div>
        </CardContainer>}
      </div>
    </>
  );
};

export default Events;
