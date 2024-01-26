import React from 'react'
import styles from "./styles.module.css"
import Navbar from "../../../components/navbar"
import Header from "../../../components/header"
import Footer from '../../../components/footer'
import Featured from './featured'
import { useState, useEffect } from 'react';
import Loading from '../../../components/loading'
import Comment from './comment'
import { COMMENT_LIST } from '../../../utils/test_data'
import { useSelector } from 'react-redux'
import { selectListRoute } from '../../../feature/route/route.slice'
import routeThunk from '../../../feature/route/route.service'
import { useDispatch } from 'react-redux'
import { selectUser } from '../../../feature/auth/auth.slice'
import TripInfor from './tripInfor'
import { Helmet } from 'react-helmet';

const Home = () => {
    const user = useSelector(selectUser)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    useEffect(() => {
        const loadData = () => {
            dispatch(routeThunk.getRoute())
            .then(() => {
                setLoading(false);
            }
            )
            .catch((error)=>{
                console.log(error)
            });
        };
        loadData();
    }, [])
    
    return (
        <div>
            <Navbar></Navbar>
            <div style={{position:'relative'}}>
            <a href="/map.html">Click me to go to Map</a>
            {loading ? (<Loading scale={0.8}></Loading>) : 
            (
                <>
                { listRoute.length >0 && <Header active="home" listRoute={listRoute}></Header>}
                    <div className={styles.homeContainer}> 
                        {user && <TripInfor></TripInfor>}
                        <Featured></Featured>
                        <Comment listComment={COMMENT_LIST}></Comment>    
                    </div>
                </>
            )}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home
