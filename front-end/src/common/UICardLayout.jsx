import React from 'react';

export const UICardContainer = ({ children }) => (
  <div className="ui-layout__item">
    <section className="ui-card">
      {children}
    </section>
  </div>
);
