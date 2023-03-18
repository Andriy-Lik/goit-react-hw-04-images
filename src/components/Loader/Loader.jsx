import SyncLoader from "react-spinners/SyncLoader";
import css from './Loader.module.css';

function Loader() {
    return (
        <div className={css.Loader}>
            <SyncLoader color="#36d7b7" margin={5} />
        </div>
    );
}

export default Loader;