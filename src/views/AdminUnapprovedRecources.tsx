import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ResourceCard from "../components/admin/ResourceCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface IunapprovedResources {
  resources: string[];
}

interface IaxiosResponse {
  data: {
    resources: string[];
  };
}

const AdminUnapprovedRecources: React.FC = () => {
  const fetchUnapprovedResources = async () => {
    return axios.get<JSON, IaxiosResponse>(
      `${import.meta.env.VITE_BACK_URL}/resource/unapproved-resources`,
      { withCredentials: true }
    );
  };
  const res = useQuery("getUnapprovedResources", fetchUnapprovedResources);

  if (res.isLoading) {
    return <LoadingSpinner />;
  }
  if (res.error) {
    return <span>Error</span>;
  }
  if (res.data && res.data.data.resources.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center text-white text-3xl py-4">
          No unapproved resources
        </h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center w-screen">
      <div className="grid grid-cols-3 gap-4 w-3/4 mt-10">
        {res.data &&
          res.data.data.resources.map((resource: string) => (
            <ResourceCard key={resource} text={resource} />
          ))}
      </div>
    </div>
  );
};

export default AdminUnapprovedRecources;
