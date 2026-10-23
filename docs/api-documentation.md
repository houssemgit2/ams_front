# Documentation des API REST

Ce document recense les requêtes HTTP visibles dans le frontend Angular. Les types TypeScript décrivent les attentes du client, mais ne valident pas le contenu réellement renvoyé par le serveur. Aucun paramètre de requête n'est construit dans les appels examinés.

## Résumé des endpoints

Les endpoints fournisseurs utilisent `environment.urlApi`, défini à `http://localhost:8081` dans les deux fichiers d'environnement. L'endpoint d'authentification utilise `environment.authUrl`, défini à `http://localhost:8081/api/auth` dans l'environnement de développement.

| Méthode  | Endpoint                                | Rôle                                | Service / consommateur                                          |
| -------- | --------------------------------------- | ----------------------------------- | --------------------------------------------------------------- |
| `POST`   | `http://localhost:8081/api/auth/signin` | Authentifier un utilisateur         | `Authentication.authenticate` / `Login.checkLogin`              |
| `GET`    | `http://localhost:8081/providers/`      | Lister les fournisseurs             | `ProviderService.getProviders` / `ProvidersList.loadProviders`  |
| `POST`   | `http://localhost:8081/providers/`      | Créer un fournisseur                | `ProviderService.saveProvider` / `AddProvider.onSubmit`         |
| `DELETE` | `http://localhost:8081/providers/{id}`  | Supprimer un fournisseur            | `ProviderService.deleteProvider` / `ProvidersList.onDelete`     |
| `GET`    | `http://localhost:8081/providers/{id}`  | Lire un fournisseur par identifiant | `ProviderService.getProviderById` / aucun consommateur trouvé   |
| `PUT`    | `http://localhost:8081/providers/{id}`  | Mettre à jour un fournisseur        | `ProviderService.updateProvider` / `ProvidersList.handleUpdate` |

`{id}` est un paramètre de chemin numérique. Aucun endpoint `PATCH` n'a été trouvé.

## Détail des API

### Authentification

- **Méthode et endpoint :** `POST http://localhost:8081/api/auth/signin`
- **Service et consommateur :** [`Authentication.authenticate`](../src/app/services/authentication.ts), appelé par [`Login.checkLogin`](../src/app/pages/login/login.ts).
- **Entrée :** objet JSON construit par le service :

  ```json
  {
    "username": "<valeur saisie>",
    "password": "<valeur saisie>"
  }
  ```

  Le composant de connexion expose ces deux valeurs comme chaînes.

- **Réponse utilisée côté frontend :** le type HTTP est `any`, sans interface dédiée. Le service lit `accessToken`, `email`, `username` et `roles`, enregistre ces valeurs dans `sessionStorage` (le rôle sous forme de JSON), puis renvoie l'objet reçu. La forme complète de la réponse est **Non déterminé à partir du code frontend**.
- **Erreurs :** `Login.checkLogin` positionne `invalidLogin` à `true` si l'observable échoue. L'intercepteur journalise le statut `401`, puis retransmet l'erreur. Le composant ne distingue pas les autres statuts.
- **Authentification :** l'intercepteur peut ajouter `Authorization: Bearer <token>` si un token est déjà présent en session. Le code n'exclut pas la requête de connexion de cet ajout.

### Lister les fournisseurs

- **Méthode et endpoint :** `GET http://localhost:8081/providers/`
- **Service et consommateur :** [`ProviderService.getProviders`](../src/app/services/providerService.ts), appelé au chargement par [`ProvidersList.loadProviders`](../src/app/pages/providers-list/providers-list.ts).
- **Entrée :** aucun corps ni paramètre de requête construit dans le frontend.
- **Réponse utilisée côté frontend :** `Observable<Provider[]>`, où [`Provider`](../src/models.ts) contient `id: number`, `name: string`, `logo: string`, `email: string` et `address: string`. `ProvidersList` remplace sa liste avec les données reçues. Ce type est une déclaration cliente, pas une validation de la réponse du serveur.
- **Erreurs :** le consommateur transmet l'erreur à `console.error`. L'intercepteur relance aussi les erreurs après son traitement éventuel du statut `401`.
- **Authentification :** en-tête Bearer ajouté par l'intercepteur si un token est présent.

