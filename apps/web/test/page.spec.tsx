import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { MockedProvider } from '@apollo/client/testing';

import RootPage from '../app/(game)/page';

describe('Root page', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RootPage />
      </MockedProvider>,
    );

    expect(container).toBeDefined();
  });

  it('should have the correct tree parent', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RootPage />
      </MockedProvider>,
    );

    expect(container).toBeInstanceOf(HTMLDivElement);
  });
});
