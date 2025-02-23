import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchJson from "../../../lib/fetchJson";
import { HomeContext } from "../../../context/home/context";
import Image from "next/image";

const REPLICA_SAMPLE_RULE = `{
    "prompt_template": "conversation between Ricarda and Bruce",
    "character_name": "Ricarda",
    "context": "sure"
}`;

export default function ProviderCard({
  identifierName,
  provider,
  identifier,
  iconUrl,
  statusBot,
  index,
}) {
  const router = useRouter();
  const { onUpdateScreen, updateIdentifierInfo, deleteProvider, setShowLoadingDialog } =
    useContext(HomeContext);
  const [showRules, setShowRules] = useState(false);
  const [rules, setRules] = useState("");

  useEffect(() => {
    if (identifier && identifier["rules"]) setRules(identifier["rules"]);
  }, [identifier]);

  const onStartAutoBot = async (e) => {
    try {
      const response = await fetchJson(`/api/startautobot`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: provider?.provider,
          identifierName: identifierName,
          interval: 10,
        }),
      });
      console.log(`onStartAutoBot: ${JSON.stringify(response)}`);
    } catch (err) {
      console.log(`onStartAutoBot: ${err}`);
      alert(`Error happened: ${err.reason}`)
    }
    await onUpdateScreen();
  };

  const onStopAutoBot = async (e) => {
    try {
      const response = await fetchJson(`/api/stopautobot`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: provider?.provider,
          identifierName: identifierName,
        }),
      });
      console.log(`onStopAutoBot: ${JSON.stringify(response)}`);
      await onUpdateScreen();
    } catch (err) {
      console.log(`onStartAutoBot: ${err}`);
    }
  };

  const onStatusChange = (e) => {
    e.stopPropagation()
    setShowLoadingDialog(true);

    if (statusBot == true) {
      onStopAutoBot();
      statusBot = false;
    } 
    else {
      // if (rules == "") {
      //   alert("Please add new rule for this bot");
      //   return;
      // }

      onStartAutoBot();
      statusBot = true;
    }
  };

  const onAddRule = (e) => {
    setShowRules(!showRules);
    // if (rules == "") setRules(REPLICA_SAMPLE_RULE);
  };

  const onSaveRule = async (e) => {
    debugger;
    let myIdentifierInfo = identifier;
    myIdentifierInfo["rules"] = rules;
    await updateIdentifierInfo(
      provider?.provider,
      identifierName,
      myIdentifierInfo
    );
    setShowRules(false);
  };

  const onShowDropdown = () => {
    document
      .getElementById(`provider_dropdown_${identifierName}`)
      .classList.toggle("show");
  };

  const onDeleteIdentifier = () => {
    onShowDropdown();
    setShowLoadingDialog(true);
    deleteProvider(provider, identifierName);
  };

  return (
    <div
      className={`flex flex-wrap gap-2 ${
        index === 0 ? "mt-2" : "mt-6"
      } items-center justify-between`}
    >
      <div className="flex items-center">
        <Image
          alt={provider?.provider_description ?? "avatar image"}
          src={iconUrl}
          className="mr-3"
          width={38}
          height={38}
          draggable="false"
        />
        <div className="text-white">
          <div className="flex gap-1">
            <span className="block font-medium text-base truncate inter-font">
              {identifierName}
            </span>
            <span className="bg-[#5448B7] text-white opacity-[.75] text-xs font-medium leading-[22px] ml-2 px-2 py-px rounded-full inter-font">
              Sales
            </span>
          </div>
          <span className="block font-normal mt-0.5 text-[15px] opacity-[.65] truncate w-[130px] md:w-[90px] lg:w-[125px] xl:w-[365px] inter-font">
            {(identifier && identifier["rules"]) ??
              "No rules have been added yet"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div
          className="flex cursor-pointer items-center text-[#8B7FFA] text-base font-semibold"
          onClick={onAddRule}
        >
          <Image
            id="edit_icon"
            src="/edit_icon.png"
            alt="Edit"
            className="mr-3"
            width={17}
            height={17}
            draggable="false"
          />
          <span className="whitespace-nowrap inter-font">Add rules</span>
        </div>
        <div className="mx-3 sm:ml-[35px] sm:mr-[34px]">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={onStatusChange}
              className="sr-only peer"
              checked={statusBot}
            />
            <div className="w-10 h-6 bg-background-color rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-link-color"></div>
            <span className="ml-[9px] text-base font-medium text-white inter-font">
              {statusBot == true ? "Active" : "Inactive"}
            </span>
          </label>
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
            id={`provider_dropdown_${identifierName}`}
            className="absolute top-10 right-0 z-20 w-[150px] bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
          >
            <ul className="py-1">
              <li onClick={onDeleteIdentifier}>
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
      {showRules && (
        <div className="relative mt-6 w-full overflow-hidden transition-[all] duration-700 ease-in-out">
          <textarea
            className="block w-full h-[60px] overflow-hidden py-4 px-5 rounded-lg border-solid border-t-0 border-r-0 border-b-0 border-l-[7px] border-l-[#635EE3] font-normal text-[15px] placeholder:text-white text-white opacity-[.65] bg-[#454969] focus:outline-none inter-font"
            placeholder={`Rules: You can define the bot's option... like as following.....${REPLICA_SAMPLE_RULE}`}
            value={rules}
            style={{ height: 150 }}
            onChange={(e) => setRules(e.target.value)}
            required
          />
          <button
            className="text-white font-semibold text-base absolute right-2.5 bottom-2.5 primary-button hover:opacity-[.7] rounded-lg px-[45px] py-[7px] inter-font"
            onClick={onSaveRule}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
