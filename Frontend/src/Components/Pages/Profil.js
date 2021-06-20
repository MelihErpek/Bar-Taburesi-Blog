import React, { useEffect, useState } from 'react'
import Loader from "react-loader-spinner";
import twitter from './Images/twitter.png'
import location from './Images/location.png'
import axios from 'axios'

export default function Profil(props)  {
    const [data, setData] = useState();
    
    useEffect(() => {
        const isim = props.match.params.Ad;
        const user = { isim };
        axios.post("https://meliherpek-backend.herokuapp.com/YazarBul", user).then(json=>setData(json.data));
        
    }, [])
    
    return (
        <div>
            {
            data ? (
                <>
                <div style={{ height: 40 }}></div>
            <div style={{ width: 940, margin: 'auto' }}>
               
                <div style={{ display: 'flex' }}>
                    <div >
                        <img className="img-fluid rounded-circle" src={data.user.Foto} style={{ height: 150, width: 150, marginLeft: 200, border: '5px solid #b04374' }} alt="" />
                    </div>
                    <div style={{ display: 'block' }}>
                        <div style={{ fontSize: 20, marginLeft: 50, fontWeight: 'bold', color: 'black' }}>
                            {data.user.AdSoyad}
                            
                            <a href={data.user.Twitter} target="_blank" rel="noreferrer"><img className="img-fluid rounded" src={twitter} style={{ height: 15, width: 25, marginLeft: 15 }} alt="" /></a>
                        </div>
                        <div style={{ height: 15 }}></div>
                        <div style={{ display: 'flex' }}>
                            <img className="img-fluid rounded" src={location} style={{ height: 20, width: 20, marginLeft: 50 }} alt="" />
                            <div style={{ marginLeft: 10, fontSize: 13 }}>{data.user.Konum}</div>
                        </div>
                        <div style={{ height: 15 }}></div>
                        <div style={{ fontSize: 13, marginLeft: 50, width: 400 }}>{data.user.Bio} </div>
                        <div style={{ height: 15 }}></div>

                    </div>


                </div>






            </div></>
            )
                :
                (<>
                <div style={{ textAlign: 'center' }}> <Loader
                        type="Puff"
                        color="#b04374"
                        height={75}
                        width={75}
                        timeout={5000} //3 secs
                    /></div>
            
                </>)
            }



        </div>
    )
}


/*
<div style={{ height: 40 }}></div>
            <div style={{ width: 940, margin: 'auto' }}>
               
                <div style={{ display: 'flex' }}>
                    <div >
                        <img className="img-fluid rounded-circle" src={alihan} style={{ height: 150, width: 150, marginLeft: 200, border: '5px solid #b04374' }} alt="" />
                    </div>
                    <div style={{ display: 'block' }}>
                        <div style={{ fontSize: 20, marginLeft: 50, fontWeight: 'bold', color: 'black' }}>
                            Alihan Aksoy
                            
                            <a href="slkdj.com"><img className="img-fluid rounded" src={twitter} style={{ height: 15, width: 25, marginLeft: 15 }} alt="" /></a>
                        </div>
                        <div style={{ height: 15 }}></div>
                        <div style={{ display: 'flex' }}>
                            <img className="img-fluid rounded" src={location} style={{ height: 20, width: 20, marginLeft: 50 }} alt="" />
                            <div style={{ marginLeft: 10, fontSize: 13 }}>Eskişehir</div>
                        </div>
                        <div style={{ height: 15 }}></div>
                        <div style={{ fontSize: 13, marginLeft: 50, width: 400 }}>Bio </div>
                        <div style={{ height: 15 }}></div>

                    </div>


                </div>






            </div>
*/