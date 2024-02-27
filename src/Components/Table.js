import React from 'react'

import TableBlueprint from '../BluePrint/TableBlueprint';

const Table = ({fields, onDragStart}) => {

  const {thead, tbody} = fields || Table.defaultProps.fields;
  
  const handleDragStart = (e) => {

    console.log("Dragging");


    const Data = {
      type: 'table',
      fields: fields,
      w: 6,
      h:7,
      minH: 7,
      minW: 4,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(Data))
  }

 


  return (
    
    <TableBlueprint
    fields={ { thead, tbody }}
    onDragStart={handleDragStart}
    
    />
    
  )
};


Table.defaultProps = {
  fields : { 

    thead: ['Appliances', 'Quality', 'Circuit Style'],
    
    tbody:[
    { Appliances: 'Bells', Quantity: '%BellsQuantity%' , 'Circuit Style': '' },
    { Appliances: 'Horns', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Chimes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Strobes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Speakers', Quantity: '', 'Circuit Style': '' },
    
    
    ],
  }
};

export default Table