export const APP_LOAD_DELAY = 2000;

export const unitSeparator = (tickValue: string | number) => {
    const tickValueNumber = Number.parseFloat(tickValue.toString());
  
    if (tickValueNumber >= 10) {
      const unitsToUse = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
      const i = Math.floor(Math.log(tickValueNumber) / Math.log(1000));
  
      return `${parseFloat((tickValueNumber / Math.pow(1000, i)).toFixed(2))} ${unitsToUse[i] || ''}`;
    }
  
    return tickValue.toString();
  }