import styled from 'styled-components';
import { Connect } from './components/connect';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

function App() {
  return (
    <AppContainer>
      <Connect />
    </AppContainer>
  );
}

export default App;
