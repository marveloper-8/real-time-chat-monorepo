import { fireEvent, render, screen } from "@testing-library/react";
import MessageInput from "./MessageInput"

describe('MessageInput', () => {
  it('renders the input field and send button', () => {
    render(<MessageInput onSendMessage={() => {}} />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  })

  it('calls onSendMessage when submitting a non-empty message', () => {
    const mockSendMessage = jest.fn();
    render(<MessageInput onSendMessage={mockSendMessage} />);

    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, {target: {value: 'Hello, world!'}});
    fireEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('Hello, world!');
    expect(input).toHaveValue('');
  });

  it('does not call onSendMessage when submitting an empty message', () => {
    const mockSendMessage = jest.fn();
    render(<MessageInput onSendMessage={mockSendMessage} />);

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    expect(mockSendMessage).not.toHaveBeenCalled();
  })
})