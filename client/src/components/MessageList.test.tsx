import { render, screen } from "@testing-library/react";
import MessageList from "./MessageList";

describe('MessageList', () => {
  const mockMessages = [
    {user: 'Alice', message: 'Hello!', timestamp: '2023-07-23T12:00:00Z'},
    {user: 'Bob', message: 'Hi there!', timestamp: '2023-07-23T12:01:00Z'}
  ];

  it('renders messages correctly', () => {
    render(<MessageList messages={mockMessages} />)

    expect(screen.getByText('Alice:')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Bob:')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  })

  it('displays timestamps', () => {
    render(<MessageList messages={mockMessages} />)

    const timestamps = screen.getAllByText(/:00/);
    expect(timestamps).toHaveLength(2)
  })

  it('renders an empty list when no messages are provided', () => {
    render(<MessageList messages={[]} />)
    expect(screen.queryByText(':')).not.toBeInTheDocument()
  })
})