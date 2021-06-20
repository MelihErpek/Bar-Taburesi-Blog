import React, { useState, useContext } from "react";
import ErrorNotice from "../Misc/ErrorNotice"
import AdminContext from "../../Context/AdminContext";
import axios from "axios";

export default function YazarEkle() {
    const [AdSoyad, setAdSoyad] = useState();
    const [Bio, setBio] = useState();
    const [KısaBio, setKısaBio] = useState();
    const [Konum, setKonum] = useState();
    const [Twitter, setTwitter] = useState();
    const [Mail, setMail] = useState();
    const [baseImage, setbaseImage] = useState();
    const [error, setError] = useState();
    const [yazarEklendimi, setYazarEklendimi] = useState(false);
    const { adminData } = useContext(AdminContext);
    const uploadImage = async (e) => {

        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setbaseImage(base64);
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }
    const gonder = async (e) => {
        e.preventDefault();
        try {
            const yeniYazar = { AdSoyad, Bio, KısaBio, Konum, Twitter, Mail, baseImage };
            await axios.post("https://meliherpek-backend.herokuapp.com/YazarEkle", yeniYazar);
            setError(undefined);
            setYazarEklendimi(true);
        } catch (err) {
            setError(err.response.data.hata)
        }



    };
    return (
        <div>
            { adminData.user ? (
                <>
                    <div style={{ width: 940, margin: 'auto' }}>
                        {error && (
                            <ErrorNotice message={error} clearError={() => setError(undefined)} />
                        )}
                        {yazarEklendimi === true && (
                            <ErrorNotice message={"Yazar Eklendi."} />
                        )}
                        <form className="form" onSubmit={gonder}>
                            <div >

                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Ad Soyad</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ad Soyad"

                                        onChange={(e) => setAdSoyad(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Biyografi</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Biyografi"

                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Kısa Biyografi</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Kısa Biyografi"

                                        onChange={(e) => setKısaBio(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Konum</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Konum"

                                        onChange={(e) => setKonum(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Twitter(Örn:https://twitter.com/erpeks)</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Twitter"

                                        onChange={(e) => setTwitter(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">E-Mail</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="E-Posta Adresi"

                                        onChange={(e) => setMail(e.target.value)}

                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Profil Fotoğrafı</label>
                                    <input type="file" className="form-control" id="exampleFormControlInput1"

                                        onChange={(e) => uploadImage(e)}

                                    />
                                </div>




                                <input type="submit" value="Yazar Ekle" />
                            </div>
                        </form>
                    </div>
                </>
            ) : (<>
                <h1>Bu sayfayı görmeye yetkiniz yoktur.</h1>

            </>)
            }

        </div>
    )
}
