import { EventType } from "./ts/enums/event-type.enum";
import { IEventItem } from "./ts/models/event-item.model";
import { IEventAttackItem } from "./ts/models/event-attack-item.model";
import { TableAlignment } from "../../ui-components/table/ts/enums/table-alignment.enum";
import * as eventsUtil from './events-util';

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

export const getAttackTableRows = (data: IEventAttackItem[]) => {
  const uniqueAttackers = getUniqueItemsFromTheRange<IEventAttackItem>(data, 'value', 0);

  return uniqueAttackers.map(attackerIpAddress => {
    const numberOfAttacks = data.filter(dataItem => dataItem.value === attackerIpAddress).length;

    return { data: [
      { 'row-0': attackerIpAddress, alignment: TableAlignment.LEFT }, 
      { 'row-1': numberOfAttacks, alignment: TableAlignment.RIGHT }
    ] }
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

export const getTotalEventsForTheWeek = (data: IEventItem[], eventType?: EventType) => {
  const labels = getUniqueItemsFromTheRange<IEventItem>(data, 'datetime', -7);

  return getNumberOfEventsByDate(labels, data, eventType);
}

export const transformEventList = (data: string) => {
  return data
    .split(/\r?\n/)
    .map(rowItem => {
      const [, dateTimeValue, , value] = rowItem.split(' ');
      const [date, time] = dateTimeValue.split('-');

      return { datetime: `${date} ${time}`, value: value.slice(0, -1) };
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
