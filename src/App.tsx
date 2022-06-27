
import React from "react";
import "./styles.scss";

import { ContactUsForm } from './component/ContactUsForm';


const App: React.FC = () => {
return (
<div className="wrapper">
<h1> React and TypeScript my FORM</h1>
<  ContactUsForm/>
</div>
  );
};
export default App;