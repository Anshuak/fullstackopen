const Search = ({ handleChange, search }) => (
  <div>
    find countries <input onChange={handleChange} value={search} />
  </div>
);

export default Search;
