import { Skeleton } from "@mui/material";
import styles from "./Overview.module.scss";
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
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as overviewDataUtil from './overview-data-util';
import * as mainUtil from '../../utils/main-util';

const cardWidth = "280px";
const cardHeight = "104px";

const refferalsTableHeaders = [
  { value: 'Source', alignment: TableAlignment.LEFT },
  { value: 'Users', alignment: TableAlignment.RIGHT }
];

const pageVisitsTableHeaders = [
  { value: 'Page', alignment: TableAlignment.LEFT },
  { value: 'Number of users', alignment: TableAlignment.RIGHT }
];

const Overview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOverviewData());
  }, [dispatch]);

  const { isLoading, showErrorModal, activeUsers, visitors, referrals, pages } = useSelector((state: IOverviewStore) => state.overview);

  const memoizedLineOptions = useMemo(() => getLineOptions(), []);
  const memoizedReferralsTableHeaders = useMemo(() => refferalsTableHeaders, []);
  const memoizedPageVisitsTableHeaders = useMemo(() => pageVisitsTableHeaders, []);

  const totalNumberOfVisitors = overviewDataUtil.getTotalNumberOfVisitors(visitors);

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
          label="Online users"
        />}

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<PersonAddIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={newUsersCallback} totalEventsPercentage={totalNewUsers} showPercentageIcon={true} showUpIcon={showUpNewVisitors}
          label="New visitors this week"
        />}

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<VerifiedUserIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={existingUsersCallback} totalEventsPercentage={totalExistingUsers} showPercentageIcon={true} showUpIcon={showUpExistingVisitors}
          label="Returned visitors this week"
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
            <h3>Visitors</h3>

            <h2 className={`${styles['card__content--chart-subheader']}`}>{totalNumberOfVisitors}</h2>

            <LineChart data={overviewDataUtil.getLineChartVisitorsData(visitors)} options={memoizedLineOptions} width={970} height={200}></LineChart>
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
            <h3>Referrals</h3>

            <div className={`${styles["card__content"]}`}>
              <TableComponent rows={overviewDataUtil.getReferralsTableRows(referrals)}
                headers={memoizedReferralsTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>}

        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={500} height={250} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '500px', height: '250px', overflow: 'auto' }}>
          <div className={`${styles["card__content--chart"]}`}>
            <h3>Page visits</h3>

            <div className={`${styles["card__content"]}`}>
              <TableComponent rows={mainUtil.getTableRows<IOverviewItem>(pages, 'value', false)}
                headers={memoizedPageVisitsTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>}
      </div>
    </>
  );
};

export default Overview;
