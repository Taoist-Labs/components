import React from 'react';
import GlobalStyle from "./utils/GlobalStyle";
import Template from "./components/template";
import Component from "./components/component";
import {useForm} from "react-hook-form";
import delMember from "./json/delMember.json";

function App() {
    const { register, handleSubmit,control } = useForm<any>();
  return (
    <div>

        {/*<Component  listArr={delMember} register={register} control={control} />*/}

        <Template />
        <GlobalStyle />
    </div>
  );
}

export default App;
