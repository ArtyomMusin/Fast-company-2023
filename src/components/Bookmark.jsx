const Bookmark = ({isTrue, handler}) => {
    return (
        <button onClick = {handler}>
            {isTrue
                ? <i className="bi bi-bookmark-fill"></i>
                : <i className="bi bi-bookmark"></i> }
        </button>
    );
};

export default Bookmark;