'use client';

import { AppShell } from '../../../../components/AppShell';
import { Guard } from '../../../../components/Guard';
import { JldProductsManager } from '../../../../components/jld/JldProductsManager';
import { useI18n } from '../../../../contexts/I18nContext';
import { getJldCopy } from '../../../../i18n/jld';

export default function AdminParametersProductsPage() {
  const { language } = useI18n();
  const copy = getJldCopy(language);

  return (
    <Guard>
      <AppShell>
        <JldProductsManager heading={copy.productsTitle} subtitle={copy.productsSubtitle} backHref="/admin/parameters" />
      </AppShell>
    </Guard>
  );
}
