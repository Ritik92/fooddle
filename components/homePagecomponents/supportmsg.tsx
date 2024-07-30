
'use client'
import React, { useState } from 'react';
import './cssModules/supportmsg.css'
import { Image } from '@nextui-org/react';
interface SupportProps {
  closeHelpbox: () => void;
}
const Supportmsg: React.FC<SupportProps> = ({closeHelpbox}) => {
  const [text, setText] = useState('');
  const maxLength = 300;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div id="setup">

      <div id="cross" onClick={closeHelpbox}>
      <svg className ="hover-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19.001 4.99969L5.00098 18.9997M5.00098 4.99969L19.001 18.9997" stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 

      </div>


    <div id="whole">
      <textarea
        placeholder="Enter your message here."
        maxLength={maxLength}
        value={text}
        onChange={handleChange}
        className='no-border'
      ></textarea>
      <div id="limit"><p>{maxLength - text.length} characters left</p></div>
    </div>
    </div>
  );
};

export default Supportmsg;