### Créer un fournisseur

- **Méthode et endpoint :** `POST http://localhost:8081/providers/`
- **Service et consommateur :** [`ProviderService.saveProvider`](../src/app/services/providerService.ts), appelé par [`AddProvider.onSubmit`](../src/app/pages/add-provider/add-provider.ts).
- **Entrée :** le composant envoie un objet `FormData` contenant les champs `imageFile` (fichier sélectionné), `name`, `email` et `address`. Le service ne construit pas lui-même les champs et déclare son paramètre comme `any`. Aucun paramètre de requête n'est construit.
- **Réponse utilisée côté frontend :** le service déclare `Observable<Provider>`, mais le consommateur ne lit pas les propriétés de la réponse; il la journalise puis navigue vers la liste. La réponse effective est **Non déterminé à partir du code frontend**.
- **Erreurs :** le composant journalise l'erreur dans la console; aucun message d'erreur utilisateur n'est défini dans ce chemin. L'intercepteur retransmet l'erreur après son traitement éventuel du statut `401`.
- **Authentification :** en-tête Bearer ajouté par l'intercepteur si un token est présent. Le code du service ne définit pas manuellement d'en-tête `Content-Type`.

### Supprimer un fournisseur

- **Méthode et endpoint :** `DELETE http://localhost:8081/providers/{id}`
- **Service et consommateur :** [`ProviderService.deleteProvider`](../src/app/services/providerService.ts), appelé par [`ProvidersList.onDelete`](../src/app/pages/providers-list/providers-list.ts) depuis l'action de suppression de la liste.
- **Entrée :** `id: number`, interpolé dans le chemin. Aucun corps ni paramètre de requête n'est construit. Le composant demande une confirmation avant l'appel.
- **Réponse utilisée côté frontend :** le service déclare `Observable<void>`; le consommateur ignore le contenu de la réponse et retire l'élément localement après succès. Le statut HTTP et l'existence éventuelle d'un corps sont **Non déterminé à partir du code frontend**.
- **Erreurs :** le consommateur transmet l'erreur à `console.error`; l'intercepteur retransmet aussi les erreurs après son traitement éventuel du statut `401`.
- **Authentification :** en-tête Bearer ajouté par l'intercepteur si un token est présent.

### Lire un fournisseur par identifiant

- **Méthode et endpoint :** `GET http://localhost:8081/providers/{id}`
- **Service et consommateur :** [`ProviderService.getProviderById`](../src/app/services/providerService.ts). Aucun appel à cette méthode depuis un composant ou une autre partie du code n'a été trouvé.
- **Entrée :** `id: number`, interpolé dans le chemin. Aucun corps ni paramètre de requête n'est construit.
- **Réponse utilisée côté frontend :** le service déclare `Observable<Provider>`, avec le modèle [`Provider`](../src/models.ts). Il n'existe pas de consommateur dans le code recherché pour confirmer la structure attendue à l'exécution. La réponse réelle est **Non déterminé à partir du code frontend**.
- **Erreurs :** aucun traitement d'erreur propre à cette méthode n'est visible; les erreurs passent par l'intercepteur et sont retransmises à l'abonné éventuel.
- **Authentification :** en-tête Bearer ajouté par l'intercepteur si un token est présent.

### Mettre à jour un fournisseur

- **Méthode et endpoint :** `PUT http://localhost:8081/providers/{id}`
- **Service et consommateurs :** [`ProviderService.updateProvider`](../src/app/services/providerService.ts), appelé par [`ProvidersList.handleUpdate`](../src/app/pages/providers-list/providers-list.ts). Le composant reçoit l'objet depuis l'événement `update` de [`ProviderModal`](../src/app/components/provider-modal/provider-modal.ts).
- **Entrée :** l'identifiant `provider.id` est ajouté au chemin et l'objet `Provider` complet est envoyé comme corps. Les champs déclarés sont `id`, `name`, `logo`, `email` et `address`; le formulaire modal modifie `name`, `email` et `address` sur une copie de l'objet reçu. Aucun paramètre de requête n'est construit.
- **Réponse utilisée côté frontend :** `Observable<Provider>`. Le consommateur remplace dans la liste l'élément dont l'identifiant correspond à `res.id`, puis ferme la modale. Le format réel et la garantie que le serveur renvoie le fournisseur mis à jour sont **Non déterminé à partir du code frontend**.
- **Erreurs :** le consommateur transmet l'erreur à `console.error`; l'intercepteur retransmet aussi les erreurs après son traitement éventuel du statut `401`.
- **Authentification :** en-tête Bearer ajouté par l'intercepteur si un token est présent.

