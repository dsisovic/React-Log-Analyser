import { Line } from "react-chartjs-2";
import { IChartProps } from "./ts/chart-props.model";
import styles from "./Chart.module.scss";
import { ILineOptions } from './ts/line-options.model';

const LineChart = (props: IChartProps) => (
  <>
    <div
      className={`${styles.container}`}
      style={{ width: props.width, height: props.height }}
    >
      <Line
        data={props.data}
        options={props.options as ILineOptions}
        width={props.width}
        height={props.height}
      />
    </div>
  </>
);

export default LineChart;
