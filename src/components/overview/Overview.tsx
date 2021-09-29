import { Skeleton } from "@mui/material";
import styles from "./Overview.module.scss";
import { useTranslation } from "react-i18next";
import PublicIcon from "@mui/icons-material/Public";
import { UserType } from "./ts/enums/user-type.enum";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import CardContainer from "../../ui-components/card/Card";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LineChart from "../../ui-components/chart/LineChart";
import { loadOverviewData } from "../../store/OverviewIndex";
import TableComponent from "../../ui-components/table/Table";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { IOverviewItem } from "./ts/models/overview-item.model";
import { IOverviewStore } from "./ts/models/overview-store.model";
import StartsCard from "../../ui-components/stats-card/StatsCard";
import LoaderStack from "../../ui-components/loader-stack/LoaderStack";
import ModuleModal from "../../ui-components/module-modal/ModuleModal";
import { getLineOptions } from "../../ui-components/chart/util/chart-util";
import * as overviewDataUtil from './overview-data-util';
import * as mainUtil from '../../utils/main-util';

const cardWidth = "280px";
const cardHeight = "104px";

const Overview = () => {
  const { t } = useTranslation('index');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOverviewData());
  }, [dispatch]);

  const { isLoading, showErrorModal, activeUsers, visitors, referrals, pages } = useSelector((state: IOverviewStore) => state.overview);

  const memoizedLineOptions = useMemo(() => getLineOptions(), []);
  const pageVisitsTableHeaders = mainUtil.getTableHeaders([t('overview.page'), t('overview.users')], 2);
  const referrentTableHeaders = mainUtil.getTableHeaders([t('overview.referrent'), t('overview.users')], 2);

  const totalNumberOfVisitors = overviewDataUtil.getTotalNumberOfVisitors(visitors);
  const chartDataCallback = overviewDataUtil.getLineChartVisitorsData(visitors, t('overview.chartLabel1'), t('overview.chartLabel2'));

  const onlineUsersCallback = useCallback(() => overviewDataUtil.getOnlineUsers(activeUsers), [activeUsers]);
  const newUsersCallback = useCallback(() => overviewDataUtil.getNumberOfVisitors(visitors, UserType.NEW), [visitors]);
  const existingUsersCallback = useCallback(() => overviewDataUtil.getNumberOfVisitors(visitors, UserType.EXISTING), [visitors]);

  const { showUpIcon: showUpNewVisitors, totalPercentage: totalNewUsers } = overviewDataUtil.getTotalUsersPercentage(visitors, UserType.NEW);
  const { showUpIcon: showUpExistingVisitors, totalPercentage: totalExistingUsers } = overviewDataUtil.getTotalUsersPercentage(visitors, UserType.EXISTING);

  return (
    <>
      <ModuleModal isLoading={isLoading} showErrorModal={showErrorModal} />

      <div className={styles.card}>

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<PublicIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={onlineUsersCallback} totalEventsPercentage={''} showPercentageIcon={false}
          label={t('overview.card1')}
        />}

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<PersonAddIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={newUsersCallback} totalEventsPercentage={totalNewUsers} showPercentageIcon={true} showUpIcon={showUpNewVisitors}
          label={t('overview.card2')}
        />}

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<VerifiedUserIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={existingUsersCallback} totalEventsPercentage={totalExistingUsers} showPercentageIcon={true} showUpIcon={showUpExistingVisitors}
          label={t('overview.card3')}
        />}

      </div>

      <div className={styles.card}>

        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={1015} height={336} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer
          style={{ width: '1015px', height: '336px' }}
        >
          <div className={`${styles["card__content--chart"]}`}>
            <h3>{t('overview.chartTitle')}</h3>

            <h2 className={`${styles['card__content--chart-subheader']}`}>{totalNumberOfVisitors}</h2>

            <LineChart data={chartDataCallback} options={memoizedLineOptions} width={970} height={200}></LineChart>
          </div>
        </CardContainer>}
      </div>

      <div className={styles.card}>

        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={500} height={250} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '500px', height: '250px', overflow: 'auto' }}>
          <div className={`${styles["card__content--chart"]}`}>
            <h3>{t('overview.referralsTitle')}</h3>

            <div className={`${styles["card__content"]}`}>
              <TableComponent rows={overviewDataUtil.getReferralsTableRows(referrals)}
                headers={referrentTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>}

        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={500} height={250} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '500px', height: '250px', overflow: 'auto' }}>
          <div className={`${styles["card__content--chart"]}`}>
            <h3>{t('overview.pageVisitsTitle')}</h3>

            <div className={`${styles["card__content"]}`}>
              <TableComponent rows={mainUtil.getTableRows<IOverviewItem>(pages, 'value', false)}
                headers={pageVisitsTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>}
      </div>
    </>
  );
};

export default Overview;
