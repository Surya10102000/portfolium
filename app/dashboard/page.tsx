import ProtectedRoute from "../_components/ProtectedRoute";
const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>Your protected dashboard content</div>
    </ProtectedRoute>
  );
};

export default Dashboard;