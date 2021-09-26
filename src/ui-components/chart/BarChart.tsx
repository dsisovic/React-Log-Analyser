import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import { IChartProps } from "./ts/chart-props.model";
import { ILineOptions } from './ts/line-options.model';

const BarChart = (props: IChartProps) => (
  <>
    <div
      className={`${styles.container}`}
      style={{ width: props.width, height: props.height }}
    >
      <Bar
        data={props.data}
        options={props.options as ILineOptions}
        width={props.width}
        height={props.height}
      />
    </div>
  </>
);

export default BarChart;
