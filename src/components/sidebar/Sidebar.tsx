import React from 'react';
import logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import { Language } from '../../ts/enums/language.enum';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import DialogContainer from '../../ui-components/dialog/Dialog';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import * as mainUtil from '../../utils/main-util';

const languageOptions = ['English (EN)', 'Српски (СРБ)'];

const getPreselectedLanguage = () => {
    const preselectedLanguage = mainUtil.getStoredLanguage();

    return preselectedLanguage === Language.ENGLISH ? languageOptions[0] : languageOptions[1];
}

const Sidebar = () => {
    const { t, i18n } = useTranslation('index');
    const [isDialogOpen, setOpenDialogState] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(getPreselectedLanguage());

    const handleOpenSettings = () => {
        setOpenDialogState(true);
    };

    const handleCloseSettings = (value: string) => {
        const language = value.toLowerCase().startsWith('english') ? Language.ENGLISH : Language.SERBIAN;

        setOpenDialogState(false);
        setSelectedValue(value);
        i18n.changeLanguage(language);
        localStorage.setItem('loggyLanguage', language);
    };

    return (
        <>
            <DialogContainer
                open={isDialogOpen}
                title={t('sidebar.title')}
                onClose={handleCloseSettings}
                defaultValue={selectedValue}
                options={languageOptions}
                selectedValue={selectedValue}
            />
            <div className={styles.logo}>
                <img src={logo} alt="logo" />

                <span className={`${styles['logo__icon']}`}>
                    <Tooltip title={t<string>('sidebar.title')} onClick={handleOpenSettings}>
                        <SettingsIcon />
                    </Tooltip>
                </span>
            </div>

            <div className={styles.options}>
                <div>
                    <NavLink to="/overview" className={`${styles.options__item}`} activeClassName={`${styles['options__item--active']}`}>
                        <DonutLargeIcon />
                        {t('sidebar.link1')}
                    </NavLink >
                    <NavLink to="/users" className={`${styles.options__item}`} activeClassName={`${styles['options__item--active']}`}>
                        <SupervisedUserCircleIcon />
                        {t('sidebar.link2')}
                    </NavLink >
                    <NavLink to="/events" className={`${styles.options__item}`} activeClassName={`${styles['options__item--active']}`}>
                        <EventIcon />
                        {t('sidebar.link3')}
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar;