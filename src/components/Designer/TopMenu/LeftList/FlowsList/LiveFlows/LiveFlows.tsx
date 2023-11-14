import s from "./LiveFlows.module.scss"

interface ILoadedFlow {
    flowId: string;
    flowName: string;
    createdBy: string;
    createdOn: string;
  }
  
  interface DrafFlowsProps {
    sectionToOpen: any;
    setSectionToOpen: (sections: any) => void;
  }
  
  function LiveFlows(props: DrafFlowsProps) {
    return (
      <div className={s.wrapper}>
          <header>Live</header>
        <ul>
          
        </ul>
        {props.sectionToOpen.flows === true ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
       
            </tbody>
          </table>
        ) : null}
          <button
            onClick={() => props.setSectionToOpen({ folders: true, flows: false })}
          >
            Back
          </button>
      </div>
    );
  }
  
  export default LiveFlows;
  