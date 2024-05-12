import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  height: '40%',
  width: '30%'
}

const SMALL_MODAL_STYLES = {
  ...MODAL_STYLES,
  height: '30%',
  width: '80%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 9999
}

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={window.innerWidth < 600 ? SMALL_MODAL_STYLES : MODAL_STYLES}>
        <button
          className='btn text-white fs-5'
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 9999,
            padding: "7px 12px",
            background: "transparent",
            border: "none",
            boxShadow: 'none'
          }}
          onClick={onClose}
        >
          X
        </button>

        {children}
      </div>
    </>,
    document.getElementById('edit-root')
  )
}