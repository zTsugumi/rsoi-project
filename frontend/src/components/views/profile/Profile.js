import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';
import { Loading } from '../../loading/Loading';
import AllActions from '../../../redux/actions/allActions';
import Me from './me/Me';

function Profile() {
  const { userUUID } = useParams();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllActions.ProfileActions.profileGet(userUUID));

    return () => {
      dispatch(AllActions.ProfileActions.profileReset());
    };
  }, [dispatch, userUUID]);

  if (profile.isLoading) {
    return (
      <div className='app'>
        <Loading />
      </div>
    );
  }

  if (!profile.info) {
    return (
      <div className='app'>
        <Empty
          description={
            <span>
              Oops, Something happened! We are working on the problem, please come back later!
            </span>
          }
        />
      </div>
    );
  }

  if (user.creds?.uuid === profile.info.uuid) {
    return (
      <div className='app'>
        <Me info={profile.info} />
      </div>
    );
  } else {
    return <div className='app'>other</div>;
  }
}

export default Profile;
