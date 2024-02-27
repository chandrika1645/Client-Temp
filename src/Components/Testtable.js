import React from 'react'
import TableBlueprint from '../BluePrint/TableBlueprint';


const Testtable = ({fields}) => {

  const {thead, tbody} = fields || Testtable.defaultProps.fields;
  
  const handleDragStart = (e) => {

    console.log("Dragging");


    const Data = {
      type: 'table',
      fields: fields,
      w: 6,
      h:18,
      minH: 18,
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


Testtable.defaultProps = {
  fields : { 

    thead: ['Appliances', 'Quality', 'Circuit Style'],
    
    tbody:[
    { Appliances: 'Bells', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Horns', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Chimes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Strobes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Speakers', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Bells', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Horns', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Chimes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Bells', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Horns', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Chimes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Strobes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Speakers', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Bells', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Horns', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Chimes', Quantity: '', 'Circuit Style': '' },
    ],


  }
};

export default Testtable;