import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfiles } from '../../store/actions/profile';
import Spinner from './Spinner';
import { v4 as uuid } from 'uuid'

const Profiles = ({ profile: {loading, profiles}, getProfiles }) => {
  useEffect(() => { getProfiles() }, [])
  
  return loading ? (
    (<Spinner />)
  ) : (
    <div>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.map((profile) => (
          <div className="profile bg-light" key={profile.user._id}>
            <img
              className="round-img"
              src={profile.user.avatar}
              alt={profile.user.name}
            />
            <div>
              <h2>{profile.user.name}</h2>
              <p>{profile.status}</p>
              <p>{profile.location}</p>
              <Link
                to={`/profile/${profile.user._id}`}
                className="btn btn-primary"
              >
                View Profile
              </Link>
            </div>

            <ul>
              {profile.skills.map((skill) => (
                <li className="text-primary" key={uuid()}>
                  <i className="fas fa-check"></i> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);