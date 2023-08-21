import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useArbitrableEscrowFactoryConfig } from "../../hooks/useContract";
import PrimaryButton from "../buttons/PrimaryButton";

export default function ContractCreationButton({
  address,
  formData,
}: {
  address: string | any;
  formData: {
    dao: string;
    daoImage?: string;
    headline: string;
    description: string;
    eventLink?: string;
    eventImage?: string;
  };
}) {
  const router = useRouter();

  const [lastCreatedContractData, setLastCreatedContractData] =
    useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const funderConfig = useArbitrableEscrowFactoryConfig(
    "createEscrowAsFunder",
    [process.env.NEXT_PUBLIC_EMPTY_ADDRESS, formData.headline || "No title"]
  );

  const { write: createFunderEscrow } = useContractWrite({
    ...funderConfig,

    onError(error) {
      console.log("Error", error);
      toast.error("Contract creation has been cancelled");
    },

    onSuccess(data, variables, context) {
      console.log({ data, variables, context });
      setLastCreatedContractData(data);
    },
  });

  const handleContractCreation = () => {
    if (!formData.dao || !formData.headline || !formData.description) {
      return toast.error("Please fill out the required fields");
    }

    if (createFunderEscrow) {
      setIsLoading(true);
      createFunderEscrow();
    }
  };

  const { data: transactionData } = useWaitForTransaction({
    hash: lastCreatedContractData?.hash,
  });

  useEffect(() => {
    if (
      address &&
      lastCreatedContractData !== null &&
      transactionData?.logs &&
      transactionData?.logs?.length > 2
    ) {
      axios
        .post("/api/events", {
          // transactionHash: lastCreatedContractData.hash,
          ownerAddress: address,
          contractAddress: transactionData.logs[1].address,
          organizer: {
            name: formData.dao,
            image: formData.daoImage || undefined,
          },
          name: formData.headline,
          description: formData.description,
          link: formData.eventLink,
          image: formData.eventImage || undefined,
        })
        .then(() => {
          setLastCreatedContractData(null);
          toast.success("Your event has been created!");
          router.push("/events/" + transactionData.logs[1].address);
        })
        .catch((e) => toast.error("Error registering an event!"))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lastCreatedContractData, transactionData, address, formData]);

  return (
    <PrimaryButton
      className="md:max-w-[280px] text-gray-900"
      disabled={isLoading}
      onClick={handleContractCreation}
    >
      {isLoading ? "CREATING.." : "CREATE"}
    </PrimaryButton>
  );
}
