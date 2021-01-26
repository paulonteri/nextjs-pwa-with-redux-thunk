import { connect } from "react-redux";
import { incrementCount, decrementCount, resetCount } from "../actions";

const Counter = (props) => {
  console.log(props);
  return (
    <div>
      <h1>
        Count: <span>{props.counter}</span>
      </h1>
      <button onClick={() => props.incrementCount()}>+1</button>
      <button onClick={() => props.decrementCount()}>-1</button>
      <button onClick={() => props.resetCount()}>Reset</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

export default connect(mapStateToProps, {
  incrementCount,
  decrementCount,
  resetCount,
})(Counter);
