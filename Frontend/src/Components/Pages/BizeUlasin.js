import React, { useState } from 'react'
import ErrorNotice from "../Misc/ErrorNotice"
import axios from 'axios'
export default function BizeUlasin() {
    const [mail, setMail] = useState();
    const [fikir, setFikir] = useState();
    const [error, setError] = useState();
    const [yazarEklendimi, setYazarEklendimi] = useState(false);
    const gonder = async (e) => {
        console.log("basıldı")
        e.preventDefault();
        try {
            const yeniFikir = { mail, fikir };
            await axios.post("https://meliherpek-backend.herokuapp.com/FikirIlet", yeniFikir);
            setError(undefined);
            setYazarEklendimi(true);
        } catch (err) {
            setError(err.response.data.hata)
        }



    };
    return (
        <div style={{ width: 940, margin: 'auto' }}>
           
            <h3>Bize Ulaşın</h3>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            {yazarEklendimi === true && (
                <ErrorNotice message={"Geri dönüşüz tarafımıza ulaştı"} />
            )}
            <form className="form" onSubmit={gonder}>
                <div >
                    <div className="form-group">
                        <label for="exampleFormControlInput1">E-Mail Adresiniz</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="E-Posta Adresi"

                            onChange={(e) => setMail(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Fikirleriniz ve Önerileriniz </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Fikirleriniz ve Önerileriniz"

                            onChange={(e) => setFikir(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Gönder" />
                </div>
            </form>
        </div>
    )
}
