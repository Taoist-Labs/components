import React, {ChangeEvent, useRef, useState} from 'react';
import Template from "./packages/components/template";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";


function New() {
    const childRef = useRef(null);
    const [test,setTest] = useState('');
    const handleInput = (e:ChangeEvent) =>{
        const {value} = e.target as HTMLInputElement;
        setTest(value)
    }


    const handleFormSubmit = (data:any) => {
        console.log({
            ...data,
            test
        })
    };

    const AllSubmit = () =>{
        (childRef.current as any).submitForm()
    }

    return (
        <div>
        <Template DataSource={DataSource} operate="edit" initialItems={initialItems} BeforeComponent={  <input type="text" onChange={handleInput} />} AfterComponent={<div>bbbb</div>}  ref={childRef} onSubmitData={handleFormSubmit} />
            <button onClick={()=>AllSubmit()}>after</button>
        </div>
    );
}

export default New;
