"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineMyLocation } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { poppins } from "../fonts";
import { PulseLoader } from "react-spinners";
import { Ripple } from "primereact/ripple";

// const apiKey = process.env.NEXT_PUBLIC_PLACES_API_KEY;
const apiKey = "AIzaSyDQBWabduNTDVGDNUoXz-HSNKB9YWQ8jJI";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load google map api js
function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });

    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
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
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    console.log(component);

    if (types.includes("sublocality")) {
      address.locality = value;
    }
    if (types.includes("locality")) {
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
};

function UserLocation({
  gettingPermissionError,
  btnPop,
  handleCancel,
  gettingLocation,
}) {
  const searchInput = useRef(null);
  const [places, setPlaces] = useState([]);
  const [permissionError, setPermissionError] = useState("");
  const [address, setAddress] = useState("");
  const [loaderEnable, setLoaderEnable] = useState(false);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }

    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (address) => {
    setAddress(address);
    gettingLocation(address);
    handleCancel(false);
  };

  // init autocompleted
  const initAutoCompleted = () => {
    if (!searchInput.current) return;
    const autocompleteservice =
      new window.google.maps.places.AutocompleteService();
    searchInput.current.addEventListener("input", (event) => {
      const query = event.target.value;
      const options = {
        input: query,
        componentRestrictions: { country: "IN" }, // 'IN' is the country code for India
      };

      autocompleteservice.getPlacePredictions(
        options,
        (predictions, status) => {
          if (status === "OK") {
            displayPredictions(predictions);
          }
        }
      );
    });
  };

  const displayPredictions = (predictions) => {
    if (searchInput.current) {
      setPlaces(predictions);
      gettingPermissionError("");
      setPermissionError("");
    }
  };

  //code to get my location
  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        console.log("current", location.results);
        const _address = extractAddress(place);
        setAddress(`${_address.locality} ${_address.city} ${_address.state}`);

        gettingLocation(`${_address.locality}, ${_address.city}`);
        setLoaderEnable(false);
        handleCancel(false);

        searchInput.current.value = _address?.plain();
      });
  };

  const findMyLocation = (event) => {
    setLoaderEnable(true);

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            // Permission already granted, proceed to get location
            navigator.geolocation.getCurrentPosition(
              (position) => {
                reverseGeocode(position.coords);
                gettingPermissionError("");
                setPermissionError("");
              },
              (error) => {
                setLoaderEnable(false);
                console.error("Error getting location1:", error.message);
                gettingPermissionError(
                  "Please enable location permission And Try Again!"
                );
                gettingLocation("No Location Detected");
                setPermissionError(
                  "Please enable location permission And Try Again!"
                );
              }
            );
          } else if (
            permissionStatus.state === "prompt" ||
            permissionStatus.state === "denied"
          ) {
            // Permission not granted or prompt state, ask for permission
            navigator.geolocation.getCurrentPosition(
              (position) => {
                reverseGeocode(position.coords);
                gettingPermissionError("");
                setPermissionError("");
              },
              (error) => {
                setLoaderEnable(false);
                console.error("Error getting location2:", error.message);
                setPermissionError(
                  "Please enable location permission And Try Again!"
                );
                gettingPermissionError(
                  "Please enable location permission And Try Again!"
                );
                gettingLocation("No Location Detected");
              }
            );
          }
        });
    } else {
      // Fallback for browsers that do not support the Permissions API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocode(position.coords);
          gettingPermissionError("");
          setPermissionError("");
        },
        (error) => {
          console.error("Error getting location3:", error.message);
          setLoaderEnable(false);
          gettingPermissionError(
            "Please enable location permission And Try Again!"
          );
          gettingLocation("No Location Detected");
          setPermissionError(
            "Please enable location permission And Try Again!"
          );
        }
      );
    }
  };

  // Load Map Script After Mounted
  useEffect(() => {
    initMapScript().then(() => {
      initAutoCompleted();
    });
  }, []);

  useEffect(() => {
    findMyLocation();
  }, []);

  useEffect(() => {
    function generateSubstrings(input) {
      const substrings = [];
      let currentSubstring = "";

      for (const char of input) {
        currentSubstring += char;
        substrings.push(currentSubstring.trim().toLowerCase());
      }
      return substrings;
    }

    const inputAddress = address;
    const substringsArray = generateSubstrings(inputAddress);
  }, [address]);

  return (
    <>
      <div
        className={`${
          btnPop === true ? "bottom-[0px] visible z-10" : "hidden"
        } rounded-t-2xl shadow-2xl fixed p-5 h-full bg-white left-0 w-full lg:max-w-[30rem] select-none`}
      >
        <div>
          <div className="flex justify-between items-center">
            <h2 className={`text-sm flex gap- items-center`}>
              {/* <MdOutlineKeyboardArrowDown color="#727272" size={20} /> */}
              Select Your Location
            </h2>

            <div>
              <MdOutlineCancel
                onClick={() => handleCancel(false)}
                size={25}
                className="cursor-pointer"
                color="#10B981"
              />
            </div>
          </div>
        </div>

        {/* Search Input code */}
        <div className="flex flex-col pt-5 mx-2">
          <div className="search border-zinc-200 border-[1px] border-solid p-2 rounded-lg flex items-center gap-2">
            <span>
              <FiSearch size={20} color="#10B981" />
            </span>
            <input
              type="text"
              ref={searchInput}
              autoComplete="on"
              placeholder="Enter area, street name"
              className="w-full outline-none text-sm p-1"
            />

            {searchInput?.current?.value !== null && (
              <TiDelete
                onClick={() => {
                  searchInput.current.value = "";
                  setPlaces([]);
                }}
                color="#989898"
                size={30}
              />
            )}
          </div>

          {/* Auto Detect Location JSX */}
          {(places.length === 0 || !searchInput.current.value) && (
            <div>
              <div
                className="mt-5 flex caret-transparent gap-2 cursor-pointer p-2 rounded-md p-ripple"
                onClick={findMyLocation}
              >
                <Ripple
                  pt={{
                    root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
                  }}
                />
                <MdOutlineMyLocation color="#25bd80" size={20} />
                <div className="flex flex-col">
                  <span className="text-sm">Use Current Location</span>
                  <span className={`text-xs text-zinc-500 pt-1`}>
                    Using GPS
                  </span>
                </div>

                {loaderEnable && (
                  <PulseLoader
                    color="green"
                    loading={loaderEnable}
                    cssOverride={CSSProperties}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}

              </div>
            </div>
          )}
          {permissionError && (
            <span className={`text-xs text-red-500 pt-5`}>
              {permissionError}
            </span>
          )}

          <div className="space-y-4 mt-5">
            {places?.map((address, i) => (
              <div
                onClick={() =>
                  onChangeAddress(
                    `${address.structured_formatting.main_text}, ${address.structured_formatting.secondary_text}`
                  )
                }
                key={i}
                className="flex gap-2 border-b-[1px] border-zinc-400 border-dotted pb-4 cursor-pointer"
              >
                <GrLocationPin
                  className="min-w-[25px]"
                  color="#25bd80"
                  size={25}
                />

                <div>
                  <h2 className="text-sm">
                    {address.structured_formatting.main_text}
                  </h2>
                  <h6 className="text-xs text-zinc-500">
                    {address.structured_formatting.secondary_text}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLocation;
