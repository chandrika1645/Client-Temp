import React from 'react';
import '../Styles/Card.css';

const Card = ({ id, fields, onDragStart }) => {
  return (
    <div id={id} draggable={true} onDragStart={onDragStart} className='Card-component'>
      {fields.map((field, index) => (
        field.isTitle ? (
          <p key={index} style={{ fontWeight: 'bold' }}>{field.value}</p>
        ) : (
          <p key={index}>{`${field.label}: ${field.value}`}</p> )
        ))}
      
    </div>
  );
};

export default Card;
