/// <reference types="jest" />
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainMenu from '../components/MainMenu';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null }),
}));

describe('MainMenu Component', () => {
  it('відображає кнопку "Увійти", коли користувач не авторизований', () => {
    render(<MainMenu />);
    
    const loginLink = screen.getByText('Увійти');
    expect(loginLink).toBeInTheDocument();
  });
});