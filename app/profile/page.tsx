
import ProfileContainer from "../_components/profile/ProfileContainer";
import ProtectedRoute from "../_components/ProtectedRoute";

const page = () => {
  
  return (
    <ProtectedRoute>
      <ProfileContainer/>
    </ProtectedRoute>
  );
};
export default page;
