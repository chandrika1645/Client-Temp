import React from 'react'
import Card from '../BluePrint/Card';

const ServiceAdd = ({title, address, phone, email }) => {
    const handleDragStart = (e) => {

      console.log("Dragging");
      
      const Data = {
        type: 'card',
        fields: [
          { label: 'Title', value: title, isTitle: true},
          { label: 'Address', value: address},
          { label: 'Phone', value: phone },
          { label: 'Email', value: email}
        ],
        
        w: 4,
        h: 5,
        minH: 5,
        minW: 2,
      };
  
      e.dataTransfer.setData('text/plain', JSON.stringify(Data));
    };

  return (

    <Card
    fields={[
      { label: 'Title', value: title, isTitle: true},
      { label: 'Address', value: address},
      { label: 'Phone', value: phone },
      { label: 'Email', value: email}

    ]}
    onDragStart={handleDragStart}
    />
  );
};

ServiceAdd.defaultProps = {
    title: 'Service Address',
    address: 'Cafe lglesia 2200 E.Park Row Arlington, TX 76010 ',
    phone: '(817) 459-3901',
    email: 'pastor@iglesiacafe.com'
};

export default ServiceAdd