import { useEffect } from "react";

import QouteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQoutesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "Rama",
//     text: "Learning React is fun",
//   },
//   {
//     id: "q2",
//     author: "Muhammad ramadhan",
//     text: "Basic React for everyone",
//   },
//   {
//     id: "q3",
//     author: "loan",
//     text: "Basic",
//   },
// ];

const AllQoutes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQoutesFound />;
  }

  return <QouteList quotes={loadedQuotes} />;
};

export default AllQoutes;
