import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

export function MySEOProvider() {
  const intl = useIntl();
  return (
    <Helmet>
      <title>{intl.formatMessage({ id: 'page.title' })}</title>
      <meta
        name='description'
        content={intl.formatMessage({ id: 'page.description' })}
      />
        <meta
            name='og:image'
            content={'%PUBLIC_URL%/logo.jpeg'}
        />
    </Helmet>
  );
}
