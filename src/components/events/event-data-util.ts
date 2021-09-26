import { EventType } from "./ts/enums/event-type.enum";
import { IEventItem } from "./ts/models/event-item.model";
import { IEventAttackItem } from "./ts/models/event-attack-item.model";
import { IEventBandwidthItem } from "./ts/models/event-bandwidth-item.model";
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as eventsUtil from './events-util';
import * as mainUtil from '../../utils/main-util';

const trafficChartDataColors = [
  eventsUtil.YELLOW_COLOR, eventsUtil.BLUE_COLOR, eventsUtil.RED_COLOR, eventsUtil.PURPLE_COLOR
];

const getPiePercentage = (data: IEventItem[], typeValue: EventType) => {
  return +((data.filter(dataItem => dataItem.value === typeValue).length / data.length) * 100).toFixed(1);
}

const getUniqueItemsFromTheRange = <T>(data: T[], key: keyof T, sliceOffset: number) => {
  return Array
    .from(new Set(data.map(dataItem => (dataItem[key] as unknown as string).split(' ')[0])))
    .slice(sliceOffset);
}

const getNumberOfEventsByDate = (labels: string[], data: IEventItem[], eventType?: EventType) => {
  return labels.reduce((accumulator, label) => {
    const matchingLabelEvents = data.filter(dataItem => {
      const { datetime, value } = dataItem;
      const typeMatches = !eventType ? true : value === eventType;

      return typeMatches && datetime.startsWith(label);
    });

    return accumulator + matchingLabelEvents.length;
  }, 0);
}

const getBytesOfEventsByDate = (labels: string[], data: IEventBandwidthItem[]) => {
  return labels.reduce((accumulator, label) => {
    const totalBytes = data
      .filter(dataItem => dataItem.datetime.startsWith(label))
      .map(dataItem => +dataItem.bandwidth)
      .reduce((labelAccumulator, dataItem) => labelAccumulator + dataItem, 0)

    return accumulator + totalBytes;
  }, 0);
}

export const getAttackTableRows = (data: IEventAttackItem[]) => {
  const uniqueAttackers = getUniqueItemsFromTheRange<IEventAttackItem>(data, 'value', 0);

  return uniqueAttackers.map(attackerIpAddress => {
    const numberOfAttacks = data.filter(dataItem => dataItem.value === attackerIpAddress).length;

    return {
      data: [
        { 'row-0': attackerIpAddress, alignment: TableAlignment.LEFT },
        { 'row-1': numberOfAttacks, alignment: TableAlignment.RIGHT }
      ]
    }
  }); 
}

export const getTotalEventsPercentage = (data: IEventItem[], eventType?: EventType) => {
  const labels = getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -14);
  const last7DayLabels = labels.slice(-7);
  const previous7DayLabels = labels.slice(0, 7);

  const last7DaysEvents = getNumberOfEventsByDate(last7DayLabels, data, eventType);
  const previous7DaysEvents = getNumberOfEventsByDate(previous7DayLabels, data, eventType);

  const showUpIcon = last7DaysEvents > previous7DaysEvents;
  const totalPercentage = ((last7DaysEvents / previous7DaysEvents)).toFixed(1);

  return { showUpIcon, totalPercentage };
}

export const getTotalBandwidthPercentage = (data: IEventBandwidthItem[]) => {
  const labels = getUniqueItemsFromTheRange<IEventBandwidthItem>(data, 'datetime', -14);
  const last7DayLabels = labels.slice(-7);
  const previous7DayLabels = labels.slice(0, 7);

  const last7DaysEvents = getBytesOfEventsByDate(last7DayLabels, data);
  const previous7DaysEvents = getBytesOfEventsByDate(previous7DayLabels, data);

  const showBandwidthUpIcon = last7DaysEvents > previous7DaysEvents;
  const totalBandwidthPercentage = ((last7DaysEvents / previous7DaysEvents)).toFixed(1);

  return { showBandwidthUpIcon, totalBandwidthPercentage };
}

export const getTotalEventsForTheWeek = (data: IEventItem[], eventType?: EventType) => {
  const labels = getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -7);

  return getNumberOfEventsByDate(labels, data, eventType);
}

export const getTotalDataTraffic = (data: IEventBandwidthItem[]) => {
  const labels = getUniqueItemsFromTheRange<IEventBandwidthItem>(data, 'datetime', -7);

  const totalBytes = labels.reduce((accumulator, label) => {
    const sumOfLabelData = data
      .filter(dataItem => dataItem.datetime.startsWith(label))
      .map(dataItem => +dataItem.bandwidth)
      .reduce((labelAccumulator, dataItem) => labelAccumulator + dataItem, 0)

    return accumulator + sumOfLabelData;
  }, 0);

  return mainUtil.unitSeparator(totalBytes.toString());
}

export const transformEventList = (data: string) => {
  return data
    .split(/\r?\n/)
    .map(rowItem => {
      const [, dateTimeValue, , value, , bandwidth] = rowItem.split(' ');
      const [date, time] = dateTimeValue.split('-');
      const valueToPass = !bandwidth ? value.slice(0, -1) : value;
      const bandwidthToUse = !bandwidth ? '' : bandwidth.slice(0, -1);

      return { datetime: `${date} ${time}`, value: valueToPass, bandwidth: bandwidthToUse };
    });
}

export const getDoughnutData = (data: IEventItem[]) => {
  const userLogin = getPiePercentage(data, EventType.USER_LOGIN);
  const userLogout = getPiePercentage(data, EventType.USER_LOGOUT);
  const serviceStart = getPiePercentage(data, EventType.SERVICE_START);
  const fileDataWrite = getPiePercentage(data, EventType.FILE_DATA_WRITE);
  const malwareAttacks = getPiePercentage(data, EventType.MALWARE_ATTACK);

  return {
    labels: ["User Login", "User Logout", "File Data Write", "Service Start", "Malware attack"],
    datasets: [
      {
        label: "",
        data: [userLogin, userLogout, serviceStart, fileDataWrite, malwareAttacks],
        backgroundColor: [
          eventsUtil.BLUE_COLOR, eventsUtil.YELLOW_COLOR,
          eventsUtil.PURPLE_COLOR, eventsUtil.GREEN_COLOR, eventsUtil.RED_COLOR
        ],
        borderWidth: 0,
      },
    ],
  };
}

export const getLineData = (data: IEventItem[]) => {
  const labels = getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -7);

  const chartData = labels.map(label => {
    const matchingLabelEvents = data.filter(dataItem => dataItem.datetime.startsWith(label));

    return matchingLabelEvents.length;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Number of events',
        data: chartData,
        fill: false,
        backgroundColor: eventsUtil.BLUE_COLOR,
        borderColor: eventsUtil.LIGHT_BLUE_COLOR
      }
    ]
  };
};

export const getTrafficChartData = (data: IEventBandwidthItem[]) => {
  const labels = getUniqueItemsFromTheRange<IEventBandwidthItem>(data, 'value', 0);

  return {
    labels,
    datasets: labels.map((label, labelIndex) => {
      const bytesBandwidth = data.reduce((accumulator, item) => item.value === label ? accumulator + +item.bandwidth : accumulator, 0);

      const chartData = Array
        .from({ length: labels.length })
        .map((_, index) => index === labelIndex ? bytesBandwidth : 0);

      return {
        label,
        data: chartData,
        fill: false,
        backgroundColor: Object.values(trafficChartDataColors)[labelIndex]
      };
    })
  };
}