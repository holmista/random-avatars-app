import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ApproveButton from "../components/admin/ApproveButton";
import RejectButton from "../components/admin/RejectButton";

interface IaxiosResponse {
  data: {
    imagesFullUrls: string[];
  };
}

const AdminUnapprovedResource: React.FC = () => {
  const { resource } = useParams();
  const fetchUnapprovedResource = async () => {
    return axios.get<JSON, IaxiosResponse>(
      `${
        import.meta.env.VITE_BACK_URL
      }/resource/unapproved-resources/${resource}`,
      { withCredentials: true }
    );
  };
  const approveResource = async () => {
    return axios.get(
      `${import.meta.env.VITE_BACK_URL}/resource/approve-resource/${resource}`,
      { withCredentials: true }
    );
  };
  const rejectResource = async () => {
    return axios.get(
      `${import.meta.env.VITE_BACK_URL}/resource/reject-resource/${resource}`,
      { withCredentials: true }
    );
  };
  const res = useQuery("getUnapprovedResource", fetchUnapprovedResource);
  if (res.isLoading) {
    return <LoadingSpinner />;
  }
  if (res.error) {
    return <span>Error</span>;
  }

  return (
    <div>
      <h1 className="text-center text-white text-3xl py-4">{resource}</h1>
      {res.data &&
        res.data.data.imagesFullUrls.map((image: string, idx: number) => (
          <img className="pb-10" key={idx} src={image} />
        ))}
      <div className="flex justify-center gap-10 w-10/12 pb-10">
        <ApproveButton apiCall={approveResource} />
        <RejectButton apiCall={rejectResource} />
      </div>
    </div>
  );
};

export default AdminUnapprovedResource;
