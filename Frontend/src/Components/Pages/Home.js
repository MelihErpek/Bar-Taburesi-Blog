import React, { useEffect, useState } from 'react'
import Arsiv from '../../Components/PartialPages/Arsiv'
import BizeUlasin from '../../Components/Pages/BizeUlasin'
import moment from 'moment';
import axios from 'axios';
export default function Home() {


    const [yazilar, setYazilar] = useState([]);

    const SolTaraf = () => {
        useEffect(() => {
            axios.get("https://meliherpek-backend.herokuapp.com/YaziGetir").then(json => setYazilar(json.data));

        }, [])
        if (yazilar.yazilar) {
            return yazilar.yazilar.map(item => <div>  <div>
                <div style={{ display: 'flex' }}>

                    <div style={{ display: 'block' }}>

                        <img className="img-fluid " src={item.Foto} style={{ height: 275, width: 600, marginLeft: 15 }} alt="" />

                        <div style={{ height: 15 }}></div>
                        <div style={{textAlign:'center'}}>
                            
                            <a style={{ fontSize: 25, color: 'black', textDecoration: 'none' }} href={"/Yazı/" + item.Yaziİsmi}>{item.Yaziİsmi}</a>
                            <p style={{ fontSize: 20, color: '#666' }}>{item.Aciklama}</p>
                            <h3 style={{ fontSize: 12, color: '#888' }}>{item.YaziSahibi}</h3>
                            <h3 style={{ fontSize: 12, color: '#888' }}>{moment(item.Tarih).format('DD-MM-YYYY')}</h3>
                        </div>

                    </div>

                </div>
                <hr style={{ width: 610, marginLeft: 0 }}></hr>

            </div></div>)
        }
        else {
            return <h1></h1>
        }


    }
    return (

        <div style={{ width: 940, margin: 'auto' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'block', width: 600 }}>
                    <SolTaraf />
                </div>
                <Arsiv />
            </div>
            
        </div>




    )
}
