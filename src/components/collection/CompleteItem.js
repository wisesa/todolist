import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteCollection} from '../../actions/collection';

const Collection = ({
  collection: { _id, title, description, status, createdAt }
}) => (
    <div className="center col-lg-12 mb-3 padding-card">
    {status=='1' ? 
      (<div className="bg-white card-rider p-3">
      <div className="mt-3">
        <div>
          <h5 className='black right mb-4'>
            {createdAt}
          </h5>
          <h5 className='black'>
            {title}
          </h5>
          <h5 className='black'>
            {description}
          </h5>
        </div>
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