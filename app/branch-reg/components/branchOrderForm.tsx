"use client";

import { Checkbox, Progress, Switch } from "@ark-ui/react";
import { CheckIcon, Plus, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { BranchRegFormProps } from "../page";

export function BranchOrderForm({ setStep }: BranchRegFormProps) {
  const items = [
    { label: "Delivery", value: "Delivery" },
    { label: "Takeaway", value: "Takeaway" },
    { label: "Reservations", value: "Reservations" },
    { label: "Dining", value: "Dining" },
  ];

  type Charges = {
    label: string;
    amount: string;
  };

  const [codCharges, setCodCharges] = useState<Charges[]>([
    {
      label: "Handling Charges",
      amount: "120",
    },
  ]);

  const [copCharges, setCopCharges] = useState<Charges[]>([
    {
      label: "Handling Charges",
      amount: "120",
    },
  ]);

  const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  function changeCOD(
    idx: number,
    key: "amount" | "label",
    value: string,
    flag: "cod" | "cop",
  ) {
    switch (flag) {
      case "cod":
        const updatedCOD = [...codCharges];
        updatedCOD[idx][key] = value;
        setCodCharges(updatedCOD);
        break;
      case "cop":
        const updatedCOP = [...copCharges];
        updatedCOP[idx][key] = value;
        setCopCharges(updatedCOP);
        break;
    }
  }

  function deleteCodCharge(
    idx: number,
    event: React.MouseEvent<HTMLButtonElement>,
    flag: "cod" | "cop",
  ) {
    event.preventDefault();
    switch (flag) {
      case "cod":
        const updatedCod = [...codCharges];
        updatedCod.splice(idx, 1);
        setCodCharges(updatedCod);
        break;
      case "cop":
        const updatedCop = [...copCharges];
        updatedCop.splice(idx, 1);
        setCopCharges(updatedCop);
        break;
    }
  }

  function codAddCharges(
    event: React.MouseEvent<HTMLButtonElement>,
    flag: "cod" | "cop",
  ) {
    event.preventDefault();
    switch (flag) {
      case "cod":
        setCodCharges([...codCharges, { label: "Charges", amount: "200" }]);
        break;
      case "cop":
        setCopCharges([...copCharges, { label: "COP charges", amount: "300" }]);
        break;
    }
  }

  const totalCodCharge = codCharges.reduce(
    (total, curr) => total + Number(curr.amount),
    0,
  );

  const totalCopCharge = copCharges.reduce(
    (total, curr) => total + Number(curr.amount),
    0,
  );

  return (
    <div className="bg-brand-white flex-4 font-fira rounded-3xl overflow-clip">
      {/* Progress bar */}
      <Progress.Root value={75} className="w-full">
        {/*<Progress.Label>Label</Progress.Label>*/}
        <Progress.Track className="rounded-2xl ">
          <Progress.Range className="bg-teal-400 h-3" />
        </Progress.Track>
        <Progress.ValueText className="pl-[73%]" />
      </Progress.Root>

      <div className="p-[30px] font-fira">
        <form action="" className="w-full space-y-[20px]">
          {/* Header */}
          <div className="text-brand flex justify-start gap-3 items-center pb-[10px]">
            <h3 className="font-inter text-[28px] font-semibold">
              Order Options Available
            </h3>
          </div>

          {/*Order Options*/}
          <Checkbox.Group
            // defaultValue={["react"]}
            onValueChange={console.log}
            className="w-full  flex gap-3"
          >
            {items.map((item) => (
              <Checkbox.Root
                key={item.value}
                value={item.value}
                className="flex-1 p-4 bg-[#FFF9F2] h-[150px] rounded-lg flex border border-dashed border-gray-500"
              >
                <div className="flex-4 relative flex flex-col justify-around items-center">
                  <div className="bg-[#FFEBD4] text-brand p-3 rounded-2xl">
                    <ShoppingCart size={30} />
                  </div>
                  <Checkbox.Label>{item.label}</Checkbox.Label>
                  <Checkbox.Control className="absolute top-0 right-0 ">
                    <Checkbox.Indicator className="">
                      <div className="bg-brand rounded-full p-1 text-white">
                        <CheckIcon size={12} />
                      </div>
                    </Checkbox.Indicator>
                  </Checkbox.Control>
                </div>
                <Checkbox.HiddenInput />
              </Checkbox.Root>
            ))}
          </Checkbox.Group>

          {/* Advance Amount */}
          <div className="flex flex-col gap-[12px]">
            <label htmlFor="advance-amount" className="text-[18px] font-medium">
              Advance Amount
            </label>
            <input
              type="text"
              id="advance-amount"
              placeholder="₹0.00"
              className="bg-[#FFF8F3] text-gray-800 pl-4 rounded-lg w-full h-[55px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Advance Calculation Method */}
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="advance-percent"
              className="text-[18px] font-medium"
            >
              Advance Calculation Method by Percentage of ordered items
            </label>
            <div className="relative">
              <input
                type="text"
                id="advance-percent"
                placeholder="₹0.00"
                className="bg-[#FFF8F3] text-gray-800 pl-4 pr-[90px] rounded-lg w-full h-[55px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FD5F08] font-medium">
                % of order
              </span>
            </div>
            <p className="text-gray-400 text-[13px]">
              Advance can be set as a fixed amount or % of order total (set by
              shop)
            </p>
          </div>

          {/* Cleaning Time */}
          <div className="flex flex-col gap-[12px]">
            <label htmlFor="cleaning-time" className="text-[18px] font-medium">
              Cleaning Time
            </label>
            <input
              type="text"
              id="cleaning-time"
              placeholder="00 : 15 : 00"
              className="bg-[#FFF8F3] text-[#FD5F08] font-medium pl-4 rounded-lg w-full h-[55px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Delivery Settings */}
          <div className="text-brand flex justify-start gap-3 items-center pb-[10px]">
            <h3 className="font-inter text-[28px] font-semibold">
              Delivery Settings
            </h3>
          </div>

          {/* Available KM (Delivery Radius) */}
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="advance-percent"
              className="text-[18px] font-medium"
            >
              Available KM (Delivery Radius)
            </label>
            <div className="relative">
              <input
                type="text"
                id="advance-percent"
                placeholder="5"
                className="bg-[#FFF8F3] text-gray-800 pl-4 pr-[90px] rounded-lg w-full h-[55px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FD5F08] font-medium">
                Km
              </span>
            </div>
          </div>

          {/* Kilometre Price */}
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="advance-percent"
              className="text-[18px] font-medium"
            >
              Kilometre Price
            </label>
            <div className="relative">
              <input
                type="text"
                id="advance-percent"
                placeholder="₹10.00"
                className="bg-[#FFF8F3] text-gray-800 pl-4 pr-[90px] rounded-lg w-full h-[55px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FD5F08] font-medium">
                /Km
              </span>
            </div>
          </div>

          {/*Payment Option*/}
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="advance-percent"
              className="text-[18px] font-medium"
            >
              Payment Option
            </label>
            <div className="w-[80%] flex justify-between gap-4">
              <Switch.Root className="inline-flex flex-1 items-center justify-around gap-3 bg-brand-white p-4 rounded-lg border border-gray-300">
                <Switch.Label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Prepaid Only
                </Switch.Label>
                <Switch.Control className="relative w-11 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-200 ease-in-out data-[state=checked]:bg-orange-500 cursor-pointer">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-5" />
                </Switch.Control>
                <Switch.HiddenInput />
              </Switch.Root>
              <Switch.Root className="inline-flex flex-2 items-center justify-around gap-3 bg-brand-white p-4 rounded-lg border border-gray-300">
                <Switch.Label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Cash on Delivery (COD) Only
                </Switch.Label>
                <Switch.Control className="relative w-11 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-200 ease-in-out data-[state=checked]:bg-orange-500 cursor-pointer">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-5" />
                </Switch.Control>
                <Switch.HiddenInput />
              </Switch.Root>
            </div>
          </div>

          {/*COD Extra Charges*/}
          <div className="bg-brand-shadow p-5 rounded-xl space-y-5">
            <div className="flex justify-between items-center text-md">
              <span className="">COD Extra Charges</span>
              <button
                onClick={(e) => codAddCharges(e, "cod")}
                className="flex gap-2 justify-center items-center rounded-3xl bg-brand-bg-100 border text-sm  border-brand p-2"
              >
                <Plus size={15} /> Add Changes
              </button>
            </div>
            <div>
              <ul className="space-y-2">
                {codCharges.map((cod, idx) => (
                  <li className="flex gap-3" key={idx}>
                    <input
                      onChange={(e) =>
                        changeCOD(idx, "label", e.target.value, "cod")
                      }
                      value={cod.label}
                      type="text"
                      className="bg-white pl-4 py-2 text-brand rounded-2xl flex-6 border border-gray-300"
                      placeholder="Type of Charge"
                    />
                    <input
                      value={cod.amount}
                      onChange={(e) =>
                        changeCOD(idx, "amount", e.target.value, "cod")
                      }
                      type="number"
                      className="flex-2 bg-white pl-4 py-2 text-brand rounded-2xl border border-gray-300"
                      placeholder="Amount"
                    />
                    <button
                      className="flex-1 center-div text-brand cursor-pointer"
                      onClick={(e) => deleteCodCharge(idx, e, "cod")}
                    >
                      <Trash />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <span>Total Extra Charges</span>
              <span className="text-brand">
                {inrFormatter.format(totalCodCharge)}
              </span>
            </div>
          </div>

          {/*Takeaway Payment Option*/}
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="advance-percent"
              className="text-[18px] font-medium"
            >
              Takeaway Payment Option
            </label>
            <div className="w-[80%] flex justify-between gap-4">
              <Switch.Root className="inline-flex flex-1 items-center justify-around gap-3 bg-brand-white p-4 rounded-lg border border-gray-300">
                <Switch.Label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Prepaid Only
                </Switch.Label>
                <Switch.Control className="relative w-11 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-200 ease-in-out data-[state=checked]:bg-orange-500 cursor-pointer">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-5" />
                </Switch.Control>
                <Switch.HiddenInput />
              </Switch.Root>
              <Switch.Root className="inline-flex flex-2 items-center justify-around gap-3 bg-brand-white p-4 rounded-lg border border-gray-300">
                <Switch.Label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Cash on Pickup (COP) Only
                </Switch.Label>
                <Switch.Control className="relative w-11 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-200 ease-in-out data-[state=checked]:bg-orange-500 cursor-pointer">
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-5" />
                </Switch.Control>
                <Switch.HiddenInput />
              </Switch.Root>
            </div>
          </div>

          {/*COP Extra Charges*/}
          <div className="bg-brand-shadow p-5 rounded-xl space-y-5">
            <div className="flex justify-between items-center text-md">
              <span className="">COP Extra Charges</span>
              <button
                onClick={(e) => codAddCharges(e, "cop")}
                className="flex gap-2 justify-center items-center rounded-3xl bg-brand-bg-100 border text-sm  border-brand p-2"
              >
                <Plus size={15} /> Add Changes
              </button>
            </div>
            <div>
              <ul className="space-y-2">
                {copCharges.map((cod, idx) => (
                  <li className="flex gap-3" key={idx}>
                    <input
                      onChange={(e) =>
                        changeCOD(idx, "label", e.target.value, "cop")
                      }
                      value={cod.label}
                      type="text"
                      className="bg-white pl-4 py-2 text-brand rounded-2xl flex-6 border border-gray-300"
                      placeholder="Type of Charge"
                    />
                    <input
                      value={cod.amount}
                      onChange={(e) =>
                        changeCOD(idx, "amount", e.target.value, "cop")
                      }
                      type="number"
                      className="flex-2 bg-white pl-4 py-2 text-brand rounded-2xl border border-gray-300"
                      placeholder="Amount"
                    />
                    <button
                      className="flex-1 center-div text-brand cursor-pointer"
                      onClick={(e) => deleteCodCharge(idx, e, "cop")}
                    >
                      <Trash />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <span>Total Extra Charges</span>
              <span className="text-brand">
                {inrFormatter.format(totalCopCharge)}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="font-inter text-[14px] flex justify-between pt-5">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="bg-brand-bg-100 text-black py-[16px] px-[35px] rounded-2xl border border-gray-200 hover:bg-brand-shadow cursor-pointer"
            >
              Next
            </button>
            <button
              type="submit"
              className="bg-brand text-brand-white py-[16px] px-[35px] rounded-2xl border border-gray-200 hover:bg-orange-300 cursor-pointer"
            >
              Save Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
