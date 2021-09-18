import styles from "./Chart.module.scss";
import { Doughnut } from "react-chartjs-2";
import { IChartProps } from "./ts/chart-props.model";
import { IDoughnutOptions } from "./ts/doughnut-options.model";

const DoughnutChart = (props: IChartProps) => (
  <>
    <div
      className={`${styles.container}`}
      style={{ width: props.width, height: props.height }}
    >
      <Doughnut
        data={props.data}
        options={props.options as IDoughnutOptions}
        width={props.width}
        height={props.height}
      />
      <div className={`${styles["container__center"]}`}>{props.children}</div>
    </div>
  </>
);

export default DoughnutChart;
