import React, {useEffect, useState} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {checkAuth} from './store/reducers/ActionCreators';
import Header from "./components/Header/Header";
import Navbar from "./components/UI/Navbar/Navbar";
import {changeUserId} from "./store/reducers/bonusesSlice";

function App() {
    const {isAuth, isLoading, user} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            dispatch(checkAuth());
        }
    }, [])

    useEffect(() => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        if (user.user && token && user.user._id !== '')
            // if () {
            dispatch(changeUserId(user.user._id))
        // }
    }, [isAuth])

    const [reload, setReload] = useState<boolean>(false)
    useEffect(() => {
        // window.location.reload()
    }, [])


    const [scroll, setScroll] = useState(0);
    //@ts-ignore
    // function fn(e) {
    //     setScroll(e.target.scrollTop)
    //     if (e.target.scrollTop <= -150) {
    //         setReload(true)
    //         setTimeout(()=> {
    //             setReload(false)
    //
    //         }, 100)
    //     }
    // }

    return (
        <div className="App">
            <Header user={user.user}/>
            {isAuth ? <Navbar/> : ''}
            {/*//@ts-ignore*/}
            {/*{reload*/}
            {/*    ? ''*/}
            {/*    : */}
                <div className={'wrap'}
                     // onScroll={(e) => fn(e)}
                >
                    {scroll < -10
                        ? '10'
                        : ''
                    }
                    {isLoading
                        ? <div className="loader"> Loader will be soon...</div>
                        : <AppRouter/>
                    }
                </div>
            {/*}*/}
        </div>
    );
}

export default App;
