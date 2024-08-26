import React from 'react';
import './Modal.css'; // Add custom styles for the modal if needed

const MembershipStatusModal = ({ onClose }) => {
  return (
    <div
      id="membership-modal"
      className="modal"
      style={{
        position: 'fixed',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fa5a20',
          margin: '15% auto',
          padding: '20px',
          border: '1px solid #888',
          width: '80%',
        }}
      >
        <span
          onClick={onClose}
          className="close-modal"
          style={{
            color: '#aaa',
            float: 'right',
            fontSize: '28px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          &times;
        </span>
        <p id="membership-message" style={{ color: 'black' }}>
          Thank you for being our valuable member!
          <br />
          Your membership status is <span id="membership-status">ACTIVE</span>
        </p>
      </div>
    </div>
  );
};

export default MembershipStatusModal;
