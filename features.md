# Features

## Fonctionnalités existantes

### Navigation et structure
- Sidebar de navigation vers : Tableau de bord, Patients, Rendez-vous, Statistiques, Psychologues, Paramètres.
- Layout de tableau de bord avec structure principale et navigation.
- TopBar réutilisable avec titre et sous-titre par page.

### Tableau de bord
- Vue d'ensemble du cabinet avec message de bienvenue.
- Cartes de statistiques clés : patients actifs, séances du mois, taux de présence, durée moyenne de séance.
- Liste des rendez-vous du jour avec état (Confirmé, En attente, Annulé).
- Actions de navigation rapides vers le planning.

### Patients
- Page de gestion des patients.
- Filtres visuels par statut : Tous, Actifs, Suspendus, Clôturés.
- Boutons : Filtrer, Exporter, Nouveau patient.
- Tableau de patients avec colonnes : patient, âge, contact, psychologue, type de suivi, dernière séance, prochaine séance, nombre de séances, statut.
- Badges de statut et pagination fictive.

### Rendez-vous
- Vue agenda/semaine avec créneaux horaires et rendez-vous positionnés.
- Semaine affichée avec navigation de date (précédent/suivant).
- Bouton Ajouter RDV.
- Panneau latéral avec statistiques de la semaine et prochains rendez-vous.

### Statistiques
- Sélecteur de période (7 jours, 30 jours, 3 mois, 6 mois, 1 an).
- KPI de performance : fidélisation, satisfaction, délai moyen RDV, absentéisme.
- Graphiques simples simulés : évolutions des séances et croissance des patients.
- Tableau de performance des psychologues avec nombre de séances, patients, satisfaction et charge.

### Psychologues
- Liste des psychologues du cabinet.
- Cartes de profil avec spécialité, expérience, nombre de patients, séances, statut.
- Actions sur chaque carte : Voir profil, Planning.

### Paramètres
- Sections de configuration : Profil du cabinet, Horaires d'ouverture, Notifications.
- Champs éditables : nom du cabinet, adresse, téléphone, email.
- Toggles visuels pour rappels et rapports.
- Bouton Enregistrer pour chaque section.

## Contexte et limitations techniques
- Données complètement statiques dans le code.
- Le projet est une application Next.js avec un front-end stylisé, sans backend connecté.
- Pas de pages de détail, pas de gestion de sessions utilisateur, pas d’API.
- Pas de validation ou d’interactions de formulaire réelles.

## Architecture proposée
- Base de données : PostgreSQL.
- ORM / modèle : Prisma pour gérer le schéma, les migrations et l’accès aux données.
- Backend/API : route handlers Next.js (`app/api/*/route.ts`) ou un dossier `src/server/` selon le besoin.
- Authentification : JWT ou session + gestion de rôles (`admin`, `psychologue`, `secretaire`).
- Tables principales : `users`, `patients`, `psychologists`, `appointments`, `notes`, `settings`.
- Données dynamiques : clients, rendez-vous, historiques, statistiques et configuration du cabinet.

## Fonctionnalités à ajouter pour ce contexte

### Gestion patient améliorée
- Page de profil patient détaillée avec historique des séances, notes, documents et plans de traitement.
- Créer / modifier / supprimer un patient.
- Recherche globale de patients.
- Filtrage avancé par psychologue, type de suivi, statut, date de dernière séance.
- Téléchargement / export PDF des dossiers patients.

### Gestion des rendez-vous
- Création de rendez-vous dynamique via formulaire.
- Modification / annulation / reprogrammation de rendez-vous.
- Drag & drop dans le planning hebdomadaire.
- Gestion des rendez-vous récurrents et disponibilité des psychologues.
- Intégration calendrier externe (Google Calendar, Outlook).
- Affichage des rendez-vous par psychologue.

### Psychologues et ressources
- Page profil psychologue avec bio, spécialités, disponibilités et planning.
- Gestion des membres de l’équipe : ajout, édition, rôles, disponibilités.
- Filtrer les psychologues par spécialité ou statut.
- Attribution automatique des patients à un psychologue.

### Notifications et rappels
- Envoi de rappels par email / SMS avant les rendez-vous.
- Notifications pour absence patient, confirmations et relances.
- Campagnes de communication automatiques (nouveau patient, réflexion après séance).

### Analyse et reporting
- Dashboards métiers avec revenus, revenus par psychologue, facturation.
- Taux d’occupation des créneaux, taux de no-show, taux de conversion.
- Rapports par période exportables en PDF/CSV.
- Suivi de satisfaction patient, feedback et score NPS.

### Sécurité et accès
- Authentification / connexion sécurisée.
- Gestion des rôles : administrateur, psychologue, secrétaire.
- Permissions sur l’accès aux données patients et paramétrages.

### Expérience utilisateur
- Systeme de recherche globale dans l’application.
- Dashboard personnalisable (widgets, affichage choisi).
- Thème sombre / clair.
- Internationalisation (FR/EN) et format localisé.
- Mode mobile responsive avancé avec navigation adaptée.

### Données et intégrations
- Backend API + base de données (PostgreSQL, Supabase, Firebase, etc.).
- Import/Export de données patients et RDV.
- Intégrations de paiement, facturation, téléconsultation, messagerie sécurisée.
- Synchronisation multi-cabinets ou multi-praticiens.

## Recommandations prioritaires
1. Ajouter un backend/API pour rendre le contenu dynamique.
2. Implémenter la gestion complète des patients et des rendez-vous.
3. Ajouter l’authentification et les rôles.
4. Ajouter la recherche/filtrage et l’export des données.
5. Enrichir les statistiques avec des rapports réels basés sur les données.
