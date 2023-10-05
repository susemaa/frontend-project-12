import React from 'react';
import { loremIpsum } from 'lorem-ipsum';

const BuildPage = (index) => (
  <>
    <h3>
      Page
      {' '}
      {index}
    </h3>
    <div>
      Page
      {' '}
      {index}
      {' '}
      content:
      {' '}
      { loremIpsum({ count: 5 })}
    </div>
  </>
);

const Buidl404 = () => (
  <>
    404 PAGE NOT FOUND
  </>
);

export const Page404 = () => Buidl404();
export const PageTwo = () => BuildPage(2);
