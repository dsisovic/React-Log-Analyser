import { EventType } from "./ts/enums/event-type.enum";
import { IEventItem } from "./ts/models/event-item.model";
import { IEventAttackItem } from "./ts/models/event-attack-item.model";
import { IEventBandwidthItem } from "./ts/models/event-bandwidth-item.model";
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as mainUtil from '../../utils/main-util';

const trafficChartDataColors = [
  mainUtil.YELLOW_COLOR, mainUtil.BLUE_COLOR, mainUtil.RED_COLOR, mainUtil.PURPLE_COLOR
];

const getPiePercentage = (data: IEventItem[], typeValue: EventType) => {
  return +((data.filter(dataItem => dataItem.value === typeValue).length / data.length) * 100).toFixed(1);
}

const getBytesOfEventsByDate = (labels: string[], data: IEventBandwidthItem[]) => {
  return labels.reduce((accumulator, label) => {
    const totalBytes = data.reduce((bdwAcc, item) => item.datetime.startsWith(label) ? bdwAcc + +item.bandwidth : bdwAcc, 0);

    return accumulator + totalBytes;
  }, 0);
}

export const getAttackTableRows = (data: IEventAttackItem[]) => {
  const uniqueAttackers = mainUtil.getUniqueItemsFromTheRange<IEventAttackItem>(data, 'value', 0);

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
  const labels = mainUtil.getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -14);
  const last7DayLabels = labels.slice(-7);
  const previous7DayLabels = labels.slice(0, 7);

  const last7DaysEvents = mainUtil.getNumberOfEventsByDate(last7DayLabels, data, eventType);
  const previous7DaysEvents = mainUtil.getNumberOfEventsByDate(previous7DayLabels, data, eventType);

  const showUpIcon = last7DaysEvents > previous7DaysEvents;
  const totalPercentage = ((last7DaysEvents / previous7DaysEvents)).toFixed(1);

  return { showUpIcon, totalPercentage };
}

export const getTotalBandwidthPercentage = (data: IEventBandwidthItem[]) => {
  const labels = mainUtil.getUniqueItemsFromTheRange<IEventBandwidthItem>(data, 'datetime', -14);
  const last7DayLabels = labels.slice(-7);
  const previous7DayLabels = labels.slice(0, 7);

  const last7DaysEvents = getBytesOfEventsByDate(last7DayLabels, data);
  const previous7DaysEvents = getBytesOfEventsByDate(previous7DayLabels, data);

  const showBandwidthUpIcon = last7DaysEvents > previous7DaysEvents;
  const totalBandwidthPercentage = ((last7DaysEvents / previous7DaysEvents)).toFixed(1);

  return { showBandwidthUpIcon, totalBandwidthPercentage };
}

export const getTotalEventsForTheWeek = (data: IEventItem[], eventType?: EventType) => {
  const labels = mainUtil.getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -7);

  return mainUtil.getNumberOfEventsByDate(labels, data, eventType);
}

export const getTotalDataTraffic = (data: IEventBandwidthItem[]) => {
  const labels = mainUtil.getUniqueItemsFromTheRange<IEventBandwidthItem>(data, 'datetime', -7);

  const totalBytes = labels.reduce((accumulator, label) => {
    const sumOfLabelData = data.reduce((bdwAcc, item) => item.datetime.startsWith(label) ? bdwAcc + +item.bandwidth : bdwAcc, 0);

    return accumulator + sumOfLabelData;
  }, 0);

  return mainUtil.unitSeparator(totalBytes.toString()) + 'B';
}

export const transformEventList = (data: string | null) => {
  if (data) {
    return data
    .split(/\r?\n/)
    .map(rowItem => {
      const [, dateTimeValue, , value, , bandwidth] = rowItem.split(' ');
      const [date, time] = dateTimeValue.split('-');

      return { datetime: `${date} ${time}`, value, bandwidth };
    });
  }

  return [];
}

export const getDoughnutData = (data: IEventItem[], labels: string[]) => {
  const userLogin = getPiePercentage(data, EventType.USER_LOGIN);
  const userLogout = getPiePercentage(data, EventType.USER_LOGOUT);
  const serviceStart = getPiePercentage(data, EventType.SERVICE_START);
  const fileDataWrite = getPiePercentage(data, EventType.FILE_DATA_WRITE);
  const malwareAttacks = getPiePercentage(data, EventType.MALWARE_ATTACK);

  return {
    labels,
    datasets: [
      {
        label: "",
        data: [userLogin, userLogout, serviceStart, fileDataWrite, malwareAttacks],
        backgroundColor: [
          mainUtil.BLUE_COLOR, mainUtil.YELLOW_COLOR,
          mainUtil.PURPLE_COLOR, mainUtil.GREEN_COLOR, mainUtil.RED_COLOR
        ],
        borderWidth: 0,
      },
    ],
  };
}

export const getLineData = (data: IEventItem[], label: string) => {
  const labels = mainUtil.getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -7);

  const chartData = labels.map(label => {
    const matchingLabelEvents = data.filter(dataItem => dataItem.datetime.startsWith(label));

    return matchingLabelEvents.length;
  });

  return {
    labels,
    datasets: [
      {
        label,
        data: chartData, fill: false,
        backgroundColor: mainUtil.BLUE_COLOR,
        borderColor: mainUtil.LIGHT_BLUE_COLOR
      }
    ]
  };
};

export const getTrafficChartData = (data: IEventBandwidthItem[]) => {
  const labels = mainUtil.getUniqueItemsFromTheRange<IEventBandwidthItem>(data, 'value', 0);

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