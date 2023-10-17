interface FlowControlProps{
    className: any
}

function FlowControl(props: FlowControlProps){
    return(<div className={props.className.flow_control}>
        <header>Flow Control</header>
        <select>
            <option value="disabled">Disabled</option>
            <option value="enabled">Enabled</option>
        </select>
      </div>)
}

export default FlowControl;