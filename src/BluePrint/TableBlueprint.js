import React from 'react';
import "../Styles/Table.css"

const TableBlueprint = ({fields, onDragStart, id}) => {
    return (
        <table id={id} draggable={true}
        onDragStart={onDragStart}
        className="appliance-table">
            <thead>
                <tr>
                {fields.thead.map((heading, index) => (
                    <th key={index}>{heading}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {fields.tbody.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>
                        {cellIndex === 1 || cellIndex === 2 ? null : cell}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableBlueprint;