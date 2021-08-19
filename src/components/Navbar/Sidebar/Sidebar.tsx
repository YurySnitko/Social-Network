import React from 'react';
import s from './Sidebar.module.css';
import SidebarItem from './SidebarItem/SidebarItem';

const Sidebar: React.FC = () => {
    return (
        <div className={s.sidebar}>
            <span>Friends</span>
            <div className={s.container}>
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
            </div>
        </div>
    )
}

export default Sidebar;