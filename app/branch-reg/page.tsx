"use client";
import { BranchRegForm } from "./components/branchRegForm";
import { BranchDocForm } from "./components/branchDocForm";
import { BranchOrderForm } from "./components/branchOrderForm";
import { BranchBussDetailsForm } from "./components/branchBussDetailsForm";
import { Navbar } from "../home/components/navbar";
import { useEffect, useState } from "react";
import { BranchesList } from "./components/branchesList";

export interface BranchRegFormProps {
  setStep: (step: number) => void;
}

export default function BranchReg() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full flex justify-between px-[60px] gap-20">
      <BranchesList />
      {step === 1 && <BranchRegForm setStep={setStep} />}
      {step === 2 && <BranchDocForm setStep={setStep} />}
      {step === 3 && <BranchOrderForm setStep={setStep} />}
      {step === 4 && <BranchBussDetailsForm />}
    </div>
  );
}
