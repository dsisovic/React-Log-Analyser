import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TabletIcon from '@mui/icons-material/Tablet';
import { loadUserData } from '../../store/UsersIndex';
import { IUserLog } from "./ts/models/user-log.model";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import PieChart from "../../ui-components/chart/PieChart";
import CardContainer from "../../ui-components/card/Card";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import TableComponent from '../../ui-components/table/Table';
import overviewStyles from "../overview/Overview.module.scss";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import StartsCard from "../../ui-components/stats-card/StatsCard";
import { IUserStore } from '../../store/ts/models/user-store.model';
import { IUserKeywordLog } from "./ts/models/user-keyword-log.model";
import ModuleModal from "../../ui-components/module-modal/ModuleModal";
import LoaderStack from '../../ui-components/loader-stack/LoaderStack';
import { UserLogDeviceType } from './ts/enums/user-log-device-type.enum';
import { dougnutOptions } from '../../ui-components/chart/util/chart-util';
import * as mainUtil from '../../utils/main-util';
import * as userDataUtil from './users-data-util'; 

const cardWidth = "280px";
const cardHeight = "104px";

const Users = () => {
  const { t } = useTranslation('index');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  const { isLoading, data, keywordsData, showErrorModal } = useSelector((state: IUserStore) => state.users);

  const memoizedDougnutOptions = useMemo(() => dougnutOptions, []);
  
  const geolocationTableHeaders = mainUtil.getTableHeaders([t('users.country'), t('overview.users')], 2);
  const keywordTableHeaders = mainUtil.getTableHeaders([t('users.keywordHeader'), t('users.typed')], 2);
  const fileTypeTableHeaders = mainUtil.getTableHeaders([t('users.file'), t('users.downloaded')], 2);

  const tabletUsersCallback = useCallback(() => userDataUtil.getNumberOfDeviceTypes(data, UserLogDeviceType.TABLET), [data]);
  const pcUsersCallback = useCallback(() => userDataUtil.getNumberOfDeviceTypes(data, UserLogDeviceType.PERSONAL_COMPUTER), [data]);
  const mobilePhoneUsersCallback = useCallback(() => userDataUtil.getNumberOfDeviceTypes(data, UserLogDeviceType.MOBILE_PHONE), [data]);

  return (
    <>
      <ModuleModal isLoading={isLoading} showErrorModal={showErrorModal} />

      <div className={overviewStyles.card}>

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        } 

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<PhoneAndroidIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={mobilePhoneUsersCallback} totalEventsPercentage={''} showPercentageIcon={false}
          label={t('users.card1')}
        /> 
        }

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<DesktopMacIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={pcUsersCallback} totalEventsPercentage={''} showPercentageIcon={false}
          label={t('users.card2')}
        />
        }

        {isLoading && <LoaderStack>
          <Skeleton variant="circular" width={70} height={70} />
          <Skeleton variant="rectangular" width={210} height={cardHeight} />
        </LoaderStack>
        }

        {!isLoading && <StartsCard cardWidth={cardWidth} cardHeight={cardHeight} icon={<TabletIcon sx={{ fontSize: 35, color: mainUtil.BLUE_BACKGROUND }} />}
          percentageCallback={tabletUsersCallback} totalEventsPercentage={''} showPercentageIcon={false}
          label={t('users.card3')}
        />
        }
      </div>

      <div className={overviewStyles.card}>
        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={600} height={300} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '600px', height: '300px', overflow: 'auto' }}>
          <div className={`${overviewStyles["card__content--chart"]}`}>
            <h3>{t('users.geolocation')}</h3>

            <div className={`${overviewStyles["card__content"]}`}>
              <TableComponent rows={mainUtil.getTableRows<IUserLog>(data, 'country', true, t, 'users')}
                headers={geolocationTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>
        }

        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={400} height={300} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '400px', height: '300px', overflow: 'auto' }}>
          <div className={`${overviewStyles["card__content--chart"]}`}>
            <h3>{t('users.visits')}</h3>

            <PieChart data={userDataUtil.getVisitsDurationData(data)} options={memoizedDougnutOptions} width={350} height={230}
            >
            </PieChart>
          </div>
        </CardContainer>}
      </div>

      <div className={overviewStyles.card}>
        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={500} height={280} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '500px', minHeight: '290px', maxHeight: '38vh', overflow: 'auto' }}>
          <div className={`${overviewStyles["card__content--chart"]}`}>
            <h3>{t('users.keyword')}</h3>

            <div className={`${overviewStyles["card__content"]}`}>
              <TableComponent rows={mainUtil.getTableRows<IUserKeywordLog>(keywordsData, 'keyword', false)}
                headers={keywordTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>}

        {isLoading && <LoaderStack>
          <Skeleton variant="rectangular" width={500} height={280} />
        </LoaderStack>
        }

        {!isLoading && <CardContainer style={{ width: '500px',minHeight: '290px', maxHeight: '38vh', overflow: 'auto' }}>
          <div className={`${overviewStyles["card__content--chart"]}`}>
            <h3>{t('users.fileType')}</h3>

            <div className={`${overviewStyles["card__content"]}`}>
              <TableComponent rows={mainUtil.getTableRows<IUserLog>(data, 'filetTypeUI', false, t, 'users')}
                headers={fileTypeTableHeaders} minWidth={450} />
            </div>
          </div>
        </CardContainer>}
      </div>
    </>
  );
};

export default Users;
