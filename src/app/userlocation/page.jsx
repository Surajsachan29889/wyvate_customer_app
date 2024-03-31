"use client"

import React, { useEffect, useRef, useState } from 'react'
import {Search, GpsFixed} from '@mui/icons-material'


// const apiKey = import.meta.env.FIREBASE_PLACESAPI_KEY;
// const apiKey = `AIzaSyBe_G9IjVYEMzSxpE6Ap0HZ4vZfudBO5Dk`;
const apiKey = `uighyug`;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json'


// load google map api js

function loadAsyncScript(src){

  return new Promise(resolve => {

    const script = document.createElement("script")
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src

    })

    script.addEventListener('load', ()=> resolve(script));
    document.head.appendChild(script)
  })
}


const extractAddress = (place)=> {

  const address = {

    locality: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const locality = this.locality ? this.locality + ", " : "";
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return locality + city + zip + state + this.country;
    }

  
  }

  if(!Array.isArray(place?.address_components)){

    return address;

  }

  place.address_components.forEach( component=> {

    const types = component.types;
    const value = component.long_name;

    console.log(component)

    if(types.includes("sublocality")){

      address.locality = value;

    }
    if(types.includes("locality")){

      address.city = value;

    }

    if (types.includes("administrative_area_level_1")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }

  });

  return address;

}

function UserLocation() {

      const searchInput = useRef(null)
      const [address, setAddress] = useState('')

    //   const { pathname } = useLocation();


    //   useEffect(() => {
    //       window.scrollTo(0, 0);
    //     }, [pathname]);

     // init gmap script
      const initMapScript = () => {

        // if script already loaded
        if(window.google){
          return Promise.resolve();
        }
        
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src)

      }

      // do something on address change
      const onChangeAddress = (autocomplete) => {

        const place = autocomplete.getPlace();
        const _address = extractAddress(place);
        setAddress(`${_address.locality} ${_address.city} ${_address.state}`)
        // setFormData((prev) => {

        //   return{
    
        //     ...prev, location : `${_address.locality}, ${_address.city}, ${_address.state}`
        //   }
        // })

        console.log(`${_address.locality}, ${_address.city}, ${_address.state}`)
      
      }
       

      // init autocompleted
      const initAutoCompleted = ()=> {
 
        if(!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(['address_component', 'geometry']);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete))



      }

      //code to get my location
      const reverseGeocode =  ({ latitude: lat, longitude: lng}) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
          fetch(url)
            .then(response => response.json())
            .then(location => {
              const place = location.results[0];
          const _address = extractAddress(place);
          setAddress(`${_address.locality} ${_address.city} ${_address.state}`);
          console.log(`${_address.locality}, ${_address.city}, ${_address.state}`)
        //   setFormData((prev) => {

        //     return{
      
        //       ...prev, location : `${_address.locality}, ${_address.city}, ${_address.state}`
        //     }
        //   })
        
        
          searchInput.current.value = _address.plain();
            })
      }

      const findMyLocation = () => {


        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position => {

            reverseGeocode(position.coords)
          })
        }

      }
 
     // load map script after mounted
     useEffect(() => {
       initMapScript().then(() => {
          initAutoCompleted()
       })
     }, [])

     
    //  function handleCheck(){

    //   if(Object.keys(address).length === 0){

    //     return false;

    //   }else{

    //     return true
    //   }

    //   return;
    
    // }

    // useEffect(() => {

    //   validation(handleCheck)

    // }, [handleCheck])

    // console.log(address)

    useEffect(() => {

      function generateSubstrings(input) {
        const substrings = [];
        let currentSubstring = '';
      
        for (const char of input) {
          currentSubstring += char;
          substrings.push(currentSubstring.trim().toLowerCase());
        }

        return substrings;
      }
      
      const inputAddress = address;
      const substringsArray = generateSubstrings(inputAddress);
      
      console.log(substringsArray);
    //   setFormData((prev) => {

    //     return{
  
    //       ...prev, address : substringsArray
    //     }
    //   })

    }, [address])
   

    


  return (
    <>
       <div className="max-w-[600px] mx-auto p-5 pb-[160px]">

       <div className='grid grid-cols-1 justify-items-center'>
       
        <div className='search'>
         <span><Search /></span>
         <input type="text" ref={searchInput} autoComplete='on' placeholder='Your Location*' className='' />
         <button onClick={findMyLocation}><GpsFixed /></button>
        </div>

       </div>

       <div className='address'>
          <p>Locality: <span>{address.locality}</span></p>
          <p>City: <span>{address.city}</span></p>
          <p>State: <span>{address.state}</span></p>
          <p>Zip: <span>{address.zip}</span></p>
          <p>Count: <span>{address.country}</span></p>
        </div>
       </div>
    </>
  )
}

export default UserLocation;
