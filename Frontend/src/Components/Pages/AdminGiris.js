import React, { useState, useContext } from 'react'
import axios from "axios";
import ErrorNotice from "../Misc/ErrorNotice"
import AdminContext from "../../Context/AdminContext";
import { useHistory } from "react-router-dom";


export default function AdminGiris() {
    const [mail, setEmail] = useState();
    const [parola, setPassword] = useState();
    const { setAdminData } = useContext(AdminContext);
    const [error, setError] = useState();
    const history = useHistory();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { mail, parola };
            let adminRes = await axios.post(
                "https://meliherpek-backend.herokuapp.com/AdminGiris",
                loginUser
            );
            console.log(adminRes);
            setAdminData({
                user: adminRes.data.user
            })
            localStorage.setItem("auth-token", adminRes.data.user.id);
            history.push("/YazıEkle")
        } catch (err) {
            setError(err.response.data.hata)
        }
    };


    return (
        <div>
            <div style={{ width: 940, margin: 'auto' }}>
                <form className="form" onSubmit={submit}>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    <h3>kullanıcı adı</h3>
                    <input className="form-control" placeholder="Kullanıcı Adı"
                        onChange={e => setEmail(e.target.value)}></input>
                    <h3>sifre</h3>
                    <input type="password" className="form-control" placeholder="Sifre"
                        onChange={e => setPassword(e.target.value)}></input>
                    <div></div>

                    <input type="submit" value="Log in" />
                </form>
            </div>
        </div>
    )
}
