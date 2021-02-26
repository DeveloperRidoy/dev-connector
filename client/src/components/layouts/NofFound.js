import { Link } from 'react-router-dom';

const NofFound = () => {
    return (
        <div className=" p-3">
            <h1 className="x-large text-primary"> <i className="fas fa-exclamation-triangle"></i> Page Not Found</h1>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default NofFound
