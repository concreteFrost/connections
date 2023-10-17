interface IStaticProperties{
  flowName: string;
  flowIdentifier: string;
  flowVersion: string;
  startBlock: string;
  lastAmended: string;
  lastAmendedBy: string;
  created:string;
  createdBy:string;
}

interface StaticPropertiesProps{
    className : any;
    staticProperties: IStaticProperties;
}

function StaticProperties(props: StaticPropertiesProps){
    return(  <div className={props.className.static_properties}>
        <header>Static Properties</header>
        <form>
          <section>
            <label>Internal ID</label>
            <input type="text" readOnly disabled value={props.staticProperties.flowIdentifier ?? ""} />
          </section>
          <section>
            <label>Flow Name</label>
            <input type="text" readOnly disabled value={props.staticProperties.flowName ?? ""} />
          </section>
          <section>
            <label>Start Block</label>
            <input type="text" readOnly disabled value={props.staticProperties.startBlock ?? ""} />
          </section>
          <section>
            <label>Version</label>
            <input type="text" readOnly disabled value={props.staticProperties.flowVersion ?? ""} />
          </section>
          <section className={props.className.grid_3_cols}>
            <label>Created</label>
            <input type="text" readOnly disabled value={props.staticProperties.created ?? ""} />
            <input type="text" readOnly disabled value={props.staticProperties.createdBy ?? ""} />
          </section>
          <section className={props.className.grid_3_cols}>
            <label>Amended</label>
            <input type="text" readOnly disabled value={props.staticProperties.lastAmended ?? ""} />
            <input type="text" readOnly disabled value={props.staticProperties.lastAmendedBy ?? ""} />
          </section>
        </form>
      </div>)
}

export default StaticProperties;