import React, { useEffect, useState } from 'react'
import Loader from "react-loader-spinner";
import axios from 'axios'
import parse from 'html-react-parser';
import moment from 'moment';
export default function Yazi(props) {
    /*{moment(data.yazi.Tarih).format('DD-MMMM-YYYY')} */
    const [data, setData] = useState();
    useEffect(() => {
        const baslik = props.match.params.Baslik;
        const yaziBaslik = { baslik };
        axios.post("https://meliherpek-backend.herokuapp.com/YaziBul", yaziBaslik).then(json => setData(json.data));
    }, [])

    return (
        <div>
            {data ? (<>

                <div style={{ width: 940, margin: 'auto' }}>
                    <div style={{ height: 40 }}></div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'block' }} >

                            <img className="img-fluid rounded-circle" src={data.user.Foto} style={{ height: 125, width: 125, marginLeft: 75, border: '5px solid #b04374' }} alt="" />
                            <div style={{ height: 20 }}></div>
                            <div style={{ fontSize: 20, marginLeft: 75, color: 'black' }}>

                                <a href={"/Yazar/" + data.yazi.YaziSahibi} style={{ textDecoration: 'none', color: '#b04374' }}>{data.yazi.YaziSahibi}</a>
                            </div>
                            <div style={{ fontSize: 13, marginLeft: 75, color: 'black' }}>
                                {data.user.KısaBio}

                            </div>
                            <div style={{ fontSize: 13, marginLeft: 75, color: 'black' }}>

                                {moment(data.yazi.Tarih).format('MMMM')}'{moment(data.yazi.Tarih).format('YY')}
                            </div>

                        </div>
                        <div style={{ display: 'block' }}>
                            <img className="img-fluid rounded" src={data.yazi.Foto} style={{ height: 150, width: 650, marginLeft: 50 }} alt="" />
                            <div style={{ fontSize: 25, marginLeft: 50, fontWeight: 'bold', color: 'black' }}>
                                {data.yazi.Yaziİsmi}
                            </div>
                            <div style={{ height: 15 }}></div>
                            <div style={{ fontSize: 13, marginLeft: 50, color: 'black' }}>
                                {moment(data.yazi.Tarih).format('DD MMMM YYYY')}
                            </div>
                            <div style={{ height: 15 }}></div>
                            <div style={{ fontSize: 15, marginLeft: 50, width: 650 }}>{parse(data.yazi.İçerik)}</div>
                            <div style={{ height: 15 }}></div>

                            <div style={{ height: 15 }}></div>

                        </div>

                    </div>
                </div>
            </>) :
                (<>
                    <div style={{ textAlign: 'center' }}> <Loader
                        type="Puff"
                        color="#b04374"
                        height={75}
                        width={75}
                        timeout={5000} //3 secs
                    /></div>
                </>)}

        </div>
    )
}
