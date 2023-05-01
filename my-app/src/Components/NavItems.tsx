import {Link, useNavigate} from "react-router-dom";
import tokenStore from "../mobx/stores/TokenStore";
import { logoutUser } from "../apis/UserAPI";
export function NavItems() {
  const navigate = useNavigate();

  const userLoggedIn = tokenStore.getToken()

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      const res = await logoutUser(tokenStore.getToken())
      tokenStore.removeToken()
    } catch(err) {
      tokenStore.removeToken()
    }
    navigate("/")
  }
  return (
    <ul className="flex gap-4">
      {!userLoggedIn ? ( // TODO: change
        <>
          <li>
            <button className="nav-item  border-black border-2 py-1 px-2 rounded-lg text-sm font-medium">
            <Link to={"/create-account"}>Sign Up</Link>
            </button>
          </li>
          <li>
            <button className="nav-item  border-black border-2 py-1 px-2 rounded-lg text-sm font-medium">
                <Link to={"/login"}>Log In</Link>
              </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <button
              className="nav-item  border-black border-2 py-1 px-2 rounded-lg text-sm font-medium"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </li>
        </>
      )}
    </ul>
  )
}
