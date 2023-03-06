import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups}></MeetupList>;
};

//data fetching for pre-rendering
//this code will be executed during the build process
export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://apjavier27:3kDi3lhoaZ87fBLW@cluster0.s6lzivr.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

//this will run server-side
//this will run every request on this page
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;

//     return {
//         props:DUMMY_MEETUPS,
//     }
// }

export default HomePage;
