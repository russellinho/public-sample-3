import { useCandidates, useReadCandidates } from "../../hooks/useContract";

export default function ParticipantsList({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const { data: candidatesData } = useCandidates(contractAddress);

  const { data, isSuccess } = useReadCandidates(
    contractAddress,
    candidatesData,
    () => {},
    true // enabled
  );

  return <div></div>;
}
