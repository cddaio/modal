"use client";
import { Modal } from "@/components/Modal/Modal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>modal</button>

      <Modal.Frame
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Head>Set Margin</Modal.Head>
        <Modal.Body>
          <div className="">
            {/* <MarginInput /> */}
            <HeaderSetting />
          </div>
        </Modal.Body>
      </Modal.Frame>
    </>
  );
}

const MarginInput = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [margin, setMargin] = useState();
  const [individualMargins, setIndividualMargins] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const handleMarginChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setMargin(value);
    setIndividualMargins({
      top: value,
      right: value,
      bottom: value,
      left: value,
    });
  };

  const handleIndividualMarginChange = (e, side) => {
    const value = parseInt(e.target.value, 10) || 0;
    setIndividualMargins((prevMargins) => ({
      ...prevMargins,
      [side]: value,
    }));
  };

  console.log(margin, "margin");

  return (
    <div className="flex items-center flex-col text-gray-800">
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center flex-col">
          <label className="text-sm text-gray-600">All</label>
          <div className="flex flex-col">
            <input
              type="number"
              value={margin}
              onChange={handleMarginChange}
              disabled={!isLocked}
              className={`w-12 p-2 border rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                !isLocked ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>

        <div className="flex items-center flex-col">
          <label className="text-sm text-gray-600 mt-5"></label>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="ml-2 p-2 border rounded bg-gray-200"
          >
            {isLocked ? (
              <span role="img" aria-label="locked">
                🔒
              </span>
            ) : (
              <span role="img" aria-label="unlocked">
                🔓
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center flex-col">
          <label className="text-sm text-gray-600">Top</label>
          <input
            type="number"
            value={individualMargins.top}
            onChange={(e) => handleIndividualMarginChange(e, "top")}
            disabled={isLocked}
            className={`w-12 p-2 border rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isLocked ? "bg-gray-200" : ""
            }`}
          />
        </div>

        <div className="flex items-center flex-col">
          <label className="text-sm text-gray-600">Right</label>
          <input
            type="number"
            value={individualMargins.right}
            onChange={(e) => handleIndividualMarginChange(e, "right")}
            disabled={isLocked}
            className={`w-12 p-2 border rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isLocked ? "bg-gray-200" : ""
            }`}
          />
        </div>

        <div className="flex items-center flex-col">
          <label className="text-sm text-gray-600">Bottom</label>
          <input
            type="number"
            value={individualMargins.bottom}
            onChange={(e) => handleIndividualMarginChange(e, "bottom")}
            disabled={isLocked}
            className={`w-12 p-2 border rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isLocked ? "bg-gray-200" : ""
            }`}
          />
        </div>

        <div className="flex items-center flex-col">
          <label className="text-sm text-gray-600">Left</label>
          <input
            type="number"
            value={individualMargins.left}
            onChange={(e) => handleIndividualMarginChange(e, "left")}
            disabled={isLocked}
            className={`w-12 p-2 border rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isLocked ? "bg-gray-200" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const HeaderSetting = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="text-gray-700 flex flex-col gap-2 ">
      <label className="flex items-center cursor-pointer text-base text-gray-600 select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="mr-2 h-5 w-5"
        />
        Different First Page
      </label>
      {checked && (
        <div className="flex items-start flex-col">
          <label className="text-sm text-gray-600">
            First Page Header Content
          </label>
          <textarea className="w-full rounded-md p-2 border"></textarea>
        </div>
      )}
      <div className="flex items-start flex-col">
        <label className="text-sm text-gray-600">Header Content</label>
        <textarea className="w-full rounded-md p-2 border"></textarea>
      </div>
      <div className="flex items-start flex-col">
        <label className="text-sm text-gray-600">Header from Top</label>

        <input
          type="number"
          className={`w-full rounded-md p-2 border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
        />
      </div>
      <div className="flex items-start flex-col">
        <label className="text-sm text-gray-600">Footer from Bottomp</label>

        <input
          type="number"
          className={`w-full rounded-md p-2 border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
        />
      </div>
    </div>
  );
};
