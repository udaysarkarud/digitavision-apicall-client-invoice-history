import SearchInput from "@/components/SearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-20 h-screen bg-gray-300 px-2">
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            <SearchInput />
            <div>Asdasd</div>
          </div>
        </div>
      </div>
    </div>
  );
}
