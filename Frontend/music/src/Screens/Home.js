import { useEffect, useRef, useState } from "react"
import "../Styles/Home.css"

function Home() {
    const audref = useRef(null)
    // const audio = audref.current // changed
    const [songDuration, setDuration] = useState(null)
    const [searchedTerm, setSearchedTerm] = useState('')
    const [filteredSongs, setFilteredSongs] = useState(null)
    const [songSelected, setSongSelected] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [songUrl, setSongUrl] = useState(null)
    const [songlist, setSongList] = useState(null)
    const [isSongPlaying, setIsSongPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const [playingPlaylist, setPlayingPlaylist] = useState(false)
    const [playlist, setPlaylist] = useState([])
    const [tempList, setTempList] = useState(null)

    useEffect(() => {
        getSongs().then((res) => setSongList(res))
    }, [])

    const handleTime = () => {
        setCurrentTime(audref.current?.currentTime)
    }

    const handleSearchChanges = (e) => {
        setSearchedTerm(e.target.value)
    }

    useEffect(() => {
        console.log(searchedTerm)
        const matching_songs = songlist?.filter((song) => song.toLowerCase().includes(searchedTerm.toLowerCase()))
        setFilteredSongs(matching_songs)
        console.log(matching_songs)
    }, [searchedTerm])

    useEffect(() => {
        const audio = audref.current
        audio?.addEventListener("timeupdate", handleTime)
    }, [songSelected])

    useEffect(() => {
        if (currentSong) {
            fetch(`http://localhost:8123/getaudio?searched_song=${currentSong}`).then((res) => res.blob()).then((blob) => {
                const url = URL.createObjectURL(blob)
                setSongUrl(url)
            }).then(() => {
                setSongSelected(!songSelected)
            }).catch((err) => console.error("error occured while fetching song : ", err))
        }
    }, [currentSong])

    useEffect(() => {
        play()
    }, [songUrl])

    async function getSongs() {
        let data_list = await fetch("http://localhost:8123/songlist")
        data_list = await data_list.json()
        console.log("song list is : " + data_list)
        return data_list
    }

    function displayList() {
        console.log(songlist)
    }

    function play() {
        try {
            audref.current.play()
            // document.getElementById("music").play()
            setIsSongPlaying(true)
        } catch (error) {
            console.log(error)
        }
    }

    function toggle(song_name) {
        // try{
        if (currentSong === song_name) {
            if (isSongPlaying) {
                pause()
            }
            else {
                play()
            }
        }
        else {
            setCurrentSong(song_name)
        }
        // }catch(err){
        //     console.log(err)
        // }
    }

    function pause() {
        try {
            audref.current.pause()
            // audio.pause()
            setIsSongPlaying(false)
        } catch (error) {
            console.log(error)
        }
    }

    function nextSong() {
        let current_song_idx = songlist.indexOf(currentSong)
        if (current_song_idx === songlist.length - 1) {
            toggle(songlist[0])
        }
        else {
            toggle(songlist[current_song_idx + 1])
        }
    }

    function prevSong() {
        let current_song_idx = songlist.indexOf(currentSong)
        if (current_song_idx === 0) {
            toggle(songlist[songlist.length - 1])
        }
        else {
            toggle(songlist[current_song_idx - 1])
        }
    }

    function changeDuration() {
        setDuration(audref.current.duration)
        // setDuration(audio.duration)
    }

    function playPlaylist() {
        if (playingPlaylist) {
            setSongList(tempList)
        }
        else {
            setTempList(songlist)
            setSongList(playlist)
        }
        setPlayingPlaylist(!playingPlaylist)
    }

    function itClicked(){
        console.log("it get clicked")
    }

    function addToPlaylist(song){
        if(playlist.indexOf(song)>=0){
            return
        }
        setPlaylist([...playlist, song])
        // console.log("added")
    }

    function removeFromPlaylist(song){
        // console.log("removed")
        let index = playlist.indexOf(song)
        setPlaylist([...playlist.slice(0,index), ...playlist.slice(index+1)])
    } 

    const handleSeek = (e) => {
        const audio = audref.current
        const newTime = e.target.value
        audio.currentTime = newTime
        // setCurrentTime(audio?.currentTime)
        setCurrentTime(newTime)
    }

    return (
        <div id="home-section">
            <div id="search-div">
                <input type="search" id="search-bar" placeholder="Search a song..." onChange={handleSearchChanges} />
                <button onClick={() => { playPlaylist() }}>{playingPlaylist?"My Playlist":"All Songs"}</button>
            </div>
            <div id="all-songs-div">
                {
                    songlist ? (
                        (searchedTerm == "") ? (
                            songlist.map((song) => (
                                    <div className={song === currentSong ? "current-song-div" : "song-div"}>
                                        <div class="song-name-div" onClick={() => { toggle(song) }}>{song}</div>
                                        {song === currentSong ? (
                                            <div style={{display:"flex", flexDirection:"row"}}>
                                                &#9835;
                                                <div class="setting-div" onClick={()=>{playingPlaylist?removeFromPlaylist(song):addToPlaylist(song)}}>{playingPlaylist?"-":"+"}</div>
                                            </div>
                                        ) : (
                                           <div><div class="setting-div" onClick={()=>{playingPlaylist?removeFromPlaylist(song):addToPlaylist(song)}}>{playingPlaylist?"-":"+"}</div></div>
                                        )}
                                    </div>
                                    
                            ))
                        ) : (
                            filteredSongs?.map((song) => (
                                    <div className={song === currentSong ? "current-song-div" : "song-div"}>
                                        <div class="song-name-div" onClick={() => { toggle(song) }}>{song}</div>
                                        {song === currentSong ? (
                                            <div>
                                                &#9835;
                                                <div class="setting-div" onClick={()=>{itClicked()}}>{playingPlaylist?"-":"+"}</div>
                                            </div>
                                        ) : (
                                            <div><div class="setting-div" onClick={()=>{itClicked()}}>{playingPlaylist?"-":"+"}</div></div>
                                        )}
                                        
                                    </div>
                            ))
                        )

                    ) : (
                        <p style={{ color: "white" }}>Loading Songs...</p>
                    )
                }
            </div>
            <div id="current-song-div">
                <input id="seekbar"
                    type="range"
                    min="0"
                    max={songDuration}
                    value={currentTime}
                    onChange={handleSeek}
                />

                <div id="song-details">
                    <div id="song-name">
                        {currentSong}
                    </div>

                    <div id="song-controls">
                        <div class="change-song-btn" onClick={() => { prevSong() }}>&#10094;</div>  {isSongPlaying ? (<div class="play-pause-btn" onClick={() => { pause() }}>&#8214;&#8214;</div>) : (<div class="play-pause-btn" onClick={() => { play() }}>&#9654;</div>)}  <div class="change-song-btn" onClick={() => { nextSong() }} >&#10095;</div>
                        {/* &#x23ED; */}
                    </div>
                </div>
            </div>

            {songUrl ? (
                <audio id="music" ref={audref} onDurationChange={() => changeDuration()} onEnded={() => { nextSong() }} key={songUrl} >
                    <source id="main-source" ref={audref} src={songUrl} type="audio/mp3" />
                    your browser does not support audio files
                </audio>

            ) : (<div style={{ dislplay: "none" }}></div>)}
        </div>
    )
}
export default Home