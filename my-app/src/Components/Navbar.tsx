import { NavItems } from "./NavItems";

export function Navbar() {

  return (
    <nav className="flex justify-between content-end p-4 bg-white">
      <div className= "nav-logo  stroke-black font-roboto font-mono font-bold text-4xl text-center">Skimify</div>
      <NavItems></NavItems>
    </nav>
  )
}
