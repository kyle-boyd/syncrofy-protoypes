import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Test/Simple',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    // Pure HTML test with explicit React usage
    return React.createElement('div', {
      style: {
        padding: '20px',
        border: '2px solid green',
        backgroundColor: '#e8f5e8',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    }, '✅ Hello World - Working Story with React.createElement!');
  },
};

export const JSXTest: Story = {
  render: () => (
    <div style={{
      padding: '20px',
      border: '2px solid blue',
      backgroundColor: '#e3f2fd',
      fontSize: '18px',
      fontWeight: 'bold'
    }}>
      ✅ Hello World - Working Story with JSX!
    </div>
  ),
};

export const HTMLTest: Story = {
  render: () => {
    // Return plain HTML without JSX
    const div = document.createElement('div');
    div.style.padding = '20px';
    div.style.border = '2px solid green';
    div.style.backgroundColor = '#e8f5e8';
    div.style.fontSize = '18px';
    div.style.fontWeight = 'bold';
    div.textContent = '✅ Hello World - Plain HTML Test!';
    return div;
  },
};
