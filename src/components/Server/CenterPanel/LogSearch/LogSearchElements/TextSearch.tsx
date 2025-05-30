import s from "./TextSearch.module.scss";

interface TextSearchProps {
  setSearchText: (value: string) => void;
  searchText: string | undefined;
}

function TextSearch(props: TextSearchProps) {
  return (
    <section className={s.wrapper}>
      <header>Additional Text Search</header>
      <textarea
        value={props.searchText}
        onChange={(e: any) => props.setSearchText(e.target.value)}
      ></textarea>
    </section>
  );
}

export default TextSearch;
