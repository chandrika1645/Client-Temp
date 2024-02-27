import React from 'react'
import Card from '../BluePrint/Card';


const JobDetails = ({ title, date, jobNumber}) => {
  const handleDragStart = (e) => {

    console.log("Dragging");
    
    const Data = {
      type: 'card',
      fields: [
        {label: 'Title', value: title, isTitle: true},
        { label: 'Job Date', value: date },
        { label: 'Job #', value: jobNumber }
      ],
      
      w: 4,
      h: 4,
      minH: 4,
      minW: 1,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(Data));
  };
  return (

    <Card
      fields={[
        { label: 'Title', value: title, isTitle: true },
        { label: 'Job Date', value: date },
        { label: 'Job #', value: jobNumber }
      ]}
      onDragStart={handleDragStart}
    />
    
  );
};


JobDetails.defaultProps = {
  title: 'Job Details',
  date: '12/20/2023',
  jobNumber: '000025'
};

export default JobDetails




