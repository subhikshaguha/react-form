
// import React, { useState, Suspense } from 'react';

// function UiDynamicForm({ component, form }) {
//   const [parentText, setParentText] = useState('Hello from parent state!');

//   // Dynamically load the component based on the componentName prop
//   // let x = './AddReply.jsx'
//   const DynamicComponent = React.lazy(() => import('./AddReply.jsx'));

//   return (
//     <div>
//       {/* Render the dynamically loaded component */}
//       <Suspense fallback={<div>Loading...</div>}>
//         <DynamicComponent text={parentText} />
//       </Suspense>
//     </div>
//   );
// }

// export default UiDynamicForm;

import React, { useState, useEffect, useRef } from 'react';

function UiDynamicForm({ component, form }) {
  const [componentUpdated, setComponentUpdated] = useState(false);
  const dynamicComponentRef = useRef(null);

  useEffect(() => {
    // Dynamically import the component only once on mount
    import(`${component}`).then(module => {
      // Assuming your component is the default export of the module
      const Component = module.default;
      dynamicComponentRef.current = Component;
      setComponentUpdated(true);
    });
  }, []);

  const DynamicComponent = dynamicComponentRef.current;

  return (
    <div>
      {/* Render the dynamically loaded component */}
      {DynamicComponent && <DynamicComponent form={form} />}

    </div>
  );
}

export default UiDynamicForm;
