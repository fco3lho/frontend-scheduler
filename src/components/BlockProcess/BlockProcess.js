import "./BlockProcess.css";

const BlockProcess = (props) => {
  return (
    <div
      className={
        props.ended
          ? "element_finished"
          : props.selectedProcess === props.id
          ? props.execTimeIteration > 0
            ? "element_exec"
            : "element_idle"
          : "element"
      }
    >
      <p>
        <strong>Process ID:</strong> {props.id}
      </p>
      <p>
        <strong>Priority:</strong> {props.priority}
      </p>
      <p>
        <strong>Finished:</strong> {props.ended ? <>Yes</> : <>No</>}
      </p>
      <p>
        <strong>Action:</strong> {props.action}
      </p>
      <p>
        <strong>Quantum:</strong> {props.quantum}
      </p>
      <p>
        <strong>Execution Time Iteration:</strong> {props.execTimeIteration}
      </p>
      <p>
        <strong>Idle Time Iteration:</strong> {props.idleTimeIteration}
      </p>
      <p>
        <strong>Process Time Remaining:</strong> {props.processTimeRemaining}
      </p>
      <p>
        <strong>Total execution time:</strong> {props.totalExecTime}
      </p>
      <p>
        <strong>Total idle time:</strong> {props.totalIdleTime}
      </p>
      <p>
        <strong>Total time:</strong>{" "}
        {props.fullTimeInExecution == null
          ? "-"
          : `${props.fullTimeInExecution}ms`}
      </p>
    </div>
  );
};

export default BlockProcess;
