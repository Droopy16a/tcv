export type EventCategory = "Stages" | "Événements" | "Tournois" | "Interclubs" | "Informations";

export interface CalendarEvent {
  id: string;
  title: string;
  category: EventCategory;
  dateString: string;
  description: string;
  sortOrder: number; // 1 for Sept, 12 for Aug
}

export const calendarEvents: CalendarEvent[] = [
  // --- INFORMATIONS ---
  { id: "info-1", title: "REPRISE DES ENTRAÎNEMENTS", category: "Informations", dateString: "14 SEPT 2026", description: "Reprise des entraînements la semaine du lundi 14 septembre 2026.", sortOrder: 1 },
  { id: "info-3", title: "JOURS FÉRIÉS (Pas d'entraînement)", category: "Informations", dateString: "Saison 2026-2027", description: "11 Nov 2026, 29 Mars 2027 (Pâques), 1er Mai 2027, 6 Mai 2027 (Ascension), 8 Mai 2027, 17 Mai 2027 (Pentecôte).", sortOrder: 1 },

  // --- ÉVÉNEMENTS ---
  { id: "evt-1", title: "JPO", category: "Événements", dateString: "06 SEPT", description: "Test et évaluation des niveaux.", sortOrder: 1 },
  { id: "evt-2", title: "OCTOBRE ROSE", category: "Événements", dateString: "10 OCT", description: "Mobilisation pour le dépistage du cancer du sein.", sortOrder: 2 },
  { id: "evt-3", title: "RASSEMBLEMENT", category: "Événements", dateString: "NOVEMBRE", description: "Événement mensuel de rassemblement.", sortOrder: 3 },
  { id: "evt-4", title: "TÉLÉTHON DOUBLE SURPRISE", category: "Événements", dateString: "DÉCEMBRE", description: "Animation double surprise pour le Téléthon.", sortOrder: 4 },
  { id: "evt-5", title: "RASSEMBLEMENT", category: "Événements", dateString: "JANVIER", description: "Événement mensuel de rassemblement.", sortOrder: 5 },
  { id: "evt-6", title: "DOUBLE FAMILLE", category: "Événements", dateString: "FÉVRIER", description: "Tournoi amical en double, en famille.", sortOrder: 6 },
  { id: "evt-7", title: "JOURNÉE DE LA FEMME", category: "Événements", dateString: "MARS", description: "Célébration et animations dédiées.", sortOrder: 7 },
  { id: "evt-8", title: "RASSEMBLEMENT", category: "Événements", dateString: "AVRIL", description: "Événement mensuel de rassemblement.", sortOrder: 8 },
  { id: "evt-9", title: "FÊTE DU CLUB", category: "Événements", dateString: "13 JUIN", description: "Grande fête annuelle du Tennis Club de Vernouillet.", sortOrder: 10 },
  { id: "evt-10", title: "FÊTE DE L'ÉCOLE DE TENNIS", category: "Événements", dateString: "16 JUIN", description: "Clôture de la saison pour l'école de tennis.", sortOrder: 10 },

  // --- STAGES ---
  { id: "stg-1", title: "STAGES TOUSSAINT", category: "Stages", dateString: "19-23 OCT & 26-30 OCT", description: "Du lundi 19 au vendredi 23 Octobre / Du lundi 26 au vendredi 30 Octobre.", sortOrder: 2 },
  { id: "stg-2", title: "STAGE D'HIVER", category: "Stages", dateString: "15-19 FÉV", description: "Du lundi 15 au vendredi 19 Février.", sortOrder: 6 },
  { id: "stg-3", title: "STAGES DE PRINTEMPS", category: "Stages", dateString: "12-16 AVRIL & 19-23 AVRIL", description: "Stages intensifs pour les vacances de Printemps.", sortOrder: 8 },
  { id: "stg-4", title: "STAGE D'ÉTÉ", category: "Stages", dateString: "JUIN - JUILLET", description: "Du 28 Juin au 02 Juillet / Du 05 au 10 Juillet / Du 12 au 16 Juillet.", sortOrder: 10 },

  // --- TOURNOIS ---
  { id: "trn-1", title: "DOUBLE SURPRISE", category: "Tournois", dateString: "DÉCEMBRE", description: "Tournoi convivial en double.", sortOrder: 4 },
  { id: "trn-2", title: "TMC NOËL", category: "Tournois", dateString: "20-22 DÉC & 28-30 DÉC", description: "11-12 ans Garçon (NC 30/2) | 13-14 ans Garçon (30/1 15/4).", sortOrder: 4 },
  { id: "trn-3", title: "TOURNOI D'HIVER OPEN JEUNES", category: "Tournois", dateString: "19-28 FÉV", description: "Tournoi Open d'Hiver pour les catégories jeunes.", sortOrder: 6 },
  { id: "trn-4", title: "TOURNOI DE PRINTEMPS OPEN ADULTES", category: "Tournois", dateString: "26 MAI - 13 JUIN", description: "Tournoi Open Adulte de Printemps.", sortOrder: 9 },
  { id: "trn-5", title: "TMC ORANGE MIXTE", category: "Tournois", dateString: "02 JUIN", description: "Tournoi Multi-Chances niveau Orange.", sortOrder: 10 },
  { id: "trn-6", title: "TMC VERT MIXTE", category: "Tournois", dateString: "09 JUIN", description: "Tournoi Multi-Chances niveau Vert.", sortOrder: 10 },
  { id: "trn-7", title: "TMC D'ÉTÉ 13-14 ANS", category: "Tournois", dateString: "21-24 JUIN", description: "Tournoi Multi-Chances estival pour les 13-14 ans.", sortOrder: 10 },
  { id: "trn-8", title: "TMC D'ÉTÉ 11-12 ANS", category: "Tournois", dateString: "26-27 JUIN", description: "Tournoi Multi-Chances estival pour les 11-12 ans.", sortOrder: 10 },
  { id: "trn-9", title: "TMC RENTRÉE", category: "Tournois", dateString: "AOÛT", description: "Du 23 au 26 Août et du 26 au 29 Août.", sortOrder: 12 },

  // --- INTERCLUBS ---
  { id: "int-1", title: "SENIORS +45", category: "Interclubs", dateString: "OCTOBRE - NOVEMBRE", description: "Championnat interclubs.", sortOrder: 2 },
  { id: "int-2", title: "12 ANS ET MOINS", category: "Interclubs", dateString: "NOVEMBRE - DÉCEMBRE", description: "Championnat interclubs.", sortOrder: 3 },
  { id: "int-3", title: "SENIORS +35", category: "Interclubs", dateString: "JANVIER - AVRIL", description: "Championnat interclubs.", sortOrder: 5 },
  { id: "int-4", title: "GALAXIE TENNIS 7-10 ANS", category: "Interclubs", dateString: "MARS - MAI", description: "Championnat interclubs pour les plus jeunes.", sortOrder: 7 },
  { id: "int-5", title: "JEUNES 11-18 ANS", category: "Interclubs", dateString: "MARS - MAI", description: "Championnat interclubs.", sortOrder: 7 },
  { id: "int-6", title: "SENIORS", category: "Interclubs", dateString: "MAI - JUIN", description: "Championnat interclubs équipe première et réserves.", sortOrder: 9 },

  // --- INFORMATIONS (Suite) ---
  { id: "info-2", title: "FIN DES ENTRAÎNEMENTS", category: "Informations", dateString: "24 MAI 2027", description: "Fin des entraînements la semaine du 24 mai 2027.", sortOrder: 9 },
];
