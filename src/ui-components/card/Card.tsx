import Card from '@mui/material/Card';
import { ICardProps } from './ts/card-props.model';
import CardContent from '@mui/material/CardContent';

const CardContainer = (props: ICardProps) => {
    return (
        <Card style={{ ...props.style }}>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    )
}

export default CardContainer;