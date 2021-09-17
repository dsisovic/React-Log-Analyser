import styles from './Card.module.scss';
import { ICardProps } from './card-props.model';

const Card = (props: ICardProps) => {
    return (
        <>
            <div className={styles.card} style={{...props.style}}>
                {props.children}
            </div>
        </>
    )
}

export default Card;