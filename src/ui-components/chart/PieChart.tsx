import { Pie } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import { IChartProps } from "./ts/chart-props.model";
import { IDoughnutOptions } from "./ts/doughnut-options.model";

const PieChart = (props: IChartProps) => (
  <>
    <div
      className={`${styles.container}`}
      style={{ width: props.width, height: props.height }}
    >
      <Pie
        data={props.data}
        options={props.options as IDoughnutOptions}
        width={props.width}
        height={props.height}
      />
    </div>
  </>
);

export default PieChart;
