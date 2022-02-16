import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useHackerNewsAPI(initialUrl, initialData) {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFetchData = useRef({});
  const inputRef = useRef();
  const [url, setUrl] = useState(initialUrl);
  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(`The error happenend ${error}`);
    }
  };
  // const handleUpdateQuery = lodash.debounce((e) => {
  //   setQuery(e.target.value);
  // }, 500);
  useEffect(() => {
    handleFetchData.current();
    if (inputRef.current) inputRef.current.focus();
  }, [url]);
  return {
    query,
    setQuery,
    setUrl,
    loading,
    errorMessage,
    data,
    inputRef,
  };
}
