import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import mapboxgl from "!mapbox-gl";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByLatLng } from "react-google-places-autocomplete";

const Search = () => {
  const [pickup, setPickup] = useState();
  const [dropoff, setDropoff] = useState("");
  const [test, setTest] = useState("");
  const [value, setValue] = useState(null);
  const [fromaddress, setFromAddress] = useState(null);
  const [toaddress, setToAddress] = useState(null);
  const [select, setSelect] = useState(null);
  const [select2, setSelect2] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [userlocation, setUserLocation] = useState(null);

  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    return promiseInProgress && <h1>Hey some async call in progress ! </h1>;
  };

  useEffect(() => {
    // Gets Users Location
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);
  console.log(lat, long);
  const handleFocus = (element) => {
    //from input felid
    if (fromaddress) {
      select.select.state.inputValue = fromaddress.label;
    }
  };
  const handleFocus2 = (element) => {
    //to input field
    if (toaddress) {
      select.select.state.inputValue = toaddress.label;
    }
  };
  console.log("From", fromaddress);
  console.log("To", toaddress);

  const getPickCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGV2cmlkZXdpdGhjYXIiLCJhIjoiY2t6dXBmd3kzMXB5bzJvcnhsa2pkc3g0ZCJ9.tLfO-YiAzYSSv90sEsce2g",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setUserLocation(data.features[0].place_name);
      });
    console.log("userloc", userlocation);
  };

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      {/* Button Conatiner */}
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
          <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
        </FromToIcons>
        <InputBoxes>
          <Input>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyDDO2RdmUmclDGV7cTyhZQvK5xWiKnv0Vk"
              apiOptions={{ language: "en", region: "US" }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: "US",
                },
              }}
              selectProps={{
                ref: (ref) => {
                  setSelect(ref);
                },
                value: fromaddress,
                blurInputOnSelect: true,
                onChange: setFromAddress,
                onFocus: handleFocus,
                placeholder: "Where from?",
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: "orange", //text color
                  }),
                  option: (provided) => ({
                    // suggestions color
                    ...provided,
                    color: "purple",
                  }),
                  singleValue: (provided) => ({
                    //text when complete color
                    ...provided,
                    color: "red",
                  }),
                },
              }}
            />
          </Input>
          {/* <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          /> */}
          <Input>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyDDO2RdmUmclDGV7cTyhZQvK5xWiKnv0Vk"
              apiOptions={{ language: "en", region: "US" }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: "US",
                },
              }}
              selectProps={{
                ref: (ref) => {
                  setSelect(ref);
                },
                value: toaddress,
                blurInputOnSelect: true,
                onChange: setToAddress,
                onFocus: handleFocus2,
                placeholder: "Where to?",
              }}
            />
          </Input>
        </InputBoxes>

        <PlusIcon
          onClick={getPickCoordinates}
          src="https://img.icons8.com/color/48/000000/marker--v1.png"
        />
      </InputContainer>
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        Saved places
      </SavedPlaces>
      <Link
        href={{
          pathname: "/confirm",
          query: {
            pickup: fromaddress, // this needs to be fromaddress.label to send just the address to the next page
            dropoff: toaddress, // this needs to be toaddress.label to send just the address to the next page
          },
        }}
      >
        <ConfirBbuttonContainer>Confirm Locations</ConfirBbuttonContainer>
      </Link>

      {/* Input Container */}
      {/* Saved Places */}
      {/* Confirm Location */}
    </Wrapper>
  );
};

export default Search;

const Wrapper = tw.div`
bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
bg-white px-4
`;

const BackButton = tw.img`
h-12 cursor-pointer
`;

const FromToIcons = tw.div`
w-10 flex flex-col mr-2 items-center
`;

const Google = tw.div`

`;

const InputContainer = tw.div`
bg-white flex items-center px-4 mb-2
`;
const Circle = tw.img`
h-2.5 

`;

const Line = tw.img`
h-10
`;

const Square = tw.img`
h-3
`;

const InputBoxes = tw.div`
flex flex-col flex-1
`;

const Input = tw.div`
flex-col flex p-2
`;

const PlusIcon = tw.img`
w-10 h-10 bg-gray-200 rounded-full ml-3 cursor-pointer
`;

const SavedPlaces = tw.div`
flex items-center bg-white px-4 py-2
`;
const StarIcon = tw.img`
bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`;
const ConfirBbuttonContainer = tw.div`
bg-black text-white text-center mt-2 mx-4 py-3 text-2xl cursor-pointer
`;
