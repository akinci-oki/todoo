import PropTypes from "prop-types";

function ProgressBar({ compeletedTodos, totalTodos, backgroundColor }) {
    const percentage = (compeletedTodos / totalTodos) * 100;
    const color = "red";
    return (
        <div className="bar">
            <div
                className={`progress ${backgroundColor}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}

ProgressBar.propTypes = {
    totalTodos: PropTypes.number,
    compeletedTodos: PropTypes.number,
    backgroundColor: PropTypes.string,
};

export default ProgressBar;
