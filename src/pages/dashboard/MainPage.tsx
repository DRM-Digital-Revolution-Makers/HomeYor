import React from "react";
import Verified from "@/components/Verified";
import InitiativesCard from "@/components/InitiativesCard";
import SpecialistCard from "@/components/SpecialistCard";
import Notifications from "@/components/Notifications";
import Topbar from "@/components/layout/Topbar";

export default function MainPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
      <Topbar />
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Verified />
        <Notifications />
        <div className="lg:col-span-2">
          <InitiativesCard />
        </div>
        <div className="lg:col-span-2">
          <SpecialistCard />
        </div>
      </div>
    </div>
  );
}
