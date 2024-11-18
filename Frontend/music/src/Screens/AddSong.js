import "../Styles/AddSong.css"
import {useRef, useState} from "react"

function AddSong(){

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState('')
    const [fileStatus, setFileStatus] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const fileInputRef=useRef(null)

    function authorizeAdmin(){
        if(document.getElementById("admin-password").value==="i am admin here"){
            setIsAdmin(true)
        }
        document.getElementById("admin-password").value=""
    }

    const handleFileClick=()=>{
        fileInputRef.current.click()
    }

    const handleFileChange = (e) =>{
        setSelectedFile(e.target.files[0])
        setFileStatus("File Selected : "+e.target.files[0].name)
    }
    const handleFileUpload = async() =>{
        if(!selectedFile){
            setUploadStatus("Please select a file first :)")
            return
        }
        if(!isAdmin){
            setUploadStatus("Admin Credentials Unvalid :)")
            return
        }
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`,{
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
            <input id="admin-password" type="password" placeholder="Enter Password"/>
            <button class="btns" onClick={()=>{authorizeAdmin()}}>Validate</button>
            <input type="file" style={{display:"none"}} ref={fileInputRef} onChange={handleFileChange} />
            <button id="file-input" class="btns" onClick={handleFileClick}>Add Song</button>
            <p>{fileStatus}</p>
            <button id="upload-btn" class="btns" onClick={handleFileUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    )
}

export default AddSong