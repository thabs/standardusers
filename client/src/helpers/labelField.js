import React from 'react';

export const renderMultipleLabels = (fields, values) => {
  return fields.map(({ label, name}) => {
    const value = values[name] ? values[name] : ' ';
    return (
      <tr key={name}>
        <td className="text-muted">{label}:</td>
        <td>{value}</td>
      </tr>  
    );
  }); 
}


export const renderLabel = (label, value) =>  {
  return (
    <tr>
      <td className="text-muted">{label}:</td>
      <td>{value}</td>
    </tr>  
  );
}