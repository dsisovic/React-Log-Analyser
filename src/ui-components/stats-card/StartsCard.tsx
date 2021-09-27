import React from 'react';
import CardContainer from "../card/Card";
import { IEventCardProps } from "./ts/event-card-props.model";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import statisticsStyles from "../../components/statistics/Statistics.module.scss";

const StatsCard = (props: IEventCardProps) => {
    return (
        <>
            <CardContainer style={{ width: props.cardWidth, height: props.cardHeight }}>
                <div className={statisticsStyles["card__content"]}>
                    <span
                        className={`${statisticsStyles["card__icon"]} ${statisticsStyles["card__icon--user"]}`}
                    >
                        {props.icon}
                    </span>
                    <div>
                        <h3 className={statisticsStyles["card__content--value"]}>
                            {props.percentageCallback()}
                            <span
                                className={`${statisticsStyles["card__content--subheader"]} 
                  ${statisticsStyles[`card__content--subheader-${props.showUpIcon ? 'increase' : 'decrease'}`]}`}
                            >
                                {props.showPercentageIcon && !props.showUpIcon && <KeyboardArrowDownIcon />}
                                {props.showPercentageIcon && props.showUpIcon && <KeyboardArrowUpIcon />}
                                {props.totalEventsPercentage}{props.showPercentageIcon && '%'}
                            </span>
                        </h3>
                        <span className={statisticsStyles["card__content--label"]}>
                            {props.label}
                        </span>
                    </div>
                </div>
            </CardContainer>
        </>
    );
};

export default React.memo(StatsCard);
