/**
 * @jest-environment node
 */

import React from 'react';
import {renderToString} from 'react-dom/server';
import AutoSizer from '../index';

test('should render content with default widths and heights initially', () => {
  const rendered = renderToString(
    <AutoSizer defaultHeight={100} defaultWidth={200}>
      {({height, width}) => <div>{`height:${height};width:${width}`}</div>}
    </AutoSizer>,
  );
  expect(rendered).toContain('height:100');
  expect(rendered).toContain('width:200');
});
