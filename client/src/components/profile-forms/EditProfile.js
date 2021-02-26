import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../store/actions/profile";
import Spinner from '../layouts/Spinner';

const EditProfile = ({ createProfile, getCurrentProfile, history, profile: { loading, profile } }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    gitusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    gitusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [displaySocialInputs, toggleSocialIntputs] = useState(false);
  
  // get current user's profile
  useEffect(() => getCurrentProfile(), [])

  // preload formdata with user's profile
  useEffect(() => {
    !loading &&
      profile !== null &&
      setFormData({
        company: !profile.company ? "" : profile.company,
        website: !profile.website ? "" : profile.website,
        location: !profile.location ? "" : profile.location,
        status: !profile.status ? "" : profile.status,
        skills: !profile.skills ? "" : profile.skills.toString(),
        gitusername: !profile.gitusername ? "" : profile.gitusername,
        bio: !profile.bio ? "" : profile.bio,
        twitter:  !profile.social ? "" : profile.social.twitter,
        facebook: !profile.social ? "" : profile.social.facebook,
        linkedin: !profile.social ? "" : profile.social.linkedin,
        youtube: !profile.social ? "" : profile.social.youtube,
        instagram: !profile.social ? "" : profile.social.instagram,
      });
  }, [profile])

  const inputChangeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const createUserProfile = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return loading
    ? (<Spinner />)
    : profile === null
      ? (<div>no profile</div>)
        :(
    <div>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={createUserProfile}>
        <div className="form-group">
          <select name="status" value={status} onChange={inputChangeHandler}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={inputChangeHandler}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={inputChangeHandler}
          />
          <small className="form-text">
            Could be your own or Link company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={inputChangeHandler}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={inputChangeHandler}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="gitusername"
            value={gitusername}
            onChange={inputChangeHandler}
          />
          <small className="form-text">
            If you want your latest repos and Link Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={inputChangeHandler}
          ></textarea>
          <small className="form-text">
            Tell us Link little about yourself
          </small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialIntputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <div>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile})(EditProfile);
