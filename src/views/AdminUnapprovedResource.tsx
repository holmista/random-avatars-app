import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ApproveButton from "../components/admin/ApproveButton";
import RejectButton from "../components/admin/RejectButton";

const AdminUnapprovedResource: React.FC = () => {
  const { resource } = useParams();
  const fetchUnapprovedResource = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_BACK_URL
      }/resource/unapproved-resources/${resource}`
    );
    return res.json();
  };
  const approveResource = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/resource/approve-resource/${resource}`
    );
    return res.json();
  };
  const rejectResource = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/resource/reject-resource/${resource}`
    );
    return res.json();
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
      {res.data.imagesFullUrls.map((image: string, idx: number) => (
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
