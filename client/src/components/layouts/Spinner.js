import spinner from '../../img/spinner.gif'
import auth from '../../store/reducers/auth'
const Spinner = () => {
    return (
        <div>
            <img
                src={spinner}
                alt="loading..."
                style={{height: '200px', width: '200px', display: 'block', margin: 'auto'}}
            /> 
        </div>
    )
}
export default Spinner;  