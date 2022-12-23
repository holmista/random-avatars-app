import React, { useState } from "react";
import { useQuery } from "react-query";
import ResourceCard from "../components/admin/ResourceCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface IunapprovedResources {
  resources: string[];
}

const AdminUnapprovedRecources = () => {
  const fetchUnapprovedResources = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/resource/unapproved-resources`
    );
    return res.json();
  };
  const res = useQuery("getUnapprovedResources", fetchUnapprovedResources);
  if (res.isLoading) {
    return <LoadingSpinner />;
  }
  if (res.error) {
    return <span>Error</span>;
  } else {
    return (
      <div className="flex justify-center w-screen">
        <div className="grid grid-cols-3 gap-4 w-3/4 mt-10">
          {res.data.resources.map((resource: string) => (
            <ResourceCard key={resource} text={resource} />
          ))}
        </div>
      </div>
    );
  }
};

export default AdminUnapprovedRecources;
