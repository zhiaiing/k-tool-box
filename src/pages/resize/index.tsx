import React from "react";
import { useResize } from "../../../lib/index"

const Index = () => {
  const ref = React.useRef(null);

  useResize(ref, (size) => {
    console.log('size --- ', size);
  })

  return <div style={{ height: '100%' }} ref={ref}>resize</div>
}

export default Index;
