import React, { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import './index.jsx';
import useStyles from './index.jsx';


const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const classes = useStyles();

  
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    return (
      <>
        {isVisible && (
          <div className={classes.backtoTop} onClick={scrollToTop}>
             <ArrowUpwardIcon />
          </div>
        )}
      </>
    );
  };

  export default BackToTopButton
  