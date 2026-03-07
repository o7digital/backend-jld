'use client';

import { AppShell } from '../../components/AppShell';
import { Guard } from '../../components/Guard';
import { useI18n } from '../../contexts/I18nContext';
import { getJldCopy } from '../../i18n/jld';
import { JldProductsManager } from '../../components/jld/JldProductsManager';

export default function ProductsPage() {
  const { language } = useI18n();
  const copy = getJldCopy(language);

  return (
    <Guard>
      <AppShell>
        <JldProductsManager heading={copy.productsTitle} subtitle={copy.productsSubtitle} />
      </AppShell>
    </Guard>
  );
}
