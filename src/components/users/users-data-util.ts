import { IUserLog } from "./ts/models/user-log.model";
import { UserLogFileType } from "./ts/enums/user-log-file-type.enum";
import { UserLogDeviceType } from "./ts/enums/user-log-device-type.enum";
import * as mainUtil from '../../utils/main-util';

const visitDurationColors = [
  mainUtil.YELLOW_COLOR, mainUtil.BLUE_COLOR, mainUtil.RED_COLOR, mainUtil.PURPLE_COLOR
];

const getPiePercentage = (numberOfItems: number, totalNumberOfItems: number) => {
  return +((numberOfItems / totalNumberOfItems) * 100).toFixed(1);
}

const formatMainLog = (rowItem: string) => {
  const [, dateTimeValue, , deviceType, , country, , duration, , fileType] = rowItem.split(' ');
  const [date, time] = dateTimeValue.split('-');
  const filetTypeUI = translateFileType(fileType as UserLogFileType);

  return { datetime: `${date} ${time}`, deviceType, country, duration, fileType, filetTypeUI };
}

const translateFileType = (fileType: UserLogFileType) => {
  switch (fileType) {
    case UserLogFileType.JAVASCRIPT:
      return 'Javascript';
    case UserLogFileType.STYLESHEET:
      return 'Styling documents';
    case UserLogFileType.TEXTUAL:
      return 'Textual documents';
    case UserLogFileType.IMAGE:
      return 'Images';
    case UserLogFileType.HTML:
      return 'HTML page';
  }
}

const formatKeywordLog = (rowItem: string) => {
  const [, dateTimeValue, , keyword] = rowItem.split(' ');
  const [date, time] = dateTimeValue.split('-');

  return { datetime: `${date} ${time}`, keyword };
}

const getDurationItemsFromRange = (data: IUserLog[], startDuration: number, endDuration: number) => {
  return data.filter(dataItem => {
    const parsedDuration = +dataItem.duration;

    return parsedDuration >= startDuration && parsedDuration <= endDuration;
  });
}

export const getVisitsDurationData = (data: IUserLog[]) => {
  const zeroTo30Seconds = getDurationItemsFromRange(data, 0, 30).length;
  const thirtyTo2Minutes = getDurationItemsFromRange(data, 30, 120).length;
  const twoToTo5Minutes = getDurationItemsFromRange(data, 120, 300).length;
  const fiveTo15Minutes = getDurationItemsFromRange(data, 300, 900).length;

  const sumOfValues = [zeroTo30Seconds, twoToTo5Minutes, fiveTo15Minutes, thirtyTo2Minutes].reduce((accumulator, item) => accumulator + item, 0);

  const zeroTo30SecondsPercent = getPiePercentage(zeroTo30Seconds, sumOfValues);
  const thirtyTo2MinutesPercent = getPiePercentage(thirtyTo2Minutes, sumOfValues);
  const twoToTo5MinutesPercent = getPiePercentage(twoToTo5Minutes, sumOfValues);
  const fiveTo15MinutesPercent = getPiePercentage(fiveTo15Minutes, sumOfValues);

  return {
    labels: ["0 sec - 30 sec", "30 sec - 2 min", "2 min - 5 min", "5 min - 15 min"],
    datasets: [
      {
        label: "Users by devices",
        data: [zeroTo30SecondsPercent, thirtyTo2MinutesPercent, twoToTo5MinutesPercent, fiveTo15MinutesPercent],
        backgroundColor: visitDurationColors,
        borderWidth: 0
      },
    ],
  };
}

export const transformUserLog = (data: string | null, isMainFile: boolean) => {
  if (data) {
    return data
      .split(/\r?\n/)
      .map(rowItem => isMainFile ? formatMainLog(rowItem) : formatKeywordLog(rowItem));
  }

  return [];
}

export const getNumberOfDeviceTypes = (data: IUserLog[], deviceType: UserLogDeviceType) => {
  return data.reduce((accumulator, dataItem) => dataItem.deviceType === deviceType ? accumulator + 1 : accumulator, 0);
}
