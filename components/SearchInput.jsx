"use client";
export default function SearchInput() {
  const formOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form?.email?.value;
    console.log(searchQuery);
  };
  return (
    <div className="relative">
      <form onSubmit={formOnSubmit}>
        <input
          type="text"
          className="bg-white h-14 w-full px-12 rounded-lg text-black"
          name="email"
        />
      </form>
      <span className="absolute top-4 right-5 border-l pl-4">
        <i className="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer"></i>
      </span>
    </div>
  );
}
