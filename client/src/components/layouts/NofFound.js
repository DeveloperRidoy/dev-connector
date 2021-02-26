import { Link } from 'react-router-dom';

const NofFound = () => {
    return (
        <div className="text-center p-3">
            <p className="lead">Oops! Could not find what you were looking for</p>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default NofFound
