import {useState, useEffect} from 'react';
import Bookmark from "./Bookmark";
import Quality from "./Quality";

const User = ({data, deleteUser}) => {
    const [state, setState] = useState({})

    useEffect(() => {
        setState(prevState => ({...prevState, bookmark: data.bookmark}))
    }, [])

    useEffect(() => {

    }, [state.bookmark])

    const bookmarkHandler = () => {
        setState(prevState => ({...prevState, bookmark: !prevState.bookmark}))
    }

    return (
        <tr key={data?._id}>
            <td>{data?.name}</td>
            <td>
                {data?.qualities?.map(quality =>
                    <Quality key={`quality_${quality._id}`} color={quality.color} name={quality?.name} />
                )}
            </td>
            <td>{data?.profession?.name}</td>
            <td>{data?.completedMeetings}</td>
            <td>{data?.rate}</td>
            <td>
                <Bookmark isTrue={state.bookmark} handler={bookmarkHandler}/>
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteUser(data)}>delete</button>
            </td>
        </tr>
    );
};

export default User;