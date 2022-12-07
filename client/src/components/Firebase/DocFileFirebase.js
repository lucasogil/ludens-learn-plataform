import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import "./DocFileFirebase.css";
import { Link } from "react-router-dom";

function DocFileFirebase(props) {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrl, setFileUrl] = useState({});

  const uploadFile = () => {
    if (fileUpload == null) return;
    const firebaseNameFile = fileUpload.name + v4();
    const fileRef = ref(storage, `files/${firebaseNameFile}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        saveDocFirebaseUrl(url);
      });
    });
  };

  const saveDocFirebaseUrl = (firebaseUrl) => {
    axios
      .put(
        "http://localhost:3001/api/documents/changefirebaseurl",
        { firebaseUrl: firebaseUrl, documentId: props.documentId },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  return (
    <div className="docUploadComponetSpace">
      <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload File</button>
      {!isEmpty(fileUrl) && <h6>Upload Feito!</h6>}
    </div>
  );
}

export default DocFileFirebase;
