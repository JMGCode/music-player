import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./hooks/useAuth";
import Dashboard from "./Dashboard";
import Login from "./Login";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <AuthProvider code={code}>
      <Dashboard />
    </AuthProvider>
  ) : (
    <Login />
  );
}

export default App;
