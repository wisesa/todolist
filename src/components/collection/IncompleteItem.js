import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteCollection} from '../../actions/collection';
import {Button} from "react-bootstrap"

const pathname = window.location.pathname;

const Collection = ({
  collection: { id, title, description, status, createdAt },
  handleDelete,
  handleUpdate,
  handleComplete
}) => (
    <div className="center col-lg-12 mb-3 padding-card">
    {status=='0' ? 
      (<div className="bg-white card-rider p-3">
        <div>
          <h5 className='black right mb-4'>
            {createdAt}
          </h5>
          <h5 className='bold black'>
            {title}
          </h5>
          <h5 className='black'>
            {description}
          </h5>
        </div>
        <div>
          <Button variant="primary" onClick={() => handleDelete(id)}>
            Delete
          </Button>&nbsp;&nbsp;
          <Button variant="primary" onClick={()=>handleUpdate(id)}>
            Update
          </Button>&nbsp;&nbsp;
          <Button variant="primary" onClick={() => handleComplete(id)}>
            Complete
          </Button>
        </div>
    </div>)
    : null}
    </div>
    );

Collection.defaultProps = {
  showActions: true
}


Collection.propTypes = {
  deleteCollection:propTypes.object.isRequired
}

const mapStateToProps= state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps, 
  {deleteCollection}
)(Collection);