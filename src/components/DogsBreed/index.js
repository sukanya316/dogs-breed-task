import { useEffect,useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {BsSuitHeartFill} from 'react-icons/bs'

import './index.css'

const DogsBreed=()=>{
    const [dogs,setDogs]=useState([])
    const [favourites,setFavourites]=useState([])
    const [val,setVal]=useState('')

    //Getting the dogs list by breed
    const getDogsList=async()=>{
        const response=await fetch('https://dog.ceo/api/breed/hound/images',{method:'GET'})
        const data=await response.json()
        const formattedData=data.message.map((item,index)=>({imgUrl:item,id:index,isFav:false}))
        const arr=formattedData.slice(0,10)
        console.log(arr)
      
        setDogs(arr)
        
    }

    //Getting list based on searched breed 
    const getSearchedItems=async()=>{
        const response=await fetch(`https://dog.ceo/api/breed/${val}/images/random/10`)
        const data=await response.json()
        if(response.ok){
        const formattedData=data.message.map((item,index)=>({imgUrl:item,id:index,isFav:false}))
        const arr=formattedData.slice(0,10)
        setDogs(arr)
        }
        else{
            setDogs([])
        }
       
       
    }

    // Favorite and Unfavorite the item
    const addToFavourites=(dogObj)=>{
        const {id}=dogObj
        const isItemFound=favourites.find(favItem=>favItem.id===id)
        if(isItemFound===undefined){
        const favs=[...favourites,{...dogObj}]
        setFavourites(favs)
        
        }
        else{
            const favs=favourites.filter(favItem=>favItem.id!==id)
            setFavourites(favs)
        }
        const objIndex = dogs.findIndex((obj => obj.id === dogObj.id));
        dogs[objIndex].isFav = !dogObj.isFav;
        console.log(dogs[objIndex])
        setDogs(dogs)
        
      }

    useEffect(()=>{
        getDogsList()
      },[])

    return(
        <div className='dog-breeds-container'>
            <div className="dogs-header">
                <h1>Dog Breeds</h1>
                <a href='#favourites'><BsSuitHeartFill className='heart-icon' /></a>
            </div>
            <div className='search-container'>
                <input type='search' value={val} className='search-input' onChange={(event)=>setVal(event.target.value)} />
                <button type='button' className='search-btn' onClick={()=>getSearchedItems()}><BiSearchAlt2 className='search-icon'/> Search</button>
            </div>
            {
                dogs.length!==0 ?
            <ul className='dogs-items-container'>
                {
                    dogs.map((dog)=><li key={`dog-${dog.id}`} className='dog-item'>
                        <img src={dog.imgUrl} alt={`img-${dog.id}`} className='dog-img'/>
                        <BsSuitHeartFill className={`${dog.isFav===true?'red-heart-on-img':'heart-on-img'}`} onClick={()=>addToFavourites(dog)}/>
                    </li>)
                }
            </ul>
            :
           ( <div style={{textAlign:'center'}}>
                <h2>No Items Found</h2>
            </div>
           )
            }
            <hr/>
            <div>
            <h2><BsSuitHeartFill className='fav-heart' /> Favorites</h2>
            <ul className='favourite-items-container' id="favourites"> 
                {
                     favourites.map((item)=><li key={`dog-${item.id}`} className='dog-item'>
                     <img src={item.imgUrl} alt={`img-${item.id}`} className='dog-img'/>
                     <BsSuitHeartFill className='heart-on-img red-heart-on-img'  />
                 </li>)
                }
            </ul>
            </div>
        </div>

    )
}
export default DogsBreed
