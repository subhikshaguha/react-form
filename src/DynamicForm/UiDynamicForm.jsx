import React, { useState, useEffect, useRef } from 'react';

function UiDynamicForm({component, form}) {
  const [parentText, setParentText] = useState('Hello from parent state!');
  const dynamicComponentRef = useRef(null);

  useEffect(() => {
    // Dynamically import the component only once on mount
    import(component).then(module => {
      // Assuming your component is the default export of the module
      const Component = module.default;
      dynamicComponentRef.current = Component;
    });
  }, []);

  const DynamicComponent = dynamicComponentRef.current;

  return (
    <div>
      {/* Render the dynamically loaded component */}
      {DynamicComponent && <DynamicComponent text={parentText} />}

    </div>
  );
}

export default UiDynamicForm;
