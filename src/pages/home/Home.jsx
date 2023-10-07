import React from 'react'
import "./home.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import Footer from '../../components/footer/Footer'
import { PacmanLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading'

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
            <div className="homeContainer">
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
