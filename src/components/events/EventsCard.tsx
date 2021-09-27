import React from 'react';
import CardContainer from "../../ui-components/card/Card";
import statisticsStyles from "../statistics/Statistics.module.scss";
import { IEventCardProps } from "./ts/models/event-card-props.model";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const EventsCard = (props: IEventCardProps) => {
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
                                {!props.showUpIcon && <KeyboardArrowDownIcon />}
                                {props.showUpIcon && <KeyboardArrowUpIcon />}
                                {props.totalEventsPercentage}%
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

export default React.memo(EventsCard);
