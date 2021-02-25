import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { ConnectServerUrl } from "../../utils/constants";
const LIMIT = 10;

export default function usePaginatedPosts({
  googleToken,
  email,
  tag,
  pageToFetch,
}) {
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    let cancel;
    setFetching(true);
    axios
      .get(
        `${ConnectServerUrl}/home?` +
          queryString.stringify(
            { tag, limit: LIMIT, page: pageToFetch, googleToken, email },
            { withCredentials: true }
          ),
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        console.log(res);
        setPosts((prevPosts) => {
          return prevPosts.concat(res.data.posts);
        });
        if (Number(res.data.page) * LIMIT <= res.data.total) {
          setHasMore(true);
          console.log(Number(res.data.page) + 1);
        } else {
          setHasMore(false);
        }
        setFetching(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancel();
  }, [email, googleToken, pageToFetch, tag]);

  return {
    fetching,
    posts,
    hasMore,
  };
}
