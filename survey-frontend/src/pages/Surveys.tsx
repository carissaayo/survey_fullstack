import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

import { Meta, Survey } from "../types";

import TButton from "../components/core/TButton";
import PageContent from "../components/PageContent";
import SurveyItem from "../components/SurveyItem";
import PaginationLinks from "../components/PaginationLinks";

const Surveys = () => {
  const { showToast } = useStateContext();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [meta, setMeta] = useState<Meta>(null);
  const [loading, setLoading] = useState(false);

  const onDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys();
        showToast("The survey was deleted");
      });
    }
  };

  const onPageClick = (link: { url: string }) => {
    getSurveys(link.url);
  };

  const getSurveys = (url?: string) => {
    url = url || "/survey";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <PageContent
      title="Surveys"
      buttons={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </TButton>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You don't have any survey yet
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          {surveys.length > 0 && (
            <PaginationLinks meta={meta} onPageClick={onPageClick} />
          )}
        </div>
      )}
    </PageContent>
  );
};

export default Surveys;
