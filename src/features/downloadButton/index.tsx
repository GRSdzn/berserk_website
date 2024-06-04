'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { downloadLinks } from '@/models/downloadLinks';
import { itemVariants, listVariant, menuVariants } from '@/utils/animatePressets';
// import { itemVariants, listVariant, menuVariants } from '@/utils/animatePressets';

// const menuVariants = {
//   open: { rotate: 180, transition: { duration: 0.4 } },
//   closed: { rotate: 0, transition: { duration: 0.4 } },
// };

// const itemVariants = {
//   open: {
//     opacity: 1,
//     y: 0,
//     transition: { type: 'spring', stiffness: 300, damping: 20 },
//   },
//   closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
// };

// const listVariants = {
//   open: {
//     clipPath: 'inset(0% 0% 0% 0% round 10px)',
//     transition: {
//       type: 'spring',
//       bounce: 0,
//       duration: 0.4,
//       delayChildren: 0.3,
//       staggerChildren: 0.1,
//     },
//   },
//   closed: {
//     clipPath: 'inset(10% 50% 90% 50% round 10px)',
//     transition: {
//       type: 'spring',
//       bounce: 0,
//       duration: 0.3,
//     },
//   },
// };

const DownloadButton = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && !target.closest('.nav-menu')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // метод для предотвращения всплытия события click
    setIsOpen((prevState) => !prevState);
  };

  return (
    <motion.div initial={false} animate={isOpen ? 'open' : 'closed'} className="w-24 relative" onClick={(e) => e.stopPropagation()}>
      <motion.button whileTap={{ scale: 0.97 }} onClick={handleClick} className="flex items-center justify-between">
        Скачать
        <motion.div variants={menuVariants} style={{ originY: 0.5 }}>
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path fill="white" d="M20 7 L 0 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={listVariant}
        style={{ pointerEvents: isOpen ? 'auto' : 'none', top: '55px', position: 'absolute', width: '150px', backgroundColor: '#4343432c', padding: '10px' }}
        className="nav-menu backdrop-blur-sm rounded-md"
      >
        {downloadLinks.map((link, index) => (
          <motion.div key={index} variants={itemVariants}>
            {link.url ? (
              <Link target="_blank" href={link.url} className="text-white font-normal text-md">
                {link.title}
              </Link>
            ) : (
              <p className="text-foreground font-normal text-md">{link.title} В разработке</p>
            )}
            {index !== downloadLinks.length - 1 && <div className="my-1 w-3 bg-white mx-auto" />}
          </motion.div>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DownloadButton;