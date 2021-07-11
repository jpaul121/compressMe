import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Header() {
  return (
    <header className='absolute top-0 left-0 right-0 z-20'>
      <nav className='container mx-auto px-6 md:px-12 py-4'>
          <div className='md:flex justify-between items-center'>
            <div className='flex justify-between items-center'>
              <span className='font-bold uppercase text-white'>
                compress.it
              </span>
            </div>
            <div className='hidden md:flex items-center'>
              <a
                className='text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300'
                href='mailto: jpvalencia@alumni.harvard.edu'
              >
                Contact
              </a>
              <a
                className='text-3xl uppercase mx-3 text-white cursor-pointer hover:text-gray-300'
                href='https://github.com/jpaul121/'
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                className='text-3xl uppercase mx-3 text-white cursor-pointer hover:text-gray-300'
                href='https://linkedin.com/in/jpaulvalen/'
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
        </div>
      </nav>
    </header>
  );
}

export default Header
