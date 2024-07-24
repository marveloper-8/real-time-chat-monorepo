import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChatRoom from "./ChatRoom";

jest.mock('../utils/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

describe('ChatRoom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chat room', () => {
    render(<ChatRoom />);
    expect(screen.getByText('Real-time Chat App')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter room name')).toBeInTheDocument();
    expect(screen.getByText('Join Room')).toBeInTheDocument();
  });

  it('allows joining a room', async () => {
    render(<ChatRoom />);
    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const roomInput = screen.getByPlaceholderText('Enter room name');
    const joinButton = screen.getByText('Join Room');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(roomInput, { target: { value: 'testroom' } });
    fireEvent.click(joinButton);

    const socket = require('../utils/socket').default;
    await waitFor(() => {
      expect(socket.emit).toHaveBeenCalledWith('joinRoom', 'testroom');
    });
  });

  it('displays received messages', () => {
    const socket = require('../utils/socket').default;
    socket.on.mockImplementation((event: string, callback: (arg0: { user: string; message: string; timestamp: string; }) => void) => {
      if(event === 'message'){
        callback({
          user: 'testuser',
          message: 'Hello, world!',
          timestamp: '2023-07-23T12:00:00Z'
        })
      }
    })

    render(<ChatRoom />);
    expect(screen.getByText('testuser:')).toBeInTheDocument();
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  })
})