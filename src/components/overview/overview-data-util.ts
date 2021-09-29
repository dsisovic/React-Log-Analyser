import { UserType } from "./ts/enums/user-type.enum";
import { IOverviewItem } from "./ts/models/overview-item.model";
import { IOverviewVisitor } from "./ts/models/overview-visitor.model";
import * as mainUtil from '../../utils/main-util';

const getNumberOfVisitorsByDate = (labels: string[], data: IOverviewVisitor[], userType: UserType) => {
  return labels.map(label => {
    const matchingLabelEvents = data.filter(dataItem => dataItem.datetime.startsWith(label) && dataItem.value === userType);

    return matchingLabelEvents.length;
  });
}

export const transformOverviewData = (data: string | null) => {
  if (data) {
    return data
      .split(/\r?\n/)
      .map(rowItem => {
        const [, dateTimeValue, , value,] = rowItem.split(' ');
        const [date, time] = dateTimeValue.split('-');
        const datetime = `${date} ${time}`;

        return { datetime, value: value || "" };
      });
  }

  return [];
}

export const getOnlineUsers = (data: IOverviewItem[]) => data.length;

export const getTotalUsersPercentage = (data: IOverviewVisitor[], userType: UserType) => {
  const visitors = mainUtil.getUniqueItemsFromTheRange<IOverviewVisitor>(data, 'datetime', -14);

  const last7DaysEvents = mainUtil.getNumberOfEventsByDate(visitors.slice(-7), data, userType);
  const previous7DaysEvents = mainUtil.getNumberOfEventsByDate(visitors.slice(0, 7), data, userType);

  const showUpIcon = last7DaysEvents > previous7DaysEvents;
  const totalPercentage = ((last7DaysEvents / previous7DaysEvents)).toFixed(1);

  return { showUpIcon, totalPercentage };
}

export const getNumberOfVisitors = (data: IOverviewVisitor[], userType: UserType) => {
  const visitors = mainUtil.getUniqueItemsFromTheRange<IOverviewVisitor>(data, 'datetime', -14);

  return mainUtil.getNumberOfEventsByDate(visitors.slice(-7), data, userType);
}

export const getTotalNumberOfVisitors = (data: IOverviewVisitor[]) => data.length;

export const getLineChartVisitorsData = (data: IOverviewVisitor[], newVisitorsLabel: string, existingVisitorsLabel: string) => {
  const labels = mainUtil.getUniqueItemsFromTheRange<IOverviewVisitor>(data, 'datetime', -14);

  return {
    labels,
    datasets: [
      {
        label: newVisitorsLabel,
        data: getNumberOfVisitorsByDate(labels, data, UserType.NEW),
        fill: false,
        backgroundColor: mainUtil.BLUE_COLOR,
        borderColor: mainUtil.LIGHT_BLUE_COLOR
      },
      {
        label: existingVisitorsLabel,
        data: getNumberOfVisitorsByDate(labels, data, UserType.EXISTING),
        fill: false,
        backgroundColor: mainUtil.PURPLE_COLOR,
        borderColor: mainUtil.LIGHT_PURPLE_COLOR
      },
    ],
  };
}

export const getReferralsTableRows = (data: IOverviewItem[]) => {
  return mainUtil.getTableRows<IOverviewItem>(data, 'value', false).map(rowItem => {
    return {
      data: rowItem.data.map((rowDataItem, rowDataIndex) => {
        if (rowDataIndex === 0) {
          const referralValue = rowDataItem['row-0'] as string;
          const newReferralSource = referralValue.charAt(0).toUpperCase() + referralValue.slice(1, referralValue.length).toLowerCase();

          return { ...rowDataItem, 'row-0': newReferralSource };
        }

        return rowDataItem;
      })
    }
  });
}