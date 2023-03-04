import { NavItems } from "./NavItems";

export function Navbar() {

  return (
    <nav className="flex justify-between content-end p-4 bg-slate-300">
      <div className= "text-black font-mono font-bold text-4xl text-center">Skimify</div>
      <NavItems></NavItems>
    </nav>
  )
}
