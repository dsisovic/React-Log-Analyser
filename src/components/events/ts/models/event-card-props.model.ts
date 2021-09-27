export interface IEventCardProps {
    label: string;
    cardWidth: string;
    cardHeight: string;
    showUpIcon: boolean;
    icon: React.ReactElement;
    totalEventsPercentage: string;
    percentageCallback: () => string | number;
}
