import React from "react";
import Verified from "@/components/Verified";
import InitiativesCard from "@/components/InitiativesCard";
import SpecialistCard from "@/components/SpecialistCard";
import Topbar from "@/components/layout/Topbar";
import Notifications from "@/components/Notifications";
export default function MainPage() {
  return (
    <div className="">
      <Topbar />
      <Verified />
      <InitiativesCard />
      <SpecialistCard />
      <Notifications />
    </div>
  );
}
