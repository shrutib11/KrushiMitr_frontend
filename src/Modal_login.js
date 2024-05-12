import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  paddingTop: '20px'
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 9999,
};

export default function Modal_login({ children, onClose, handleSubmit }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button
          className='btn text-white fs-5'
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 9999,
            padding: '7px 12px',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('login-root')
  );
}