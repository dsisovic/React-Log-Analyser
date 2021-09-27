import Modal from "../../ui-components/modal/Modal";
import TabletIcon from '@mui/icons-material/Tablet';
import { loadUserData } from '../../store/UsersIndex';
import { IUserLog } from "./ts/models/user-log.model";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import PieChart from "../../ui-components/chart/PieChart";
import CardContainer from "../../ui-components/card/Card";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import TableComponent from '../../ui-components/table/Table';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import StartsCard from "../../ui-components/stats-card/StartsCard";
import statisticsStyles from "../statistics/Statistics.module.scss";
import { IUserStore } from '../../store/ts/models/user-store.model';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { IUserKeywordLog } from "./ts/models/user-keyword-log.model";
import { UserLogDeviceType } from './ts/enums/user-log-device-type.enum';
import { dougnutOptions } from '../../ui-components/chart/util/chart-util';
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as mainUtil from '../../utils/main-util';
import * as userDataUtil from './users-data-util';

const cardWidth = "280px";
const cardHeight = "104px";

const geolocationTableHeaders = [
  { value: 'Country', alignment: TableAlignment.LEFT },
  { value: 'Number of visits', alignment: TableAlignment.RIGHT }
];

const keywordHeaders = [
  { value: 'Keyword', alignment: TableAlignment.LEFT },
  { value: 'Typed', alignment: TableAlignment.RIGHT }
];

const fileTypeHeaders = [
  { value: 'File', alignment: TableAlignment.LEFT },
  { value: 'Downloaded', alignment: TableAlignment.RIGHT }
];

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  const { isLoading, data, keywordsData, showErrorModal } = useSelector((state: IUserStore) => state.users);

  const memoizedDougnutOptions = useMemo(() => dougnutOptions, []);
  const memoizedKeywordTableHeaders = useMemo(() => keywordHeaders, []);
  const memoizedFileTypeTableHeaders = useMemo(() => fileTypeHeaders, []);
  const memoizedGeolocationTableHeaders = useMemo(() => geolocationTableHeaders, []);


  const tabletUsers = useCallback(() => userDataUtil.getNumberOfDeviceTypes(data, UserLogDeviceType.TABLET), [data]);
  const pcUsers = useCallback(() => userDataUtil.getNumberOfDeviceTypes(data, UserLogDeviceType.PERSONAL_COMPUTER), [data]);
  const mobilePhoneUsers = useCallback(() => userDataUtil.getNumberOfDeviceTypes(data, UserLogDeviceType.MOBILE_PHONE), [data]);

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
        <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<PhoneAndroidIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={mobilePhoneUsers} totalEventsPercentage={''} showPercentageIcon={false}
          label="Mobile phone users"
        />

        <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<DesktopMacIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={pcUsers} totalEventsPercentage={''} showPercentageIcon={false}
          label="Desktop PC users"
        />

        <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<TabletIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={tabletUsers} totalEventsPercentage={''} showPercentageIcon={false}
          label="Tablet users"
        />
      </div>
      <div className={statisticsStyles.card}>
        <CardContainer style={{ width: '600px', height: '300px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Geolocation</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={userDataUtil.getTableRows<IUserLog>(data, 'country', true)}
                headers={memoizedGeolocationTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>

        <CardContainer style={{ width: '400px', height: '300px' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>Visits duration</h3>

            <PieChart data={userDataUtil.getVisitsDurationData(data)} options={memoizedDougnutOptions} width={350} height={250}
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
              <TableComponent rows={userDataUtil.getTableRows<IUserKeywordLog>(keywordsData, 'keyword', false)}
                headers={memoizedKeywordTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>

        <CardContainer style={{ width: '500px', height: '280px', overflow: 'auto' }}>
          <div className={`${statisticsStyles["card__content--chart"]}`}>
            <h3>File type</h3>

            <div className={`${statisticsStyles["card__content"]}`}>
              <TableComponent rows={userDataUtil.getTableRows<IUserLog>(data, 'filetTypeUI', false)}
                headers={memoizedFileTypeTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Users;
