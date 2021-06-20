import React from 'react'
import tabure from './Images/unknown.png'
import twitter from './Images/twitter.png'
import youtube from './Images/youtube.png'
import instagram from './Images/instagram.png'
export default function Footer() {
    return (
        <div>
            <div style={{ textAlign: 'center', width: 940, margin: 'auto', paddingTop: 100 }}>
                <hr className="featurette-divider"></hr>
                <footer className="container" style={{ color: 'black' }}>
                  
                    <img className="img-fluid rounded-circle" src={tabure} style={{ height: 100, width: 250 }} alt="" />
                    <div>
                        <a href="https://twitter.com/BarTaburesiBlog"  target="_blank" rel="noreferrer"><img className="img-fluid rounded" src={twitter} style={{ height: 25, width: 35 }} alt="" /></a>
                        <a href="https://www.instagram.com/bartaburesiblog/"  target="_blank" rel="noreferrer"><img className="img-fluid rounded" src={instagram} style={{ height: 25, width: 35 ,marginLeft:15}} alt="" /></a>
                        <a href="https://www.youtube.com/channel/UCU4_GDdm8Vo-8LMCKMH_dLg/featured" target="_blank" rel="noreferrer"><img  src={youtube} style={{ height: 25, width: 35, marginLeft: 15 }} alt="" /></a>
                    </div>
                    <div style={{height:15}}></div>
                    <p style={{ fontSize: 10 }}>Mayıs'21 Bar Taburesi</p>
                </footer>
            </div>
        </div>
    )
}
