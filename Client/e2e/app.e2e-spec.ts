import { CarControlSourcePage } from './app.po';

describe('car-control-source App', () => {
  let page: CarControlSourcePage;

  beforeEach(() => {
    page = new CarControlSourcePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
