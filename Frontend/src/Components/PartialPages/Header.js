import React, { useContext } from 'react'
import tabure from './Images/unknown.png'
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import AdminContext from "../../Context/AdminContext";

export default function Header() {
    const { adminData, setAdminData } = useContext(AdminContext);
    const history = useHistory();
    const logout = () => {

        setAdminData({
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push("/")
    };
    const yazıEkle = () => {
        history.push("/YazıEkle")
    }
    const yazarEkle = () => {
        history.push("/YazarEkle")
    }

    const home = () => {
        history.push("/")
    }

    const tozlu = () => {
        history.push("/tozlu raflar")
    }
    const entel = () => {
        history.push("/entel dantel")
    }
    const soyunma = () => {
        history.push("/soyunma odası")
    }
    return (
        <div>
            { adminData.user ? (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <img src={tabure} style={{ height: 250, width: 940 }} alt="bartaburesi.com"></img>
                        <Navbar bg="dark" variant="dark" style={{ margin: 'auto', width: 940, height: 43 }}>
                            <Nav className="mr-auto">
                                <Nav.Link style={{ width: 80, fontSize: 12.5, color: '#dddddf' }} onClick={yazarEkle} >yazar ekle</Nav.Link>
                                <Nav.Link style={{ width: 100, fontSize: 12.5, color: '#dddddf' }} onClick={yazıEkle}>yazı ekle</Nav.Link>
                                <Nav.Link style={{ width: 100, fontSize: 12.5, color: '#dddddf' }} onClick={logout} >çıkış yap</Nav.Link>
                            </Nav>
                        </Navbar>
                        <div style={{ backgroundColor: '#b04374   ', width: 940, height: 7.5, margin: 'auto' }}></div>
                        <div style={{ width: 940, height: 10, margin: 'auto' }}></div>

                    </div>
                </>
            )
                :
                (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <a href="/">
                                <img src={tabure} style={{ height: 250, width: 940 }} alt="bartaburesi.com"></img>
                            </a>
                            <Navbar bg="dark" variant="dark" style={{ margin: 'auto', width: 940, height: 43 }}>
                                <Navbar.Brand style={{ width: 80, fontSize: 15 }} onClick={home}>BarTaburesi</Navbar.Brand>
                                <Nav className="mr-auto">
                                    <Nav.Link style={{ width: 80, fontSize: 12.5, color: '#dddddf' }} onClick={tozlu}>tozlu raflar</Nav.Link>
                                    <Nav.Link style={{ width: 100, fontSize: 12.5, color: '#dddddf' }} onClick={entel}>entel dantel</Nav.Link>
                                    <Nav.Link style={{ width: 100, fontSize: 12.5, color: '#dddddf' }} onClick={soyunma}>soyunma odası</Nav.Link>
                                </Nav>

                            </Navbar>

                            <div style={{ backgroundColor: '#b04374   ', width: 940, height: 7.5, margin: 'auto' }}></div>
                            <div style={{ width: 940, height: 10, margin: 'auto' }}></div>
                        </div>
                    </>
                )
            }


        </div>
    );
}


