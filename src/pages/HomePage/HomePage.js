import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";

export default function HomePage() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  return (
    <div>
      <h3>Home page</h3>
      {token ? (
        <div>Hello {user.name}!</div>
      ) : (
        <Link to={`/login`} style={{ textDecoration: "none" }}>
          <button>Please log in</button>
        </Link>
      )}
    </div>
  );
}
