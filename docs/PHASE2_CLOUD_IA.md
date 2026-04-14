# Phase 2 — Cloud IA (Location GPU)

## Objectif

Lancer une activité de **location de puissance GPU** sans posséder de matériel.
Le but est d'obtenir des utilisateurs payants et de générer du revenu **avant**
d'investir dans du hardware.

## 1. Louer un GPU

- Plateformes ciblées : **RunPod**, **Vast.ai** (optionnellement Lambda,
  Paperspace).
- Configuration minimale : 1 GPU + RAM + stockage persistant.
- Critères de sélection : coût horaire, disponibilité, région, bande passante.

## 2. Installer l'environnement

- Python + PyTorch + Jupyter Notebook.
- Utiliser un **template prêt à l'emploi** (Docker ou image disque) pour
  démarrer rapidement : `runpod/pytorch`, `vast/jupyter-pytorch`, etc.
- Préinstaller les bibliothèques courantes (transformers, diffusers, openai,
  anthropic, etc.).

## 3. Créer une offre

Exemples d'offres à proposer depuis neu-rix :

| Offre | Usage cible | Tarif vente |
|-------|-------------|-------------|
| **GPU Starter** (RTX 3090) | IA légère, chatbot, tests | 1,00 €/h |
| **GPU Creative** (RTX 4090) | Génération d'images, fine-tuning | 1,80 €/h |
| **GPU Pro** (A100 40Go) | Inference LLM, entraînement | 3,50 €/h |

## 4. Donner accès aux utilisateurs

- Lien **Jupyter Notebook** (token unique par session).
- Accès **SSH** optionnel pour les utilisateurs avancés.
- Interface web neu-rix qui encapsule l'expérience (pas de complexité).

## 5. Monétisation

- **Coût** (RunPod/Vast.ai) : ~0,50 €/h
- **Prix de vente** : 1,00 €/h et plus
- **Marge brute** : ~50 % sur le tier de base
- Facturation à l'heure via Stripe (plans définis dans `lib/stripe.js`).

## Cible

Obtenir des utilisateurs réels et générer un revenu récurrent **avant**
d'acheter du matériel. Le dashboard neu-rix affiche déjà l'état des
ressources compute (`pages/compute.js`) : Phase 2 branche ces ressources
sur de vraies plateformes tierces.

## Implémentation côté code

- `lib/gpuCatalog.js` — source de vérité des offres GPU (coût + marge).
- `pages/api/gpu/index.js` — endpoint public qui expose le catalogue.
- `pages/gpu-rental.js` — page marketing/offre pour les visiteurs.
- `lib/stripe.js` — plans `gpu_starter`, `gpu_creative`, `gpu_pro`
  pour la facturation à l'heure.
