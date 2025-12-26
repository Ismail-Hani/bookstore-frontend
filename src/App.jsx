import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Books from "./Books";

function App() {
  const [page, setPage] = useState("login");
  const token = localStorage.getItem("accessToken");

  // Utilisateur connecté
  if (token) {
    return (
      <div className="app">
        <div className="card">
          <button
            className="secondary"
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>

        <Books />
      </div>
    );
  }

  // Login / Register
  return (
    <div className="app">
      {page === "login" && (
        <Login onRegister={() => setPage("register")} />
      )}
      {page === "register" && (
        <Register onLogin={() => setPage("login")} />
      )}
    </div>
  );
}

<button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }}
>
  Logout
</button>


export default App;
