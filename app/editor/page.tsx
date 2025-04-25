import ProtectedRoute from "../_components/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <div>This is the editor page </div>
    </ProtectedRoute>
  );
};
export default page;
