import {newSpecPage} from '@stencil/core/testing';
import {FlexResizer} from './flex-resizer';

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [FlexResizer],
      html: '<flex-resizer class="row-resizer"></flex-resizer>',
    });
    expect(root).toEqualHtml(`<flex-resizer>
    <div></div>
</flex-resizer>`);
  });
});
