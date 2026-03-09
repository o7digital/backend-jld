import type { LanguageCode } from '@/i18n/types';

export const OPERATIONS_AREA_SLUGS = ['consumibles', 'coiffeurs', 'barbiers', 'assistants', 'manicure'] as const;

export type JldOperationsAreaSlug = (typeof OPERATIONS_AREA_SLUGS)[number];

export type JldOperationsArea = {
  slug: JldOperationsAreaSlug;
  title: string;
  description: string;
  focusLabel: string;
  focusValue: string;
  cadenceLabel: string;
  cadenceValue: string;
  accent: string;
  defaultDurationMinutes: number;
  tabletNote: string;
  servicePresets: string[];
  consumablePresets: string[];
};

export type OperationsWorkspaceCopy = {
  notFoundTitle: string;
  notFoundDescription: string;
  profilesMetric: string;
  servicesMetric: string;
  consumablesMetric: string;
  accountTitle: string;
  accountSubtitle: string;
  existingProfilesTitle: string;
  existingProfilesEmpty: string;
  activeProfileLabel: string;
  createProfileLabel: string;
  createProfileHint: string;
  journalTitle: string;
  journalSubtitle: string;
  dateLabel: string;
  timeLabel: string;
  serviceLabel: string;
  servicePlaceholder: string;
  clientLabel: string;
  clientPlaceholder: string;
  durationLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  consumablesLabel: string;
  customConsumableLabel: string;
  customConsumablePlaceholder: string;
  addConsumable: string;
  saveEntry: string;
  recentEntriesTitle: string;
  recentEntriesSubtitle: string;
  recentEntriesEmpty: string;
  tabletModeTitle: string;
  tabletModeSubtitle: string;
  savedOnDevice: string;
  durationUnit: string;
  profileCreated: string;
  profileExists: string;
  entryCreated: string;
  validationProfileRequired: string;
  validationProfileFirst: string;
  validationServiceRequired: string;
};

