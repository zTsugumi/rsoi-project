import { Comment } from 'antd';
import './LogBox.css';

function LogBox(props) {
  const { stat } = props;

  return stat.stats.map((stat) => (
    <div key={stat.uuid} style={{ width: '100%' }}>
      <Comment
        style={{ padding: 0 }}
        content={
          <p style={{ fontFamily: 'monospace' }}>
            {stat.atTime} [{stat.service}]: {stat.description}
          </p>
        }
      />
    </div>
  ));
}

export default LogBox;
