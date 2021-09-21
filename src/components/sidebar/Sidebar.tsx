import React from 'react';
import logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Tooltip from '@mui/material/Tooltip';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import DialogContainer from '../../ui-components/dialog/Dialog';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const languageOptions = ['English (EN)', 'Српски (СРБ)'];

const Sidebar = () => {
    const [isDialogOpen, setOpenDialogState] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(languageOptions[0]);

    const handleOpenSettings = () => {
        setOpenDialogState(true);
    };

    const handleCloseSettings = (value: string) => {
        setOpenDialogState(false);
        setSelectedValue(value);
      };

    return (
        <>
            <DialogContainer
                open={isDialogOpen}
                title="Language"
                onClose={handleCloseSettings}
                options={languageOptions}
                selectedValue={selectedValue}
            />
            <div className={styles.logo}>
                <img src={logo} alt="logo" />

                <span className={`${styles['logo__icon']}`}>
                    <Tooltip title="Settings" onClick={handleOpenSettings}>
                        <SettingsIcon />
                    </Tooltip>
                </span>
            </div>

            <div className={styles.options}>
                <div>
                    <NavLink to="/overview"  className={`${styles.options__item}`} activeClassName={`${styles['options__item--active']}`}>
                        <DonutLargeIcon />
                        Overview
                    </NavLink >
                    <NavLink to="/users"  className={`${styles.options__item}`} activeClassName={`${styles['options__item--active']}`}>
                        <SupervisedUserCircleIcon />
                        Users
                    </NavLink >
                    <NavLink to="/events"  className={`${styles.options__item}`} activeClassName={`${styles['options__item--active']}`}>
                        <EventIcon />
                        Events
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar;