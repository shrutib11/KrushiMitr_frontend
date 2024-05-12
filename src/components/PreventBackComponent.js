import React, { useEffect } from 'react';

const PreventBackComponent = () => {
  useEffect(() => {
    const preventBack = () => {
      window.history.forward();
    };

    preventBack();
    window.onunload = function() {
      return null;
    };

    return () => {
      // Cleanup
      window.onunload = null;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PreventBackComponent;
