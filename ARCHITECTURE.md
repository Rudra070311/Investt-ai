# Investt – System Architecture (V1)

## Overview

Investt uses a hybrid backend architecture optimized for scalability,
cost efficiency, and global read performance.

## Core Components

### Supabase (PostgreSQL)

- Primary source of truth
- User accounts, roles
- Financial simulations
- Portfolio & transaction history

### Firebase Firestore

- Read-optimized cache layer
- Market prices (near-real-time)
- Asset news feed
- Feed ranking outputs

### Background Jobs

- GitHub Actions cron
- Periodic market sync
- Writes to both Supabase and Firestore

## Design Rationale

- Avoids overloading relational DB with read-heavy workloads
- Reduces latency for global users
- Keeps free-tier usage viable in early stages
