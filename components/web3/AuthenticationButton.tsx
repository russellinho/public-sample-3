import React, { useCallback, useEffect, useState } from "react";
import { getEllipsisText } from "../../utils/helpers";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { isAuthenticatingState } from "../../recoil/authentication/atom";

export default function AuthenticationButton({ type }: { type?: string }) {
  const { address } = useAccount();

  const [isAuthenticating, setIsAuthenticating] = useRecoilState(
    isAuthenticatingState
  );

  const {
    connectAsync,
    connectors,
    isLoading: isConnectingWallet,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync, isLoading: isSigning } = useSignMessage();

  const handleSignin = useCallback(async () => {
    try {
      setIsAuthenticating(true);
      const res = await connectAsync({ connector: connectors[0] });

      const connectedChainId = res.chain.id;
      const connectedAddress = res.account;

      if (!connectedAddress || !connectedChainId) return;

      const message = new SiweMessage({
        domain: window.location.host,
        address: connectedAddress,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: connectedChainId,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } catch (error) {
      disconnect();
      window.alert(error);
    } finally {
      setIsAuthenticating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = isConnectingWallet || isSigning;

  const handleSignOut = async () => {
    disconnect();
    await signOut();
  };

  if (type === "app") {
    return (
      <button
        id="disconnect_wallet_btn"
        className="w-[130px] md:w-[176px] h-[33px] md:h-[48px] flex justify-center items-center rounded-[28px] md:rounded-[40px] bg-secondary-gradient
      font-medium text-[#1c1c1c] text-[12px] leading-[13px] md:text-[16px] md:leading-[19px] uppercase
      hover:opacity-80
    "
        disabled={isLoading || !address}
        onClick={() => handleSignOut()}
      >
        <div className="relative w-[24px] h-[24px]">
          <Image src={"/icons/Ic_wallet.svg"} alt="wallet" layout="fill" />
        </div>
        <span className="ml-[14px]">
          {!isLoading && address ? getEllipsisText(address, 4) : "..."}
        </span>
      </button>
    );
  }

  return (
    <button
      id="connect_wallet_btn"
      className="w-[264px] md:w-[358px] h-[56px] md:h-[80px] flex justify-center items-center rounded-[28px] md:rounded-[40px] bg-primary-gradient
      font-medium text-white text-[16px] leading-[19px] md:text-[24px] md:leading-[29px] uppercase
        hover:opacity-80
      "
      disabled={isLoading || !!address}
      onClick={() => handleSignin()}
    >
      <div className="relative w-[24px] h-[24px] md:w-[40px] md:h-[40px]">
        <Image src={"/icons/Ic_wallet_white.svg"} alt="wallet" layout="fill" />
      </div>
      <span className="ml-4 md:ml-5 text-white">
        {!isLoading && address ? "Connecting.." : "CONNECT WALLET"}
      </span>
    </button>
  );
}
