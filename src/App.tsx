import React from 'react';
import GlobalStyle from "./utils/GlobalStyle";
import Template from "./components/template";
import Component from "./components/component";
import {useForm} from "react-hook-form";
import delMember from "./json/delMember.json";

import RouterLink from "./router/router";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    const { register, handleSubmit,control } = useForm<any>();
  return (
    <div>

        {/*<Component  listArr={delMember} register={register} control={control} />*/}
        <Router>
            <RouterLink />
        </Router>
        <GlobalStyle />
    </div>
  );
}

export default App;
