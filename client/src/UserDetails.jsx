export default function UserContactDetails({ userData }) {
  console.log(userData);
  return <div>{userData.first_name}</div>;
}
