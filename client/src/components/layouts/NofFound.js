import { Link } from 'react-router-dom';

const NofFound = () => {
    return (
        <div className=" p-3">
            <h4 className="large text-primary"> <i className="fas fa-exclamation-triangle"></i> Page Not Found</h4>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default NofFound
