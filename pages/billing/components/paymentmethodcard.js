import Image from "next/image";

export default function PaymentMethodCard({ info }) {
  const onShowDropdown = () => {
    document
      .getElementById(`payment_dropdown_${info}`)
      .classList.toggle("show");
  };

  return (
    <div className="flex justify-between w-full items-center bg-input-color rounded-2xl px-[26px] py-6">
      <div className="flex flex-wrap items-center gap-[23px]">
        <Image
          id={info}
          src={`/${info}.svg`}
          alt={info}
          width={78}
          height={42}
          draggable="false"
        />
        <div>
          <p className="text-white text-lg font-medium mb-[7px] inter-font">
            Card XXXX XXXX {info}
          </p>
          <p className="text-white text-[15px] font-normal opacity-[.5] inter-font">
            Added on 01/23/2023
          </p>
        </div>
      </div>
      <div className="relative">
        <button
          type="button"
          className="dropbtn w-5 text-center rounded-md hover:bg-gray-600"
          onClick={onShowDropdown}
        >
          <svg
            className="mx-auto"
            width="4"
            height="18"
            viewBox="0 0 4 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          id={`payment_dropdown_${info}`}
          className="absolute top-10 right-0 z-20 w-[150px] bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
        >
          <ul className="py-1">
            <li>
              <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                <Image
                  id="delete"
                  src="/delete_icon.png"
                  alt="Delete"
                  width={24}
                  height={24}
                  draggable="false"
                />
                <p className="text-base text-white opacity-[.65] truncate inter-font">
                  Delete
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                <Image
                  id="edit"
                  src="/edit_icon.png"
                  alt="Edit"
                  width={24}
                  height={24}
                  draggable="false"
                />
                <p className="text-base text-white opacity-[.65] truncate inter-font">
                  Edit
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
