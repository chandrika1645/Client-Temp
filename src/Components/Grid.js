import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import '../Styles/Grid.css'
import Card from '../BluePrint/Card';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import TableBlueprint from '../BluePrint/TableBlueprint';



const ResponsiveGridLayout = WidthProvider(Responsive);



class Grid extends Component {

  

  constructor(props) {
    super(props);
    this.state = {
      layout: [],             //define our grid items and pass them as prop
      dynamicComponents: [], // New state for dynamically added components
      componentData: {},
      styleSheets: [],
    };
  }

  onDrop = (layout, layoutItem, event) => {

    console.log('onDrop called');
    event.preventDefault();

    const droppedData = event.dataTransfer.getData('text/plain');
    
    if (droppedData) {

      const Data = JSON.parse(droppedData);

      const { minH, minW, w, h , fields, type} = Data;
      const {x,y} = layoutItem;
      
      
      
      const newComponentId = `dynamic-${this.state.dynamicComponents.length + 1}`;
      

      const newComponent = {
        i: newComponentId,
        x,
        y,
        w,
        h,
        minH,
        minW,
        fields,
        type,
      };
     

      const updatedComponentData = {
        ...this.state.componentData,
        [newComponentId]: Data 
      };

      console.log('Updated Component data', updatedComponentData);

      this.setState((prevState) => ({
        layout: [...prevState.layout, newComponent],
        dynamicComponents: [...prevState.dynamicComponents, newComponent],
        componentData: updatedComponentData,
        
      }));
    }else{
      console.log('No dropped data found');
    }
  };

  

  renderDynamicComponent = (dynamicComponent) => {
    const { componentData } = this.state;
    let fields;

    switch (dynamicComponent.type){
      case 'card' :
        fields = componentData[dynamicComponent.i].fields;
        
        return <Card fields={fields} />;

      case 'image':
        return(
          <img src={componentData[dynamicComponent.i].imageUrl} alt="logo" />
        )
      
      

      case 'table':
       
        fields = componentData[dynamicComponent.i].fields;
        return (
          <TableBlueprint id={dynamicComponent.i}  fields={fields} />
          
        );
      
      default:
        return null;
    }

  };

  handleResize = (layout) => {
    // Update the size of dynamic components in state when resized
    const updatedDynamicComponents = layout.map((item) => {
      const dynamicComponent = this.state.dynamicComponents.find(
        (comp) => comp.i === item.i
      );
      if (dynamicComponent) {
        return {
          ...dynamicComponent,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        };
      }
      return null;
    });
  
    const filteredDynamicComponents = updatedDynamicComponents.filter(
      (comp) => comp !== null
    );
  
    this.setState({
      dynamicComponents: filteredDynamicComponents,
      layout,
    });
  };

  

  handleDrag = (layout) => {
    // Update the position of dynamic components in state when dragged
    const updatedDynamicComponents = layout.map((item) => {
      const dynamicComponent = this.state.dynamicComponents.find(
        (comp) => comp.i === item.i
      );
      if (dynamicComponent) {
        return {
          ...dynamicComponent,
          x: item.x,
          y: item.y,
        };
      }
      return null;
    });
  
    const filteredDynamicComponents = updatedDynamicComponents.filter(
      (comp) => comp !== null
    );
  
    this.setState({
      dynamicComponents: filteredDynamicComponents,
    });
  };

  

  PrintPdf = async (dynamicComponents) => {
  
    console.log("Printpdf called", dynamicComponents);
    const doc = new jsPDF({ orientation: "landscape" });

    dynamicComponents.forEach((component) => {
      if (component.type === "table") {
      doc.autoTable({
        html: `#${component.i}`,
        
  
      });
    }
    else if (component.type === "card"){
      
      const { fields} = component;
        const data = []; // Array to hold data for autoTable
        
        fields.forEach(field => {
          if(field.label==='Title'){
            data.push([field.value]);
          }else{

            data.push([field.label + ': '+ field.value]); // Push label and value as a row
          }
        });

        doc.autoTable({
      
          // theme: 'plain',
          styles: { fillColor: [255,255,255] },
          body: data, // Data for the table body
          
            
        });
      }
    });
    
    doc.save("mypdf.pdf");
  };


  dfs(parent) {
    if (parent.children.length === 0) return
    for (const child of parent.children) {
  
      const childStyles = window.getComputedStyle(child)
      Array.from(childStyles).forEach(key => child.style.setProperty(key, childStyles.getPropertyValue(key), childStyles.getPropertyPriority(key)))
      this.dfs(child)
    }
  }


  generateHTML = () => {
    const parent = document.querySelector('.layout');

    if (parent) {
      // HTML content of layout and its children
      const htmlContent = parent; 
      this.dfs(htmlContent);

      const fullHTMLContent = `<html><head></head><body>${htmlContent.innerHTML}</body></html>`;
      
      const formData = new FormData();
      const blob = new Blob([fullHTMLContent], { type: 'text/html' });

      formData.append('file', blob, 'layout.html');

      console.log("before server send", blob);

        // Send POST request to the server
        fetch('http://localhost:2040/saveTemplate', {
            method: 'POST',
            body: formData
        })
        .then(response => {
          if (response.ok) {
            // Handle success
            console.log('File uploaded successfully');
          } else {
            // Handle error
            console.error('Failed to upload file');
          }
        })
        .catch(error => {
            console.error('Error occurred while uploading file:', error);
        });

        
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = 'myFile.html';
      // document.body.appendChild(link);
      // link.click();
    }

  };

  

  
  render(){
    const { layout, dynamicComponents } = this.state;
    console.log("Layout data:" ,layout);
    console.log("Dynamic components:", dynamicComponents);
    return (  
      <>
      <div className='button-container'>

      <button  className='pdf-button' onClick={()=>{
        this.generateHTML()
      }}>
        Generate HTML 
      </button>
  
      <button className="pdf-button" onClick={() => {
        this.PrintPdf(this.state.dynamicComponents)
      }}> 
        Print PDF using data
      </button>



      </div>
      <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: this.state.layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      onResizeStop={this.handleResize}
      onDragStop={this.handleDrag}
      isResizable={true}
      isDroppable={true}
      onDrop={this.onDrop}
      onDragOver={(e) => e.preventDefault()}

      >

        
          {dynamicComponents && dynamicComponents.length > 0 ?(
          dynamicComponents.map((dynamicComponent) => (
            <div
              id={`dynamic-component-${dynamicComponent.i}`}
              key={dynamicComponent.i}
              className="dynamic-component"
              data-grid={{ x: dynamicComponent.x, y: dynamicComponent.y, w: dynamicComponent.w, h: dynamicComponent.h, minW: dynamicComponent.minW,
                minH: dynamicComponent.minH }}
            >
              {this.renderDynamicComponent(dynamicComponent)}
              
            </div>
          ))
          ):(
            <p>No dynamic components</p>
          )}
        
     
      </ResponsiveGridLayout>
      </>
    );
  }
}
 
export default Grid;


