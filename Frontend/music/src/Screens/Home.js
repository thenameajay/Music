import { useEffect, useRef, useState } from "react"
import "../Styles/Home.css"

function Home(){
    const audref=useRef(document.getElementById("music"))
    const [songUrl, setSongUrl] = useState(null)
    const [songlist, setSongList]=useState(null)
    const [isSongPlaying, setIsSongPlaying] = useState(false)
    // const [myaudio, setmyaudio]=useState()
    // const [songlist, setSongList]=useState(["das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","das d reef","d","d"])
    const [currentSong, setCurrentSong] = useState(null)
    // const [songlist, setSongList]=useState(["d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d"])
    useEffect(()=>{
        // fetch('http://localhost:8123/getaudio?searched_song=Infinity.mp3').then((res)=>res.blob()).then((blob)=>{
        //     const url = URL.createObjectURL(blob)
        //     setSongUrl(url)
        //     console.log("kaam ho hya")
        // }).catch((err)=>console.error("error occured while fetching song : ",err))
        // var temp
        getSongs().then((res)=>setSongList(res))
    },[])

    useEffect(()=>{
        if(currentSong){
            fetch(`http://localhost:8123/getaudio?searched_song=${currentSong}`).then((res)=>res.blob()).then((blob)=>{
                const url = URL.createObjectURL(blob)
                setSongUrl(url)
                console.log("kaam ho hya")
            }).catch((err)=>console.error("error occured while fetching song : ",err))
        }
    },[currentSong])

    useEffect(()=>{
        console.log("url changed")
        // if(songUrl){
        //     try {
        //         console.log(document.getElementById("music").duration)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        
        play()
    },[songUrl])

    async function getSongs(){
        let data_list = await fetch("http://localhost:8123/songlist")
        // data_list = await data_list.json()
        data_list = await data_list.json()
        console.log("song list is : "+data_list)
        return data_list
    }

    function displayList(){
        console.log(songlist)
    }

    function play(){
        try {
            console.log(document.getElementById("music").duration)
            document.getElementById("music").play()
            
            setIsSongPlaying(true)
        } catch (error) {
            console.log(error)
        }
    }

    function toggle(song_name){
        if(currentSong===song_name){
            if(isSongPlaying){
                pause()
            }
            else{
                play()
            }
        }
        else{
            setCurrentSong(song_name)
        }
    }

    function pause(){
        try {
            document.getElementById("music").pause()
            setIsSongPlaying(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div id="home-section">
            <input type="search" id="search-bar" placeholder="Search a song..." />
            <div id="all-songs-div">
                {
                    songlist?(
                        songlist.map((song)=>(
                            <div className={song===currentSong?"current-song-div":"song-div"} onClick={()=>{toggle(song)}}>
                                <div>{song}</div>
                                {song===currentSong?(
                                    <div>&#8214;&#8214;</div>
                                ):(
                                <div>&#9654;</div>
                                )}
                                
                            </div>
                        ))
                    ):(
                        <p>loading songs</p>
                    )
                }
            </div>
            <div id="current-song-div">
                <div id="seekbar">
                    <div id="circle"></div>
                    <div id="probar"></div>
                </div>
                {/* <div></div> */}
            </div>

            {songUrl?(
                <audio id="music" key={songUrl} controls>
                    <source id="main-source" src={songUrl}  type="audio/mp3" />
                    your browser does not support audio files
                </audio>

            ):(
                <p>loading data</p>
            )}

            {/* {document.getElementById("music").duration} */}

        </div>
    )
}
export default Home