const OPERATIONS_BY_LANGUAGE: Record<LanguageCode, JldOperationsArea[]> = {
  en: [
    {
      slug: 'consumibles',
      title: 'Consumables',
      description: 'Track salon consumables, daily usage and replenishment needs without mixing them into retail stock.',
      focusLabel: 'Focus',
      focusValue: 'Stock and replenishment',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Daily control',
      accent: 'from-amber-300/30 to-orange-400/10',
      defaultDurationMinutes: 15,
      tabletNote: 'Open this screen on a tablet to record stock output, replenishment requests and product usage directly from the floor.',
      servicePresets: ['Stock output', 'Express replenishment', 'Backbar count', 'Color bar refill'],
      consumablePresets: ['Shampoo', 'Oxidant', 'Color tube', 'Foil', 'Gloves', 'Towels'],
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
      defaultDurationMinutes: 60,
      tabletNote: 'Each stylist can open their station on iPad or Android tablet and capture cuts, color services and related consumables in real time.',
      servicePresets: ['Haircut', 'Blow dry', 'Color', 'Highlights', 'Treatment', 'Consultation'],
      consumablePresets: ['Shampoo', 'Mask', 'Color', 'Oxidant', 'Foil', 'Styling spray'],
    },
    {
      slug: 'barbiers',
      title: 'Barbiers',
      description: "Dedicated barber operations area for schedules, service rhythm and product support around men's grooming.",
      focusLabel: 'Focus',
      focusValue: 'Barber workflow',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Daily operations',
      accent: 'from-emerald-300/25 to-teal-400/10',
      defaultDurationMinutes: 45,
      tabletNote: 'Barbers can log each appointment, shaving service or beard care routine from a compact tablet-first screen.',
      servicePresets: ['Haircut', 'Beard trim', 'Traditional shave', 'Contour', 'Facial care'],
      consumablePresets: ['Shaving cream', 'Blade', 'Beard oil', 'Aftershave', 'Hot towel'],
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
      defaultDurationMinutes: 25,
      tabletNote: 'Assistants can capture rinse services, prep tasks, station resets and material usage without opening the main CRM.',
      servicePresets: ['Shampoo support', 'Color prep', 'Station reset', 'Towel restock', 'Guest reception'],
      consumablePresets: ['Shampoo', 'Conditioner', 'Towels', 'Gloves', 'Apron', 'Disinfectant'],
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
      defaultDurationMinutes: 50,
      tabletNote: 'Manicure staff can record the service performed, client name and consumables used from any tablet at the station.',
      servicePresets: ['Express manicure', 'Semi-permanent', 'Gel refill', 'Nail art', 'Care ritual'],
      consumablePresets: ['Base coat', 'Color', 'Top coat', 'Acetone', 'Files', 'Cuticle oil'],
    },
  ],
  fr: [
    {
      slug: 'consumibles',
      title: 'Consumibles',
      description: "Suivi des consommables salon, de l'usage quotidien et du reapprovisionnement sans melanger avec le stock retail.",
      focusLabel: 'Focus',
      focusValue: 'Stock et reappro',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Controle quotidien',
      accent: 'from-amber-300/30 to-orange-400/10',
      defaultDurationMinutes: 15,
      tabletNote: 'Ouvrez cet ecran sur tablette pour saisir les sorties de stock, les demandes de reappro et les produits utilises directement depuis le salon.',
      servicePresets: ['Sortie stock', 'Reappro express', 'Comptage backbar', 'Recharge bar a couleur'],
      consumablePresets: ['Shampooing', 'Oxydant', 'Tube couleur', 'Papier alu', 'Gants', 'Serviettes'],
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
      defaultDurationMinutes: 60,
      tabletNote: 'Chaque coiffeur peut ouvrir son poste sur iPad ou tablette Android et saisir en direct coupe, brushing, couleur et consommables utilises.',
      servicePresets: ['Coupe', 'Brushing', 'Coloration', 'Meches / balayage', 'Soin', 'Diagnostic'],
      consumablePresets: ['Shampooing', 'Masque', 'Couleur', 'Oxydant', 'Papier alu', 'Spray coiffant'],
    },
    {
      slug: 'barbiers',
      title: 'Barbiers',
      description: "Module dedie aux barbiers pour l'organisation, le rythme de service et les besoins produits grooming.",
      focusLabel: 'Focus',
      focusValue: 'Workflow barbier',
      cadenceLabel: 'Cadence',
      cadenceValue: 'Operations quotidiennes',
      accent: 'from-emerald-300/25 to-teal-400/10',
      defaultDurationMinutes: 45,
      tabletNote: 'Les barbiers peuvent saisir chaque rendez-vous, rasage ou prestation barbe depuis une interface compacte pensee pour la tablette.',
      servicePresets: ['Coupe', 'Taille barbe', 'Rasage traditionnel', 'Contours', 'Soin visage'],
      consumablePresets: ['Creme a raser', 'Lame', 'Huile barbe', 'Aftershave', 'Serviette chaude'],
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
      defaultDurationMinutes: 25,
      tabletNote: 'Les assistants peuvent suivre les shampoings, preparations, remises a niveau des postes et les materiaux utilises sans ouvrir le CRM principal.',
      servicePresets: ['Support shampooing', 'Preparation couleur', 'Remise a niveau poste', 'Reassort serviettes', 'Accueil client'],
      consumablePresets: ['Shampooing', 'Conditioner', 'Serviettes', 'Gants', 'Tablier', 'Desinfectant'],
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
      defaultDurationMinutes: 50,
      tabletNote: "L'equipe manicure peut enregistrer la prestation du jour, la cliente et les consommables utilises depuis n'importe quelle tablette au poste.",
      servicePresets: ['Manucure express', 'Semi-permanent', 'Remplissage gel', 'Nail art', 'Soin complet'],
      consumablePresets: ['Base coat', 'Couleur', 'Top coat', 'Acetone', 'Limes', 'Huile cuticules'],
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
      defaultDurationMinutes: 15,
      tabletNote: 'Abre esta pantalla en tablet para registrar salidas de stock, solicitudes de reposicion y productos utilizados directamente desde piso.',
      servicePresets: ['Salida de stock', 'Reposicion express', 'Conteo backbar', 'Recarga barra de color'],
      consumablePresets: ['Shampoo', 'Oxidante', 'Tubo de color', 'Papel aluminio', 'Guantes', 'Toallas'],
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
      defaultDurationMinutes: 60,
      tabletNote: 'Cada estilista puede abrir su cuenta en iPad o tablet Android y capturar corte, tinte, brushing y consumibles en tiempo real.',
      servicePresets: ['Corte', 'Brushing', 'Tinte', 'Mechas / balayage', 'Tratamiento', 'Diagnostico'],
      consumablePresets: ['Shampoo', 'Mascarilla', 'Color', 'Oxidante', 'Papel aluminio', 'Spray de peinado'],
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
      defaultDurationMinutes: 45,
      tabletNote: 'Los barberos pueden registrar cada cita, afeitado o servicio de barba desde una vista compacta pensada para tablet.',
      servicePresets: ['Corte', 'Perfilado barba', 'Afeitado tradicional', 'Contornos', 'Cuidado facial'],
      consumablePresets: ['Crema de afeitar', 'Navaja', 'Aceite para barba', 'Aftershave', 'Toalla caliente'],
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
      defaultDurationMinutes: 25,
      tabletNote: 'Los asistentes pueden registrar shampoos, preparaciones, acomodo de estaciones y materiales usados sin abrir el CRM principal.',
      servicePresets: ['Apoyo shampoo', 'Preparacion de color', 'Reset de estacion', 'Reposicion de toallas', 'Recepcion cliente'],
      consumablePresets: ['Shampoo', 'Acondicionador', 'Toallas', 'Guantes', 'Mandil', 'Desinfectante'],
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
      defaultDurationMinutes: 50,
      tabletNote: 'El equipo de manicure puede registrar el servicio realizado, el nombre de la clienta y los consumibles usados desde cualquier tablet.',
      servicePresets: ['Manicure express', 'Semipermanente', 'Relleno gel', 'Nail art', 'Ritual de cuidado'],
      consumablePresets: ['Base coat', 'Color', 'Top coat', 'Acetona', 'Limas', 'Aceite de cuticula'],
    },
  ],
};

