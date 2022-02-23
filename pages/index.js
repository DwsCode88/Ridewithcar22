import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        // if they are not logged in goes back to login page
        setUser(null);
        router.push("/login");
      }
    });
  }, []);

  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <Logo src="https://scontent.fric1-2.fna.fbcdn.net/v/t39.30808-6/270106542_101068099125725_5749922900883204496_n.png?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=twpAcQozAjgAX_bjrDF&_nc_ht=scontent.fric1-2.fna&oh=00_AT-u4po2m6nLRSVh1myvnMdhNjA25WBOYhN2QCcGSi_0kg&oe=6217D9B4"></Logo>
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoURL} />
          </Profile>
        </Header>

        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Wheels
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve
          </ActionButton>
        </ActionButtons>
        <InputButton>Where to?</InputButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex flex-col h-screen
`;

const ActionItems = tw.div`
flex-1 p-4
`;

const Header = tw.div`
flex justify-between
`;

const Profile = tw.div`
flex items-center

`;

const Name = tw.div`
mr-4 w-20 text-sm

`;

const UserImage = tw.img`
h-12 w-12 rounded-full border-grey-200 p-px

`;

const Logo = tw.img`
h-24 rounded-full
`;

const ActionButtons = tw.div`
flex 

`;

const ActionButton = tw.div`
flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl

`;

const ActionButtonImage = tw.img`
h-3/5
`;

const InputButton = tw.div`
h-20 bg-gray-200  text-2xl p-4 flex items-center mt-8 

`;
