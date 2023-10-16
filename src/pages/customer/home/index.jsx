import React from 'react'
import styles from "./styles.module.css"
import Navbar from "../../../components/navbar"
import Header from "../../../components/header"
import Footer from '../../../components/footer'
import Featured from './featured'
import PropertyList from './propertyList'
import { useState, useEffect } from 'react';
import Loading from '../../../components/loading'


const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await new Promise((r) => setTimeout(r, 1000));
            setLoading(false);
        };
        loadData();
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Header active="home"></Header>
            <div className={styles.homeContainer}>
                {loading ?
                    (<Loading></Loading>) : (
                        <>
                            <Featured></Featured>
                            <PropertyList></PropertyList>
                        </>
                    )
                }
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default Home
