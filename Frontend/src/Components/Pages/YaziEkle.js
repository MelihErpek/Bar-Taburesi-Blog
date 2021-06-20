import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ErrorNotice from "../Misc/ErrorNotice"
import parse from 'html-react-parser';
import axios from "axios";
import kitap from './Images/kitap2.jpeg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class Calender2 extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    YaziSahibi: undefined,
    Yaziİsmi: undefined,
    İçerik: undefined,
    Konu: undefined,
    baseImage: undefined,
    Aciklama:undefined,
    Error:undefined,
    YaziEklendimi:false
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  convertBase64 = (file) => {
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
  };
  uploadImage = async (e) => {

    const file = e.target.files[0];
    const base64 = await this.convertBase64(file);
    //setbaseImage(base64);
    this.setState({ baseImage: base64 })
  };
  submit = async (e) => {
    e.preventDefault();
    //console.log(this.state.editorState.getCurrentContent());
    //console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    //console.log("selam")
    try {
      const yaziSahibi = this.state.YaziSahibi;
      const yaziİsmi = this.state.Yaziİsmi;
      const içerik = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
      const konu = this.state.Konu;
      const BaseImage = this.state.baseImage;
      const aciklama = this.state.Aciklama;
      const yeniYazi = { yaziSahibi, yaziİsmi, içerik, konu, BaseImage,aciklama };
      await axios.post("https://meliherpek-backend.herokuapp.com/YaziEkle", yeniYazi);
      this.setState({Error:undefined});
      this.setState({YaziEklendimi:true});
    } catch (err) {
      const hata =err.response.data.hata;
      this.setState({Error:hata});
    }



  };

  render() {
    const { editorState } = this.state;
    return (
      <div style={{ width: 940, margin: 'auto' }}>
        {this.state.Error && (
                <ErrorNotice message={this.state.Error}  />
            )}
        {this.state.YaziEklendimi === true && (
                <ErrorNotice message={"Yazı Eklendi."}  />
            )}
        <form className="form" onSubmit={this.submit}>
          <div >

            <div className="form-group">
              <label for="exampleFormControlInput1">Yazı Sahibi</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Yazı Sahibi"

                onChange={(e) => this.setState({ YaziSahibi: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Başlık</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Başlık"

                onChange={(e) => this.setState({ Yaziİsmi: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Konu:</label>
              <select onChange={(e) => this.setState({ Konu: e.target.value })} >
                <option value="tozlu raflar" >tozlu raflar</option>
                <option value="entel dantel">entel dantel</option>
                <option value="soyunma odası">soyunma odası</option>
              </select>
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Yazı(Eklenen Fotoğrafın Genişliği 650px olmalı)</label>

              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Yazı Açıklaması</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Yazı Açıklaması"

                onChange={(e) => this.setState({ Aciklama: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Yazı Fotoğrafı</label>
              <input type="file" className="form-control" id="exampleFormControlInput1"

                onChange={(e) => this.uploadImage(e)}

              />
            </div>




            <input type="submit" value="Yazı Ekle" />
          </div>
        </form>

        
      

       
      </div>
    );
  }
}




/*import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function Calender2() {
    const [yazi, setYazi] = useState("");
    return (
        <div style={{ width: 940, margin: 'auto' }}>

                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor

                    editor={ClassicEditor}

                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setYazi(data);
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            <h4>{yazi}</h4>

        </div>
    )
}
 */