const OPERATIONS_WORKSPACE_COPY: Record<LanguageCode, OperationsWorkspaceCopy> = {
  en: {
    notFoundTitle: 'Area not found',
    notFoundDescription: 'This operations area is not available yet.',
    profilesMetric: 'Tablet profiles',
    servicesMetric: 'Entries on selected day',
    consumablesMetric: 'Consumables used',
    accountTitle: 'Team access',
    accountSubtitle: 'Create a quick station access with name and email so each team member can open their own tablet workspace.',
    existingProfilesTitle: 'Saved profiles',
    existingProfilesEmpty: 'No team profile saved for this area yet.',
    activeProfileLabel: 'Active station',
    createProfileLabel: 'Create profile',
    createProfileHint: 'Ideal for iPad or Android tablet use on the salon floor.',
    journalTitle: 'Daily journal',
    journalSubtitle: 'Capture the service or task delivered, client name and consumables used during the day.',
    dateLabel: 'Day',
    timeLabel: 'Start time',
    serviceLabel: 'Service or task',
    servicePlaceholder: 'Example: haircut + color retouch',
    clientLabel: 'Client',
    clientPlaceholder: 'Optional client name',
    durationLabel: 'Duration',
    notesLabel: 'Notes',
    notesPlaceholder: 'Result, formula, incident or follow-up details',
    consumablesLabel: 'Consumables used',
    customConsumableLabel: 'Add a consumable',
    customConsumablePlaceholder: 'Example: toner 7.1',
    addConsumable: 'Add consumable',
    saveEntry: 'Save entry',
    recentEntriesTitle: 'Shift feed',
    recentEntriesSubtitle: 'Quick view of what has been entered for the selected day.',
    recentEntriesEmpty: 'No entry has been logged for this day yet.',
    tabletModeTitle: 'Tablet-ready flow',
    tabletModeSubtitle: 'Compact capture flow for service teams.',
    savedOnDevice: 'Saved locally on this device for fast salon usage.',
    durationUnit: 'min',
    profileCreated: 'Profile created and ready to use.',
    profileExists: 'This email already exists in the area. Existing profile selected.',
    entryCreated: 'Entry saved for the selected day.',
    validationProfileRequired: 'Name and email are required to create a profile.',
    validationProfileFirst: 'Create or select a team profile before logging a service.',
    validationServiceRequired: 'Enter a service or task before saving.',
  },
  fr: {
    notFoundTitle: 'Zone introuvable',
    notFoundDescription: "Cette zone operations n'est pas encore disponible.",
    profilesMetric: 'Profils tablette',
    servicesMetric: 'Saisies sur la journee',
    consumablesMetric: 'Consommables utilises',
    accountTitle: 'Acces equipe',
    accountSubtitle: 'Creez un acces rapide avec nom et email pour que chaque collaborateur ouvre son propre workspace sur tablette.',
    existingProfilesTitle: 'Profils enregistres',
    existingProfilesEmpty: 'Aucun profil equipe enregistre dans cette zone pour le moment.',
    activeProfileLabel: 'Poste actif',
    createProfileLabel: 'Creer un profil',
    createProfileHint: 'Pense pour un usage iPad ou tablette Android en salon.',
    journalTitle: 'Journal de journee',
    journalSubtitle: 'Saisissez la prestation ou la tache, le client et les consommables utilises pendant la journee.',
    dateLabel: 'Journee',
    timeLabel: 'Heure de debut',
    serviceLabel: 'Prestation ou tache',
    servicePlaceholder: 'Exemple: coupe + retouche couleur',
    clientLabel: 'Client',
    clientPlaceholder: 'Nom du client (optionnel)',
    durationLabel: 'Duree',
    notesLabel: 'Notes',
    notesPlaceholder: 'Resultat, formule, incident ou suite a donner',
    consumablesLabel: 'Consommables utilises',
    customConsumableLabel: 'Ajouter un consommable',
    customConsumablePlaceholder: 'Exemple: toner 7.1',
    addConsumable: 'Ajouter',
    saveEntry: 'Enregistrer la saisie',
    recentEntriesTitle: 'Fil de shift',
    recentEntriesSubtitle: 'Vue rapide de ce qui a ete saisi pour la journee selectionnee.',
    recentEntriesEmpty: 'Aucune saisie pour cette journee pour le moment.',
    tabletModeTitle: 'Flux pret pour tablette',
    tabletModeSubtitle: 'Saisie compacte pour les equipes service.',
    savedOnDevice: 'Sauvegarde locale sur cet appareil pour un usage rapide en salon.',
    durationUnit: 'min',
    profileCreated: "Profil cree et pret a l'emploi.",
    profileExists: 'Cet email existe deja dans la zone. Profil existant selectionne.',
    entryCreated: 'Saisie enregistree pour la journee selectionnee.',
    validationProfileRequired: "Le nom et l'email sont obligatoires pour creer un profil.",
    validationProfileFirst: "Creez ou selectionnez d'abord un profil avant de saisir une prestation.",
    validationServiceRequired: "Renseignez une prestation ou une tache avant d'enregistrer.",
  },
  es: {
    notFoundTitle: 'Area no encontrada',
    notFoundDescription: 'Esta area de operaciones aun no esta disponible.',
    profilesMetric: 'Perfiles tablet',
    servicesMetric: 'Capturas del dia',
    consumablesMetric: 'Consumibles usados',
    accountTitle: 'Acceso del equipo',
    accountSubtitle: 'Crea un acceso rapido con nombre y email para que cada colaborador abra su propio workspace en tablet.',
    existingProfilesTitle: 'Perfiles guardados',
    existingProfilesEmpty: 'Todavia no hay perfiles guardados para esta area.',
    activeProfileLabel: 'Estacion activa',
    createProfileLabel: 'Crear perfil',
    createProfileHint: 'Pensado para uso en iPad o tablet Android dentro del salon.',
    journalTitle: 'Bitacora del dia',
    journalSubtitle: 'Captura el servicio o tarea, el cliente y los consumibles usados durante la jornada.',
    dateLabel: 'Jornada',
    timeLabel: 'Hora de inicio',
    serviceLabel: 'Servicio o tarea',
    servicePlaceholder: 'Ejemplo: corte + retoque de tinte',
    clientLabel: 'Cliente',
    clientPlaceholder: 'Nombre del cliente (opcional)',
    durationLabel: 'Duracion',
    notesLabel: 'Notas',
    notesPlaceholder: 'Resultado, formula, incidente o siguiente paso',
    consumablesLabel: 'Consumibles usados',
    customConsumableLabel: 'Agregar consumible',
    customConsumablePlaceholder: 'Ejemplo: toner 7.1',
    addConsumable: 'Agregar',
    saveEntry: 'Guardar captura',
    recentEntriesTitle: 'Flujo del turno',
    recentEntriesSubtitle: 'Vista rapida de lo capturado para la jornada seleccionada.',
    recentEntriesEmpty: 'Todavia no hay capturas para esta jornada.',
    tabletModeTitle: 'Flujo listo para tablet',
    tabletModeSubtitle: 'Captura compacta para equipos de servicio.',
    savedOnDevice: 'Se guarda localmente en este dispositivo para uso rapido en salon.',
    durationUnit: 'min',
    profileCreated: 'Perfil creado y listo para usarse.',
    profileExists: 'Ese email ya existe en el area. Se selecciono el perfil existente.',
    entryCreated: 'Captura guardada para la jornada seleccionada.',
    validationProfileRequired: 'Nombre y email son obligatorios para crear un perfil.',
    validationProfileFirst: 'Crea o selecciona un perfil antes de guardar un servicio.',
    validationServiceRequired: 'Escribe un servicio o tarea antes de guardar.',
  },
};

export function getOperationsAreas(language: LanguageCode): JldOperationsArea[] {
  return OPERATIONS_BY_LANGUAGE[language];
}

export function getOperationsArea(language: LanguageCode, slug: string): JldOperationsArea | null {
  return getOperationsAreas(language).find((item) => item.slug === slug) || null;
}

export function getOperationsWorkspaceCopy(language: LanguageCode): OperationsWorkspaceCopy {
  return OPERATIONS_WORKSPACE_COPY[language];
}
