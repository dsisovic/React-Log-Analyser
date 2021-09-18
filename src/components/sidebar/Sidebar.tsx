import logo from '../../img/logo.png';
import styles from './Sidebar.module.scss';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const Sidebar = () => {
    return (
        <>
            <h2 className={styles.logo}>
                <img src={logo} alt="logo"/>
            </h2>
   
            <div className={styles.options}>
                <div className={`${styles.options__item} ${styles['options__item--active']}`}>
                    <DonutLargeIcon/>
                    Statistics
                </div>
            </div>
        </>
    )
}

export default Sidebar;