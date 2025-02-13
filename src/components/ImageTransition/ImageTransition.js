import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageTransition.css';

const ImageTransition = ({ src, alt, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={`image-transition-container ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-skeleton"
          />
        )}
      </AnimatePresence>

      <motion.img
        src={error ? '/placeholder-movie.png' : src}
        alt={alt}
        className="transition-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default ImageTransition;