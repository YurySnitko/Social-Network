import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';

type PropsType = {
    id: number
    name: string
}

const DialogsItem: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className={s.dialog}>
            <img src='https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg' alt='phot' />
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;