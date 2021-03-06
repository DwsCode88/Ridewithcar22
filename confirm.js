import { useEffect, useState } from "react";

import tw from "tailwind-styled-components";
import Link from "next/link";
import Map from "../components/Map";
import { useRouter } from "next/router";
import RideSelector from "../components/RideSelector";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const [selected, setSelected] = useState(null);
  const [service, setService] = useState(null);

  console.log("Data", selected);

  const addtoDB = async () => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "rides"), {
      From: pickup,
      To: dropoff,
      Cust: user.displayName,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  console.log("pickup", pickup);
  console.log("dropoff", dropoff);

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);

  const getPickCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGV2cmlkZXdpdGhjYXIiLCJhIjoiY2t6dXBmd3kzMXB5bzJvcnhsa2pkc3g0ZCJ9.tLfO-YiAzYSSv90sEsce2g",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGV2cmlkZXdpdGhjYXIiLCJhIjoiY2t6dXBmd3kzMXB5bzJvcnhsa2pkc3g0ZCJ9.tLfO-YiAzYSSv90sEsce2g",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickCoordinates(pickup);
    getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          selected={selected}
          setSelected={setSelected}
          setService={service}
        />

        <ConfirmButtonContainer>
          <ConfirmButton onClick={addtoDB}>
            Confirm {selected?.service}
          </ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 py-4 text-center text-xl
`;

const Wrapper = tw.div`
flex h-screen flex-col
`;

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`;
const ConfirmButtonContainer = tw.div`
border-t-2
`;
const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-orange-500 shadow-md cursor-pointer
`;
const BackButton = tw.img`
h-full object-contain
`;
