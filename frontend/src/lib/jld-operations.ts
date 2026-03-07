import type { LanguageCode } from '@/i18n/types';

export type JldOperationsArea = {
  slug: 'consumibles' | 'coiffeurs' | 'barbiers' | 'assistants' | 'manicure';
  title: string;
  description: string;
  focusLabel: string;
  focusValue: string;
  cadenceLabel: string;
  cadenceValue: string;
  accent: string;
};

const OPERATIONS_BY_LANGUAGE: Record<LanguageCode, JldOperationsArea[]> = {
  en: [
    {
      slug: 'consumibles',
      title: 'Consumibles',
      description: 'Track salon consumables, daily usage and replenishment needs without mixing them into retail stock.',
      focusLabel: 'Focus',
      focusValue: 'Stock and replenishment',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Daily control',
      accent: 'from-amber-300/30 to-orange-400/10',
    },
    {
      slug: 'coiffeurs',
      title: 'Coiffeurs',
      description: 'Prepare operational follow-up for hairstylists, service load, productivity and premium client allocation.',
      focusLabel: 'Focus',
      focusValue: 'Service planning',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Weekly staffing',
      accent: 'from-cyan-300/25 to-sky-400/10',
    },
    {
      slug: 'barbiers',
      title: 'Barbiers',
      description: 'Dedicated barber operations area for schedules, service rhythm and product support around men’s grooming.',
      focusLabel: 'Focus',
      focusValue: 'Barber workflow',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Daily operations',
      accent: 'from-emerald-300/25 to-teal-400/10',
    },
    {
      slug: 'assistants',
      title: 'Assistants',
      description: 'Centralize assistant coordination, preparation tasks, station readiness and support coverage by shift.',
      focusLabel: 'Focus',
      focusValue: 'Support coordination',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Shift management',
      accent: 'from-fuchsia-300/25 to-violet-400/10',
    },
    {
      slug: 'manicure',
      title: 'Manicure',
      description: 'Reserve a dedicated operational layer for manicure services, materials, appointments and team follow-up.',
      focusLabel: 'Focus',
      focusValue: 'Service and materials',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Agenda control',
      accent: 'from-rose-300/25 to-pink-400/10',
    },
  ],
  fr: [
    {
      slug: 'consumibles',
      title: 'Consumibles',
      description: 'Suivi des consommables salon, de l’usage quotidien et du reapprovisionnement sans melanger avec le stock retail.',
      focusLabel: 'Focus',
      focusValue: 'Stock et reappro',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Controle quotidien',
      accent: 'from-amber-300/30 to-orange-400/10',
    },
    {
      slug: 'coiffeurs',
      title: 'Coiffeurs',
      description: 'Espace operationnel pour les coiffeurs: charge de service, planning, productivite et allocation clients premium.',
      focusLabel: 'Focus',
      focusValue: 'Planning service',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Pilotage hebdo',
      accent: 'from-cyan-300/25 to-sky-400/10',
    },
    {
      slug: 'barbiers',
      title: 'Barbiers',
      description: 'Module dedie aux barbiers pour l’organisation, le rythme de service et les besoins produits grooming.',
      focusLabel: 'Focus',
      focusValue: 'Workflow barbier',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Operations quotidiennes',
      accent: 'from-emerald-300/25 to-teal-400/10',
    },
    {
      slug: 'assistants',
      title: 'Assistants',
      description: 'Coordination des assistants, preparation des postes, readiness salon et support par shift.',
      focusLabel: 'Focus',
      focusValue: 'Coordination support',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Gestion par shift',
      accent: 'from-fuchsia-300/25 to-violet-400/10',
    },
    {
      slug: 'manicure',
      title: 'Manicure',
      description: 'Couche operationnelle dediee a la manicure: materiel, rendez-vous et suivi equipe.',
      focusLabel: 'Focus',
      focusValue: 'Service et materiel',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Controle agenda',
      accent: 'from-rose-300/25 to-pink-400/10',
    },
  ],
  es: [
    {
      slug: 'consumibles',
      title: 'Consumibles',
      description: 'Controla consumibles del salon, uso diario y reposicion sin mezclarlos con el inventario retail.',
      focusLabel: 'Enfoque',
      focusValue: 'Stock y reposicion',
      cadenceLabel: 'Cadencia',
      cadenceValue: 'Control diario',
      accent: 'from-amber-300/30 to-orange-400/10',
    },
    {
      slug: 'coiffeurs',
      title: 'Coiffeurs',
      description: 'Espacio operativo para estilistas: carga de servicio, planificacion, productividad y asignacion premium.',
      focusLabel: 'Enfoque',
      focusValue: 'Planificacion de servicio',
      cadenceLabel: 'Cadencia',
      cadenceValue: 'Revision semanal',
      accent: 'from-cyan-300/25 to-sky-400/10',
    },
    {
      slug: 'barbiers',
      title: 'Barbiers',
      description: 'Modulo dedicado a barberos para ritmo de servicio, organizacion y soporte de grooming masculino.',
      focusLabel: 'Enfoque',
      focusValue: 'Flujo de barberia',
      cadenceLabel: 'Cadencia',
      cadenceValue: 'Operacion diaria',
      accent: 'from-emerald-300/25 to-teal-400/10',
    },
    {
      slug: 'assistants',
      title: 'Assistants',
      description: 'Coordina asistentes, preparacion de estaciones, soporte de piso y cobertura por turno.',
      focusLabel: 'Enfoque',
      focusValue: 'Coordinacion de apoyo',
      cadenceLabel: 'Cadencia',
      cadenceValue: 'Gestion por turno',
      accent: 'from-fuchsia-300/25 to-violet-400/10',
    },
    {
      slug: 'manicure',
      title: 'Manicure',
      description: 'Reserva una capa operativa para manicure con materiales, agenda y seguimiento del equipo.',
      focusLabel: 'Enfoque',
      focusValue: 'Servicio y materiales',
      cadenceLabel: 'Cadencia',
      cadenceValue: 'Control de agenda',
      accent: 'from-rose-300/25 to-pink-400/10',
    },
  ],
};

export function getOperationsAreas(language: LanguageCode): JldOperationsArea[] {
  return OPERATIONS_BY_LANGUAGE[language];
}

export function getOperationsArea(language: LanguageCode, slug: string): JldOperationsArea | null {
  return getOperationsAreas(language).find((item) => item.slug === slug) || null;
}
