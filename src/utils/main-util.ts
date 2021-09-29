import { TableAlignment } from "../ui-components/table/ts/enums/table-alignment.enum";

export const APP_LOAD_DELAY = 2000;

export const RED_COLOR = '#f44336';
export const BLUE_COLOR = '#3363ff';
export const GREEN_COLOR = '#4caf50';
export const YELLOW_COLOR = '#ffeb3b';
export const PURPLE_COLOR = '#E18CF9';

export const BLUE_BACKGROUND = '#003CFF';
export const LIGHT_BLUE_COLOR = 'rgba(0, 60, 255, 0.2)';
export const LIGHT_PURPLE_COLOR = 'rgba(255, 140, 249, 0.2)';

export const unitSeparator = (tickValue: string | number) => {
  const tickValueNumber = Number.parseFloat(tickValue.toString());

  if (tickValueNumber >= 10) {
    const unitsToUse = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const i = Math.floor(Math.log(tickValueNumber) / Math.log(1000));

    return `${parseFloat((tickValueNumber / Math.pow(1000, i)).toFixed(2))} ${unitsToUse[i] || ''}`;
  }

  return tickValue.toString();
}

export const getNumberOfEventsByDate = <T, U>(labels: string[], data: T[], eventType?: U) => {
  return labels.reduce((accumulator, label) => {
    const matchingLabelEvents = data.filter(dataItem => {
      const { datetime, value } = dataItem as unknown as { datetime: string; value: U };
      const typeMatches = !eventType ? true : value === eventType;

      return typeMatches && datetime.startsWith(label);
    });

    return accumulator + matchingLabelEvents.length;
  }, 0);
}

export const getUniqueItemsFromTheRange = <T>(data: T[], key: keyof T, sliceOffset: number) => {
  return Array
    .from(new Set(data.map(dataItem => (dataItem[key] as unknown as string).split(' ')[0])))
    .slice(sliceOffset);
}

export const getTableRows = <T>(data: T[], key: keyof T, showImage: boolean) => {
  const uniqueItems = getUniqueItems<T>(data, key);

  return uniqueItems.map(uniqueItem => {
    const numberOfVisits = data.filter(dataItem => dataItem[key] as unknown === uniqueItem).length;

    return {
      data: [
        { 'row-0': uniqueItem, alignment: TableAlignment.LEFT, showImage },
        { 'row-1': numberOfVisits, alignment: TableAlignment.RIGHT }
      ]
    };
  });
}

const getUniqueItems = <T>(data: T[], key: keyof T) => {
  return data.reduce((accumulator, dataItem) => {
    const valueToCompare = dataItem[key] as unknown as string;

    return accumulator.includes(valueToCompare) ? accumulator : [...accumulator, valueToCompare];
  }, [] as string[]);
}