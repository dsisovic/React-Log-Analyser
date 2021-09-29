import React from 'react';
import CardContainer from "../card/Card";
import { IEventCardProps } from "./ts/event-card-props.model";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import overviewStyles from "../../components/overview/Overview.module.scss";

const StatsCard = (props: IEventCardProps) => {
    const { showPercentageIcon, showUpIcon } = props;

    const arrowClass = overviewStyles[`card__content--subheader-${showUpIcon ? 'increase' : 'decrease'}`];
    const arrowStyle = showPercentageIcon && arrowClass;

    return (
        <>
            <CardContainer style={{ width: props.cardWidth, height: props.cardHeight }}>
                <div className={overviewStyles["card__content"]}>
                    <span
                        className={`${overviewStyles["card__icon"]} ${overviewStyles["card__icon--user"]}`}
                    >
                        {props.icon}
                    </span>
                    <div>
                        <h3 className={overviewStyles["card__content--value"]}>
                            {props.percentageCallback()}
                            <span
                                className={`${overviewStyles["card__content--subheader"]} ${arrowStyle}`}
                            >
                                {showPercentageIcon && showUpIcon && <KeyboardArrowUpIcon />}
                                {showPercentageIcon && !showUpIcon && <KeyboardArrowDownIcon />}

                                {props.totalEventsPercentage}{showPercentageIcon && '%'}
                            </span>
                        </h3>
                        <span className={overviewStyles["card__content--label"]}>
                            {props.label}
                        </span>
                    </div>
                </div>
            </CardContainer>
        </>
    );
};

export default React.memo(StatsCard);
