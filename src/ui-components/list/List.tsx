import styles from "./List.module.scss";
import { IListProps } from "./ts/list-props.model";

const List = (props: IListProps) => (
  <>
    <div className={styles.container}>
        <div className={styles['container__header']}>
            <span>{props.firstColumn}</span>
            <span>{props.secondColumn}</span>
        </div>

        <div className={styles['container__content']}>
            {props.children}
        </div>
    </div>
  </>
);

export default List;
