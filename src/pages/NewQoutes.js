import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QouteFrom from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQoutes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/qoutes");
    }
  }, [status, history]);

  const addQouteHandler = (qouteData) => {
    sendRequest(qouteData);

    // console.log(addQuote);

    // history.push("/qoutes");
  };

  return (
    <QouteFrom isLoading={status === "pending"} onAddQuote={addQouteHandler} />
  );
};

export default NewQoutes;
