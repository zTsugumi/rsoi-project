import { useState, useRef } from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import './UserModal.css';

function UserModal(props) {
  const { userModalInfo, setUserModalInfo } = props;

  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggableRef = useRef(null);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggableRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleCancel = () => {
    setUserModalInfo({
      ...userModalInfo,
      isVisible: false,
    });
  };

  return (
    <Modal
      title={
        <div
          style={{
            width: '100%',
            cursor: 'move',
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}} // end
        >
          Draggable Modal
        </div>
      }
      visible={userModalInfo.isVisible}
      mask={false}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose={true}
      style={{
        position: 'absolute',
        left: userModalInfo.position[0],
        top: userModalInfo.position[1],
      }}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggableRef}>{modal}</div>
        </Draggable>
      )}
    >
      <p>(`User ${userModalInfo.userUUID} info here! WIP!`)</p>
    </Modal>
  );
}

export default UserModal;
