import CardDessign from "@/components/CardDessign";

async function getData(params) {
  const res = await fetch(
    `http://localhost:3000/api/invoice-history?email=${params}`,
    { cache: "no-store" }
  );
  const { result } = await res.json();

  return result;
}

export default async function page({ searchParams }) {
  const data = await getData(searchParams.search);

  return (
    <div className="py-20 h-screen bg-gray-300 px-2">
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            {data.map((item, index) => {
              <p className="text-black" key={item.index}>
                {index}
              </p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