## Configuration et mécanismes transverses

- [`TokenInterceptor`](../src/app/services/token-interceptor.ts) est enregistré dans [`app.config.ts`](../src/app/app.config.ts) avec `HTTP_INTERCEPTORS` et `withInterceptorsFromDi()`.
- S'il trouve `token` dans `sessionStorage`, l'intercepteur ajoute `Authorization: Bearer <token>` à toutes les requêtes interceptées. En cas de statut `401`, il écrit un message dans la console, ne redirige pas automatiquement (la redirection est commentée), puis propage l'erreur.
- [`Authentication.authenticate`](../src/app/services/authentication.ts) importe directement `environment.development`. L'endpoint de connexion repose donc sur l'URL de cet environnement dans ce service. Les services fournisseurs importent `environment`; `angular.json` remplace ce fichier par `environment.development.ts` pour la configuration de développement.
- Les deux fichiers d'environnement définissent `urlApi` à `http://localhost:8081`. Seul `environment.development.ts` définit `authUrl`. L'URL réellement prévue pour un déploiement est **Non déterminé à partir du code frontend**; le service d'authentification pointe explicitement vers la configuration de développement.
- `Authentication.logOut()` ne fait pas d'appel HTTP et ne retire actuellement que `username`; il ne s'agit donc pas d'un endpoint de déconnexion visible dans le frontend.

## Fichiers analysés

- Services et intercepteur : [`authentication.ts`](../src/app/services/authentication.ts), [`providerService.ts`](../src/app/services/providerService.ts), [`token-interceptor.ts`](../src/app/services/token-interceptor.ts).
- Modèles et environnements : [`models.ts`](../src/models.ts), [`environment.ts`](../src/environments/environment.ts), [`environment.development.ts`](../src/environments/environment.development.ts).
- Configuration et routage : [`app.config.ts`](../src/app/app.config.ts), [`app.routes.ts`](../src/app/app.routes.ts), [`angular.json`](../angular.json).
- Consommateurs et formulaires : [`login.ts`](../src/app/pages/login/login.ts), [`login.html`](../src/app/pages/login/login.html), [`add-provider.ts`](../src/app/pages/add-provider/add-provider.ts), [`add-provider.html`](../src/app/pages/add-provider/add-provider.html), [`providers-list.ts`](../src/app/pages/providers-list/providers-list.ts), [`providers-list.html`](../src/app/pages/providers-list/providers-list.html), [`provider-modal.ts`](../src/app/components/provider-modal/provider-modal.ts), [`provider-modal.html`](../src/app/components/provider-modal/provider-modal.html).

## À vérifier côté backend

Six endpoints sont identifiés dans le frontend : `POST /api/auth/signin`, `GET /providers/`, `POST /providers/`, `DELETE /providers/{id}`, `GET /providers/{id}` et `PUT /providers/{id}`. Les points suivants ne peuvent pas être établis à partir du client seul :

- La disponibilité effective des routes, leurs préfixes, la sensibilité au slash final et les méthodes acceptées.
- Les codes de statut, les schémas exacts de réponse et les formats des erreurs.
- Le contrat de connexion, notamment les types et la présence de `accessToken`, `email`, `username` et `roles`.
- Les champs obligatoires, validations et règles métier du fournisseur; pour la création, le nom réel des champs multipart, la nécessité du fichier et la gestion de l'en-tête `Content-Type`.
- Si `PUT` exige le fournisseur complet ou accepte une mise à jour partielle, et quel corps renvoie la suppression.
- Les règles d'accès : le frontend ajoute parfois un Bearer token, mais seul le backend peut confirmer quels endpoints l'exigent et comment il le valide.
- L'URL de base à utiliser hors développement et l'existence d'un endpoint de déconnexion côté serveur.
