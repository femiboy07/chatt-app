import React,{forwardRef} from 'react';
import  TextAreaAutosize  from 'react-textarea-autosize';



const TextAreaWithRef= forwardRef((props, ref) => (
    <TextAreaAutosize {...props} ref={ref} />


));

export default TextAreaWithRef;



