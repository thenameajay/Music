import "../Styles/AddSong.css"
import {useState} from "react"

function AddSong(){

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState('')

    const handleFileChange = (e) =>{
        setSelectedFile(e.target.files[0])
    }
    const handleFileUpload = async() =>{
        if(!selectedFile){
            setUploadStatus("Please select a file first :)")
            return
        }
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const response = await fetch("http://localhost:8123/upload",{
                method:'POST',
                body:formData
            })
            if(response.ok){
                setUploadStatus("Song Uploaded : Successful")
            }
            else{
                setUploadStatus("Song Upload : FAILED")
            }
        } catch (err) {
            setUploadStatus("ERROR in uploading...")
            console.log(err)
        }
    }

    return(
        <div id="add-song-div">
            <h2>Upload Song</h2>
            <input type="file" id="file-input" onChange={handleFileChange} />
            <button id="upload-btn" onClick={handleFileUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    )
}

export default AddSong