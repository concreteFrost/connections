interface ChangeLogProps{
    className: any
}

function ChangeLog(props: ChangeLogProps) {
  return (
    <div className={props.className.change_log}>
      <header>Change Log</header>
      <textarea readOnly disabled value={'placeholder'}>
      </textarea>
    </div>
  );
}

export default ChangeLog;
