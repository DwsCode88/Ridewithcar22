import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Map from "./components/Map";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  console.log("pickup", pickup);
  console.log("dropoff", dropoff);

  const [pickupCoordinates, setPickupCoordinates] = useState();
  const [dropoffCoordinates, setDropoffCoordinates] = useState();

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
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector />

        <ConfirmButtonContainer>
          <ConfirmButton>Confirm Ride</ConfirmButton>
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
