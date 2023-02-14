import React from 'react';
import cl from './ReloadLoader.module.css'

const ReloadLoader = () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7]


    const R = 25;
    const IMG_SIZE = 15;

    //@ts-ignore
    function fn(ind) {
        let radian = ind * (2 * Math.PI / 8) - 0.5 * Math.PI;

        let x = R * Math.cos(radian) - IMG_SIZE / 2;
        let y = R * Math.sin(radian) - IMG_SIZE / 2;

        return {
            left:`${x}px`,
            top: `${y}px`,
        }
    }

    return (
        <div className={cl.loader}>
            {array.map((arr) => <div key={arr} style={fn(arr)} className={cl.loaderDiv}></div>)}
        </div>
    );
};

export default ReloadLoader;
