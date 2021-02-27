import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getGithubRepos, getProfileById } from '../../store/actions/profile';
import PropTypes from 'prop-types';
import { useEffect } from "react";
import Spinner from "./Spinner";
import { v4 as uuid } from 'uuid';
import Moment from 'react-moment';
const Profile = ({getProfileById, getGithubRepos,  profile: {loading, reposLoading, profile, repos}, match}) => {

  useEffect(() => {
    const userID = match.params.userID
    getProfileById(userID);
  }, []);
 
  useEffect(() => {
    if (profile !== null) profile.gitusername && getGithubRepos(profile.gitusername)
  }, [profile])
  
  return loading 
    ? <Spinner />
    : profile === null
    ? <div>no profile</div>
    : (
    <div>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profile.user.avatar}
            alt={profile.user.name}
          />
          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">{profile.status}</p>
          <p>{profile.location}</p>
          <div className="icons my-1">
            {profile.social &&
              Object.keys(profile.social).map( platform => (
                <Link 
                  key={uuid()}
                  to={`//${profile.social[platform]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${platform} fa-2x`}></i>
                </Link>
              ))}
          </div>
        </div>

        {/* <!-- About --> */}
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map((skill) => (
              <div className="p-1" key={uuid()}>
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Experience --> */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.map((exp) => (
            <div key={exp._id}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                <Moment format="YY/MM/DD">{exp.from}</Moment> -{" "}
                {exp.to ? <Moment format="YY/MM/DD">{exp.to}</Moment> : "Now"}
              </p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
              <p>
                <strong>Description: </strong>
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* <!-- Education --> */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.map((edu) => (
            <div key={edu._id}>
              <h3>{edu.school}</h3>
              <p>
                {edu.form} - {edu.to ? edu.to : "current"}
              </p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldOfStudy}
              </p>
              <p>
                <strong>Description: </strong>
                {edu.description}
              </p>
            </div>
          ))}
        </div>
   
        {/* <!-- Github --> */}
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>  
              {!profile.gitusername
                ? <div>This user has not provided his/her github username yet</div>
                : reposLoading
                ? <Spinner />
                : repos.length === 0
                ? <div>This user has no github repos yet</div>
                : repos.map((repo) => (
            <div className="repo bg-white p-1 my-1" key={repo.id}>
              <div>
                <h4>
                  <Link
                    to={`//github.com/${repo.owner.login}/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.full_name}
                  </Link>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
    
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfileById, getGithubRepos})(Profile)