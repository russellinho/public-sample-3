import dynamic from "next/dynamic";

const DynamicContractCreationButton = dynamic(
  () => import("../../components/pages/EventPageComponent"),
  {
    ssr: false,
  }
);
const EventPage = () => {
  return <DynamicContractCreationButton />;
};

// export async function getServerSideProps(context: any) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default EventPage;
