import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <Wrapper>
      <CarLogo src="https://scontent.fric1-2.fna.fbcdn.net/v/t39.30808-6/270106542_101068099125725_5749922900883204496_n.png?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=twpAcQozAjgAX_bjrDF&_nc_ht=scontent.fric1-2.fna&oh=00_AT-u4po2m6nLRSVh1myvnMdhNjA25WBOYhN2QCcGSi_0kg&oe=6217D9B4" />
      <Title>Log in to access your account</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />

      <SignInButton onClick={() => signInWithPopup(auth, provider)}>
        Sign in with Google
      </SignInButton>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`
flex flex-col h-screen w-screen bg-gray-200 p-4
`;
const SignInButton = tw.button`
bg-black text-white text-center py-4 mt-8 self-center w-full
`;
const CarLogo = tw.img`
h-20 w-auto object-contain self-start
`;
const Title = tw.div`
text-5xl pt-4 text-gray-500
`;
const HeadImage = tw.img`
object-contain w-full
`;
