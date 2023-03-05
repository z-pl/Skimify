import {Link} from "react-router-dom";

export function NavItems() {
  return (
    <ul className="flex gap-4">
      <li>
        <button className="border bg-slate-200 border-black border-0 py-1 px-2 rounded-lg text-sm font-medium">
          Sign Up
        </button>
      </li>
      <li>
        <button className="border bg-slate-200 border-black border-0 py-1 px-2 rounded-lg text-sm font-medium">
            <Link to={"/login"}>Log In</Link>
          </button>
      </li>
    </ul>
  )
}
