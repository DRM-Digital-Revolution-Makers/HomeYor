import React from "react";
import Verified from "@/components/Verified";
import InitiativesCard from "@/components/InitiativesCard";
import SpecialistCard from "@/components/SpecialistCard";

export default function MainPage() {
  return (
    <div className="">
      <Verified />
      <InitiativesCard />
      <SpecialistCard />
    </div>
  );
}
