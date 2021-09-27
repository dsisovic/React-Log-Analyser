export interface IEventCardProps {
    label: string;
    cardWidth: string;
    cardHeight: string;
    showUpIcon?: boolean;
    icon: React.ReactElement;
    showPercentageIcon: boolean;
    totalEventsPercentage: string;
    percentageCallback: () => string | number;
}
