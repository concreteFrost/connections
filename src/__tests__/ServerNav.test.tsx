import { render, screen,cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Импорт MemoryRouter
import ServerNav from '../components/Server/ServerNav/ServerNav';

describe('отображается компонент ServerNav с конкретным текстовым содержимым',()=>{

  afterEach(() => {
    cleanup(); // очистка DOM после каждого теста
  });

  test('THIS IS THE TEST', () => {
    render(
      <MemoryRouter>
        <ServerNav />
      </MemoryRouter>
    );
    
    // Используем screen.getByText для поиска текстового содержимого в отрендеренном компоненте
    const textElement = screen.getByText(/CONNECTIONS SERVER DASHBOARD/i);
    
    // Проверяем, что текстовое содержимое присутствует в виртуальной DOM
    expect(textElement).toBeInTheDocument();
  })
  
  
})

