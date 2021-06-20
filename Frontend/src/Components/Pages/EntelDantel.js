import React, { useEffect, useState } from 'react'
import Loader from "react-loader-spinner";
import SagTaraf from '../../Components/PartialPages/SagTaraf'
import axios from 'axios'
import moment from 'moment';
import dantel from './Images/dantel.jpeg'
import dantelson from './Images/dantelson.png'
export default function Kategoriler(props) {
    const [data, setData] = useState([]);
    const Yazilar = () => {
        if (data.yazi.length === 0) {
            return <h5>Buralar şimdilik sessiz ...</h5>
        }
        else {
            return data.yazi.map(item =>

                <div>
                    <div style={{ display: 'flex' }}>
                        <img className="img-fluid rounded" src={item.Foto} style={{ height: 125, width: 175, marginLeft: 15 }} alt="" />
                        <div style={{ display: 'block', marginLeft: 15 }}>
                            <div style={{ height: 15 }}></div>
                            <h3 style={{ fontSize: 12, color: '#888' }}>{moment(item.Tarih).format('MMMM')} {moment(item.Tarih).format('DD')}, {moment(item.Tarih).format('YYYY')}</h3>
                            <a style={{ fontSize: 20, color: 'black', textDecoration: 'none' }} href={"/Yazı/" + item.Yaziİsmi}>{item.Yaziİsmi}</a>
                            <h3 style={{ fontSize: 15, color: '#498573' }}>{item.YaziSahibi}</h3>
                            <h3 style={{ fontSize: 12, color: '#888' }}>{item.Aciklama}</h3>


                        </div>

                    </div>
                    <hr style={{ width: 610, marginLeft: 0 }}></hr>

                </div>
            )
        }


    }
    useEffect(() => {
        const kategori = "entel dantel";
        const yaziKategori = { kategori };
        axios.post("https://meliherpek-backend.herokuapp.com/KategoriBul", yaziKategori).then(json => setData(json.data));

    }, [])


    return (
        <div style={{ width: 940, margin: 'auto' }}>
            {data.yazi ? (<>

                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'block' }}>
                        <div style={{ padding: 10, backgroundColor: 'lightpink' }}>
                            <img src={dantelson} style={{ height: 280, width: 600 }} alt="bartaburesi.com"></img>
                        </div>
                        <div style={{ height: 25, margin: 'auto' }}></div>
                        <Yazilar />
                    </div>
                    <SagTaraf />
                </div>

            </>) : (<><div style={{ textAlign: 'center' }}> <Loader
                type="Puff"
                color="#b04374"
                height={75}
                width={75}
                timeout={5000} //3 secs
            /></div></>)}
        </div>
    )
}
