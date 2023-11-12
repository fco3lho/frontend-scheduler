import "./BlockProcess.css";

const BlockProcess = (props) => {
  return (
    <div
      className={
        props.ended
          ? "element_finished"
          : props.selectedProcess === props.id
          ? "element_selected"
          : "element"
      }
    >
      <p>
        <strong>Process ID:</strong> {props.id}
      </p>
      <p>
        <strong>Finished:</strong> {props.ended ? <>Yes</> : <>No</>}
      </p>
      <p>
        <strong>Tempo do processo:</strong> {props.time}
      </p>
    </div>
  );
};

export default BlockProcess;
