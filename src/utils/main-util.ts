export const APP_LOAD_DELAY = 2000;

export const RED_COLOR = '#f44336';
export const BLUE_COLOR = '#3363ff';
export const GREEN_COLOR = '#4caf50';
export const YELLOW_COLOR = '#ffeb3b';
export const PURPLE_COLOR = '#E18CF9';

export const BLUE_BACKGROUND = '#003CFF';
export const LIGHT_BLUE_COLOR = 'rgba(0, 60, 255, 0.2)';

export const unitSeparator = (tickValue: string | number) => {
    const tickValueNumber = Number.parseFloat(tickValue.toString());
  
    if (tickValueNumber >= 10) {
      const unitsToUse = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
      const i = Math.floor(Math.log(tickValueNumber) / Math.log(1000));
  
      return `${parseFloat((tickValueNumber / Math.pow(1000, i)).toFixed(2))} ${unitsToUse[i] || ''}`;
    }
  
    return tickValue.toString();
  }