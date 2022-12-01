import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQoute from "../components/quotes/HighlightedQuote";
// component
import Comments from "../components/comments/Comments";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QouteDetail = () => {
  // melihat deetail route dari component ini
  const match = useRouteMatch();
  // get id from route using use params
  const params = useParams();

  const { qouteId } = params;

  // console.log(match)
  const {
    sendRequest,
    status,
    data: loadedQoute,
    error,
  } = useHttp(getSingleQuote, true);

  // cari data dari array
  // const qoute = DUMMY_QUOTES.find((qoute) => qoute.id === params.qouteId);

  useEffect(() => {
    sendRequest(qouteId);
  }, [sendRequest, qouteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (!loadedQoute.text) {
    return <p>No Qoute Found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQoute text={loadedQoute.text} author={loadedQoute.author} />
      <Route path={`${match.url}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.url}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QouteDetail;
