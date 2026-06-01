import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutesServer } from './app/AppRoutesServer';

export function renderRoute(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutesServer />
    </StaticRouter>,
  );
}
