import { useEffect, useState } from "react"
import "../Styles/Home.css"

function Home(){
    const [songUrl, setSongUrl] = useState(null)
    const [songlist, setSongList]=useState(null)
    useEffect(()=>{
        // fetch('http://localhost:8123/getaudio?searched_song=Infinity.mp3').then((res)=>res.blob()).then((blob)=>{
        //     const url = URL.createObjectURL(blob)
        //     setSongUrl(url)
        //     console.log("kaam ho hya")
        // }).catch((err)=>console.error("error occured while fetching song : ",err))
        // var temp
        getSongs().then((res)=>setSongList(res))
    },[])
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
    return(
        <>
            <input type="search" id="search-bar" placeholder="Search a song..." />
            <div id="all-songs-div">
                {songlist.map((song)=>(
                    <div className="song-div">{song}</div>
                ))}
            </div>






            {/* <button onClick={()=>{displayList()}}>get list</button> */}
            {/* {songlist} */}
            {/* {songUrl?(
                <audio id="music" controls>
                    <source src={songUrl} type="audio/mp3" />
                    your browser does not support audio files
                </audio>
            ):(
                <p>loading data</p>
            )}
            its home */}
        </>
    )
}
export default Home