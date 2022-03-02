const Alert = ({ type, displayText }) => {
    return (
        <div className={`alert ${type} alert-dismissible fade show`} role="alert">
            {displayText}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Alert;