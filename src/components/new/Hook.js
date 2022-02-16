import useHackerNewsAPI from "../hook/useHackerNewsAPI";
// import lodash from "lodash";

const Hook = () => {
  const { query, setQuery, loading, errorMessage, setUrl, data, inputRef } =
    useHackerNewsAPI(`https://hn.algolia.com/api/v1/search?query=''`, {
      hits: [],
    });
  return (
    <div className="bg-white mx-auto mt-5 mb-5 p-5 rounded-lg shadow-md w-2/4">
      <div className="flex mb-5 gap-x-5">
        <input
          type="text"
          className="border border-gray-200 p-5 block w-full rounded-md  transition-all focus:border-blue-400 outline-none"
          placeholder="Keyword..."
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
        />
        <button
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
          className="bg-blue-500 text-white font-semibold p-5 rounded-md"
          style={{
            opacity: loading ? "0.25" : "1",
          }}
        >
          Fetching
        </button>
      </div>
      {loading && (
        <div className="loading w-8 h-8 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin mx-auto my-10"></div>
      )}
      {!loading && errorMessage && (
        <p className="text-red-400 my-5">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          data.hits.length > 0 &&
          data.hits.map((item, index) => {
            if (!item.title || item.title.length <= 0) return null;
            return (
              <h3 key={item.title} className="p-3 bg-gray-100">
                {item.title}
              </h3>
            );
          })}
      </div>
    </div>
  );
};

export default Hook;
