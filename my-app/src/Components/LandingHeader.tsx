export function LandingHeader() {
  return (
    <div className="p-2 h-screen flex flex-col items-center gap-6">
      <div className="text-7xl break-words font-bold text-gray-700 w-6/12 text-center">
        Simplify your lecture notes and videos.
      </div>

      <div className="text-2xl w-4/12 text-center text-gray-600">
        Skimify is an AI tool that enables students to summarize their lecture videos and notes.
      </div>

      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Skim It
      </button>
    </div>

  )
}
