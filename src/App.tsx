import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './schemaLocale';

import Router from '@/router';
import store from '@/store';

const App = () => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Provider store={store}>
        <ModalsProvider labels={{ confirm: 'Confirmar', cancel: 'Cancelar' }}>
          <Router />
          <Toaster />
        </ModalsProvider>
      </Provider>
    </MantineProvider>
  );
};

export default App;
