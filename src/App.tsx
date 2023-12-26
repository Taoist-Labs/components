import React from 'react';
import GlobalStyle from "./packages/utils/GlobalStyle";
import RouterLink from "./router/router";
import {HashRouter as Router} from "react-router-dom";

function App() {

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
