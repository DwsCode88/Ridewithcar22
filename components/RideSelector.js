import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "./carList";

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [selected, setSelected] = useState(null);

  console.log("selected", selected);

  useEffect(() => {
    rideDuration = fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiZGV2cmlkZXdpdGhjYXIiLCJhIjoiY2t6dXBmd3kzMXB5bzJvcnhsa2pkc3g0ZCJ9.tLfO-YiAzYSSv90sEsce2g`
    )
      .then((res) => res.json())
      .then((data) => {
        setRideDuration(data.routes[0].duration / 100);
      })
      .catch((e) => console.log(e));
  }, [pickupCoordinates, dropoffCoordinates]);
  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more</Title>

      <CarList>
        {carList.map((car, index) => (
          <Car
            className={selected === car.id ? "bg-slate-300" : "bg-white"}
            key={car.id}
            onClick={() => setSelected(car.id)}
          >
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 mins away</Time>
            </CarDetails>
            <Price>{"$" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b
`;
const CarDetails = tw.div`
flex-1
`;
const Price = tw.div`
text-sm
`;
const Time = tw.div`
text-xs text-blue-500 
`;
const Service = tw.div`
font-medium
`;
const Car = tw.div`
flex p-4 items-center
`;
const CarImage = tw.img`
h-14 mr-4
`;
const CarList = tw.div`
overflow-y-scroll 
`;

const Wrapper = tw.div`
flex-1 overflow-y-scroll flex flex-col
`;
