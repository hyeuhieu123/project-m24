export default function Navbar() {
  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between ml-64">
      <div className="flex items-center text-xl">
        <span className="text-white font-bold">emcomerce</span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 flex items-center pl-2">
            <button></button>
          </span>
          <input
            type="text"
            className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
          />
        </div>
      </div>
    </nav>
  );
}
