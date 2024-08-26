// import React, { useState } from 'react'

// const TodoItems = ({text,id,isCompleted}) => {
    

//   return (
//     <div>{text}</div>
//   )
// }

// export default TodoItems

import React from 'react';

const TodoItems = ({ text, isCompleted }) => {
  return (
    <div className='text-xl font-semibold italic text-purple-700 ' style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
      {text}
      
    </div>
  );
};

export default TodoItems;
