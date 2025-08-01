// import Address from "./components/Address";
// import Card from "./components/Card";
import PersonalDetails from "./components/PersonalDetails";

const ProfileSettings = ({data}: {data: any}) => {
  return (
    <>
      <PersonalDetails data={data}/>
      {/* <Address />
      <Card /> */}
    </>
  );
};

export default ProfileSettings;
