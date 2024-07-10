import React from 'react';

import '../Atom.css';

const AtomForm = (props) => {

  return (
    <>

      <form {...props}>{props.children}</form>
    </>
  );
}

export default AtomForm;