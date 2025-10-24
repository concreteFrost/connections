import useStore from "store/store";
import s from "./MappingNameForm.module.scss";
import { RFState } from "shared/types/rfState";
import { useEffect, useState } from "react";

export default function MappingNameForm() {
  const { mappingState, setMappingName } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  // Локальное состояние для управления вводом
  const [name, setName] = useState(mappingState.name || "");

  // Когда стор обновляется (например, загрузка карты с сервера) — синхронизируем локальный стейт
  useEffect(() => {
    setName(mappingState.name || "");
  }, [mappingState.name]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length === 0) return;
    setMappingName(name);
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label htmlFor="name">Mapping Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setMappingName(e.target.value)}
      />
      {/* <button type="submit">Apply</button> */}
    </form>
  );
}
