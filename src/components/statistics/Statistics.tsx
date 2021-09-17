import styles from "./Statistics.module.scss";
import Card from "../../ui-components/card/Card";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const cardWidth = "280px";
const cardHeight = "104px";

const Statistics = () => {
  return (
    <>
      <div className={styles.card}>
        <Card style={{ width: cardWidth, height: cardHeight }}>
          <div className={styles["card__content"]}>
            <span
              className={`${styles["card__icon"]} ${styles["card__icon--globe"]}`}
            >
              <PublicIcon sx={{ fontSize: 35, color: "#18BA92" }} />
            </span>
            <div>
              <h3 className={styles["card__content--value"]}>279</h3>
              <span className={styles["card__content--label"]}>
                Online users
              </span>
            </div>
          </div>
        </Card>
        <Card style={{ width: cardWidth, height: cardHeight }}>
          <div className={styles["card__content"]}>
            <span
              className={`${styles["card__icon"]} ${styles["card__icon--user"]}`}
            >
              <AccountCircleIcon sx={{ fontSize: 35, color: "#003CFF" }} />
            </span>
            <div>
              <h3 className={styles["card__content--value"]}>19k</h3>
              <span className={styles["card__content--label"]}>
                Subscribers this week
              </span>
            </div>
          </div>
        </Card>
        <Card style={{ width: cardWidth, height: cardHeight }}>
        <div className={styles["card__content"]}>
            <span
              className={`${styles["card__icon"]} ${styles["card__icon--comment"]}`}
            >
              <AccountCircleIcon sx={{ fontSize: 35, color: "#D96FF8" }} />
            </span>
            <div>
              <h3 className={styles["card__content--value"]}>683</h3>
              <span className={styles["card__content--label"]}>
                Comments this week
              </span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Statistics;
