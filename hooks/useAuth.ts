import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAccount, useDisconnect } from "wagmi";
import { isAuthenticatingState } from "../recoil/authentication/atom";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  const { data: session, status: sessionStatus } = useSession();
  const { address, status: accountStatus } = useAccount({ onDisconnect: goHome });

  const { disconnect } = useDisconnect();

  const isAuthenticating = useRecoilValue(isAuthenticatingState);

  const isLoading =
    accountStatus === "connecting" ||
    accountStatus === "reconnecting" ||
    sessionStatus === "loading";

  useEffect(() => {
    const checkAuth = async () => {
      // skip it
      // if (session && !address) await signOut();
      // if (!session && address) disconnect();
    };

    if (
      sessionStatus !== "loading" &&
      !isAuthenticating &&
      accountStatus !== "connecting" &&
      accountStatus !== "reconnecting"
    )
      checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, address, sessionStatus, accountStatus, disconnect]);

  return {
    session: session as any,
    address,
    isLoading,
  };
};
