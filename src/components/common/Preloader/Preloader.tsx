import React from 'react';
import preloader from '../../../assets/images/preloaderSpin.svg';

let Preloader: React.FC = () => {
    return <div style={{backgroundColor: "white"}}>
        <img src={preloader} alt='preload' />
    </div>
}

export default Preloader;