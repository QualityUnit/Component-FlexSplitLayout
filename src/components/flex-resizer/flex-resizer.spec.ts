import {newSpecPage} from '@stencil/core/testing';
import {FlexResizer} from './flex-resizer';

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [FlexResizer],
      html: '<flex-resizer></flex-resizer>',
    });
    expect(root).toEqualHtml(`<flex-resizer class="row-resizer">
    <div></div>
</flex-resizer>`);
  });
});
