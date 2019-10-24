import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { GrobalStyle } from './style'
import Header from './header';



function App() {
  return (
    <Fragment>
      <GrobalStyle />
      <Provider store = { store }>
        <Header />
        <BrowserRouter>
            <Fragment>
              <Route path = '/' exact component={Home}></Route>
              <Route path = '/detail' exact component={Detail}></Route>
              {/*<Route path = '/' exact render={() => <div>home</div>}></Route>*/}
              {/*<Route path = '/detail' exact render={() => <div>detail</div>}></Route>*/}
            </Fragment>
            </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
