function TestComponent() { // in react, components are functions
    return ( // these react "functions" return html
      <div>
        <div>:3c</div>
      </div>
    )
  }

  export function DeleteMe() {
    return (
      <div>bye</div>
    )
  }
  
  export default TestComponent; // this line enables other files to pull in the component and use them