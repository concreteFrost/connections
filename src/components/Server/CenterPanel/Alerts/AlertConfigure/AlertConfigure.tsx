import s from "./AlertConfigure.module.scss";
import useStore from "../../../../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IDirective, IDirectiveConfig} from "../../../../../store/interfaces/IAlerts";

function AlertConfigure() {
  const navigate = useNavigate();
  const { getDirectives, updateDirective } = useStore((state) => state.alertSlice);
  const [directives, setDirectives] = useState<Array<IDirective>>();
  const [originalDirectives, setOriginalDirectives] = useState<Array<IDirective>>()
  const [currentDirectiveIndex, setCurrentDirectiveIndex] = useState<Number>(-1);

  async function fetchDirectives() {
    try {
      const res: IDirective[] = await getDirectives();
      setDirectives(res);
      setOriginalDirectives(res);
    } catch (e) {
      console.log('error getting directives');
    }
  }

  useEffect(() => {
    fetchDirectives();
  }, []);

  function editDirective(id: number, key: keyof IDirective, value: any) {
    if (directives) {
      const updatedDirectives: Array<IDirective> = directives.map((directive: IDirective, index: number) => {
        if (index === id) {
          return {
            ...directive,
            [key]: value
          };
        } else {
          return directive;
        }
      });
      setDirectives(updatedDirectives);
    }
  }

  function checkCurrentDirectives(index: Number) {
    if (currentDirectiveIndex !== index) {
      setCurrentDirectiveIndex(index);
      setDirectives(originalDirectives);
    }
  }


  async function handleDirectiveUpdate(directive : IDirective) {
    try{
      const res = await updateDirective(directive);
      console.log(res);
      await fetchDirectives()
    }
    catch(e){
      console.log('error updating directive',e);
    }
  }

  return (
    <section className={s.wrapper}>
      <h3>Configure</h3>
      <header><button onClick={() => navigate('/dashboard/alerts')}>ALERTS</button></header>
      <main>
        <table className={s.table}>
          <thead>
            <tr>
              <th colSpan={3}>Directive</th>
              <th colSpan={3}>Directives</th>
              <th colSpan={1}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {directives && directives.map((directive: IDirective, index: any) => (
              <tr key={index}>
                <td colSpan={3} onFocus={() => { checkCurrentDirectives(index) }} className={s.directive}>
                  <div className={s.directive_item}><label >name:</label>
                    <input
                      type="text"
                      value={directive.name}
                      onChange={(e: any) => editDirective(index, "name", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>description:</label>
                    <input type="text"
                      value={directive.description}
                      onChange={(e: any) => editDirective(index, "description", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>eh control id:</label>
                    <input type="number"
                      value={directive.ehControlId}
                      onChange={(e: any) => editDirective(index, "ehControlId", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>category:</label>
                    <input type="number"
                      value={directive.category}
                      onChange={(e: any) => editDirective(index, "category", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>date created:</label>
                    <input type="datetime-local"
                      value={directive.dateCreated}
                      onChange={(e: any) => editDirective(index, "dateCreated", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>last amended:</label>
                    <input type="datetime-local"
                      value={directive.lastAmended}
                      onChange={(e: any) => editDirective(index, "lastAmended", e.target.value)}
                    /></div>
                </td>
                <td colSpan={3} onFocus={() => { checkCurrentDirectives(index) }}>
                  <ul>
                    {directive.directives.map((config: IDirectiveConfig, index: number) => (
                      <li key={index}>
                        <header>CONFIG: {index}</header>
                        <div className={s.directive_item}>
                          <label htmlFor={`optionId-${index}`} className={s.label}>Option ID:</label>
                          <input type="text" id={`optionId-${index}`} value={config.optionId} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`inputValue-${index}`} className={s.label}>Input Value:</label>
                          <input type="text" id={`inputValue-${index}`} value={config.inputValue} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`alertFormatId-${index}`} className={s.label}>Alert Format ID:</label>
                          <input type="text" id={`alertFormatId-${index}`} value={config.alertFormatId} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`preventProcessing-${index}`} className={s.label}>Prevent Processing:</label>
                          <input type="text" id={`preventProcessing-${index}`} value={config.preventProcessing ? 'Yes' : 'No'} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`stopFlow-${index}`} className={s.label}>Stop Flow:</label>
                          <input type="text" id={`stopFlow-${index}`} value={config.stopFlow} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`startFlow-${index}`} className={s.label}>Start Flow:</label>
                          <input type="text" id={`startFlow-${index}`} value={config.startFlow} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`runScript-${index}`} className={s.label}>Run Script:</label>
                          <input type="text" id={`runScript-${index}`} value={config.runScript} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`addToCounter-${index}`} className={s.label}>Add To Counter:</label>
                          <input type="text" id={`addToCounter-${index}`} value={config.addToCounter ? 'Yes' : 'No'} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`clearCounter-${index}`} className={s.label}>Clear Counter:</label>
                          <input type="text" id={`clearCounter-${index}`} value={config.clearCounter ? 'Yes' : 'No'} readOnly />
                        </div>
                      </li>
                    ))}
                  </ul>

                </td>
                <td colSpan={1}>
                  <div className={s.action_btns_wrapper}>
                    {currentDirectiveIndex === index ? (
                      <button onClick={() => handleDirectiveUpdate(directive)}>Save</button>
                    ) : null}
                    <button>DELETE</button></div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
}

export default AlertConfigure;

