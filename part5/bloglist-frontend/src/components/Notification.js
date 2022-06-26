import React from 'react';

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <div className={type === 'error' ? 'error' : 'success'}>
        {message}
      </div>
    </div>
  );
};

export default Notification;