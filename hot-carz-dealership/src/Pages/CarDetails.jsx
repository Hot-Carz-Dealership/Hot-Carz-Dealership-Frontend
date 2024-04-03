import * as React from "react";
import { useParams } from "react-router-dom";

// function Header() {
//   return (
//     <header className="flex justify-center items-center self-stretch px-16 py-8 w-full tracking-wide text-center uppercase bg-black max-md:px-5 max-md:max-w-full">
//       <div className="flex gap-5 justify-between w-full max-w-[1120px] max-md:flex-wrap max-md:max-w-full">
//         <div className="flex gap-5 text-4xl font-bold leading-6 text-white">
//           <div className="my-auto">Car Dealer</div>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/8fe785e09cb62ae398e3b43065a000a5f5389f437cc966d07fdadc9dbe18c73b?apiKey=42422271ce8c469ca584ab0aeca1e146&"
//             alt="Car Dealer Logo"
//             className="shrink-0 w-10 aspect-square fill-white"
//           />
//         </div>
//         <nav className="flex gap-5 justify-between my-auto text-xl leading-6 text-white">
//           <button>Home</button>
//           <button>Cars</button>
//           <button>Services</button>
//           <button>My Acct</button>
//         </nav>
//       </div>
//     </header>
//   );
// }

function VehicleInfo({ vehicleFeatures }) {
  return (
    <section className="mt-12 max-w-full w-[822px] max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/691e5a3d4d1ce4b637d81f059ee22e582cf9dbc53fecb7be7101ea006dfcb8a2?apiKey=42422271ce8c469ca584ab0aeca1e146&"
            alt="Vehicle"
            className="grow w-full aspect-[1.12] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch px-5 my-auto text-xl font-light tracking-normal leading-8 text-black max-md:mt-10">
            <h2 className="text-4xl font-bold tracking-wide leading-6 text-center uppercase">
              Vehicle Features
            </h2>
            {vehicleFeatures.map((feature, index) => (
              <div key={index} className="mt-5">
                {feature.label} <br />
                <span className="">{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VehicleDetails({ vehicleName, msrp, onScheduleTestDrive }) {
  return (
    <section className="mt-16 max-w-full w-[921px] max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 text-4xl font-bold tracking-wide leading-6 text-center uppercase max-md:mt-10">
            <h2 className="text-black">{vehicleName}</h2>
            <div className="self-center mt-14 text-red-500 max-md:mt-10">
              {msrp} MSrP
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 tracking-wide uppercase max-md:mt-10">
            <h2 className="text-4xl font-bold leading-6 text-center text-black">
              Schedule a Test Drive
            </h2>
            <button
              onClick={onScheduleTestDrive}
              className="justify-center self-center px-6 py-2 mt-12 text-base font-medium leading-7 text-white whitespace-nowrap bg-red-700 rounded shadow-md max-md:px-5 max-md:mt-10"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PurchaseOptions({ onBuyNow, onBid }) {
  const [bidPrice, setBidPrice] = React.useState("");

  const handleBidPriceChange = (event) => {
    setBidPrice(event.target.value);
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();
    onBid(bidPrice);
  };

  return (
    <section className="flex gap-5 justify-between pr-12 mt-32 max-w-full w-[921px] max-md:flex-wrap max-md:pr-5 max-md:mt-10">
      <div className="flex flex-col tracking-wide uppercase">
        <h2 className="text-4xl font-bold leading-6 text-center text-black">
          Purchase At MSRP
        </h2>
        <button
          onClick={onBuyNow}
          className="justify-center self-center px-6 py-2 mt-8 text-base font-medium leading-7 text-white bg-red-700 rounded shadow-md max-md:px-5"
        >
          Buy Now
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="self-center text-4xl font-bold tracking-wide leading-6 text-center text-black uppercase">
          Bid on Price
        </h2>
        <form onSubmit={handleBidSubmit} className="flex gap-px mt-8">
          <label
            htmlFor="bidPrice"
            className="pb-8 text-xs tracking-normal leading-3 rounded text-black text-opacity-60"
          >
            Enter Bid Price
          </label>
          <input
            type="number"
            id="bidPrice"
            value={bidPrice}
            onChange={handleBidPriceChange}
            className="sr-only"
            aria-label="Enter Bid Price"
          />
          <button
            type="submit"
            className="justify-center self-start px-6 py-2 text-base font-medium tracking-wide leading-7 text-white uppercase whitespace-nowrap bg-red-700 rounded shadow-md max-md:px-5"
          >
            Bid
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="self-stretch mt-32 w-full bg-black min-h-[287px] max-md:mt-10 max-md:max-w-full" />
  );
}

function CarDetails() {
  const vehicleFeatures = [
    { label: "Vin", value: "5YFB4MDE2RP135638" },
    { label: "Color", value: "Red" },
    { label: "Body StylLLLLLLLe", value: "Sports Coupe" },
    { label: "Transmission", value: "6-speed manual" },
  ];

  const handleScheduleTestDrive = () => {
    // Implement test drive scheduling logic here
    console.log("Scheduling test drive...");
  };

  const handleBuyNow = () => {
    // Implement buy now logic here
    console.log("Buying now...");
  };

  const handleBid = (bidPrice) => {
    // Implement bid logic here
    console.log(`Bidding with price: ${bidPrice}`);
  };

  const { id } = useParams(); // Extract VIN_carID from URL

  return (
    <div className="flex flex-col items-center bg-gray-200">
      {/* <Header /> */}
      <h1 className="mt-16 text-6xl font-bold  leading-5 text-center text-red-500 uppercase max-md:mt-10 max-md:text-4xl">
        Vehicle Info {id}
      </h1>
      <VehicleInfo vehicleFeatures={vehicleFeatures} />
      <VehicleDetails
        vehicleName="2022 Toyota Supra"
        msrp="$46,400"
        onScheduleTestDrive={handleScheduleTestDrive}
      />
      <PurchaseOptions onBuyNow={handleBuyNow} onBid={handleBid} />
      <Footer />
    </div>
  );
}

export default CarDetails;
