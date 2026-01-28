### INVESTT AI SYSTEM (v1)

    This directory contains Version 1 of the Investt AI system — a set of modular, governed AI models designed to increase financial literacy while keeping the platform safe, ethical, and teen-friendly.

    All AI components are built with education, safety, and explainability as first-class priorities.

## Open Source & Community First

    Investt AI is fully open source.

    Why Open Source?

    To help small builders and student developers
    To make responsible AI patterns easy to learn and reuse
    To encourage transparency in AI systems used in sensitive domains
    To allow others to fork, adapt, and improve these models

    Every version of Investt AI is published openly so others can:

    Learn from the architecture
    Build safer AI products
    Avoid common design mistakes in AI systems
    Investt is not just a product — it is a learning resource.

## Investt currently uses three core AI subsystems, each solving a distinct problem.

## AI Chatbot (/ai/chatbot)

    The AI Chatbot is an educational assistant designed to explain financial concepts, not to advise users on investments.

    Key Responsibilities

    Answers finance-related questions in a clear, neutral, educational manner
    Detects the context of user doubts:
    General finance questions
    Course-related help
    Simulation explanations
    Quiz reviews

    Identifies and handles:

    Off-topic questions
    Sensitive prompts
    Attempts to seek financial advice
    Safety Guarantees
    Explicit refusal of investment advice
    Redirection to conceptual learning
    Assumes users may be minors

    The chatbot teaches why things work, never what to buy.

## Moderation AI (/ai/moderation)

    The Moderation AI is the primary safety layer of Investt.

    What It Does

    Detects and removes:

        Financial advice posts
        Scams and misleading content
        Policy-violating discussions
        Explains why content was removed
        Operates before content becomes publicly visible
        Human-in-the-Loop
        High-risk cases are escalated to admins
        Repeated violations can lead to bans
        AI never has final authority

    This keeps moderation transparent and accountable.

## Feed Setting AI (/ai/feed)

    The Feed Setting AI controls content ranking in a way that supports learning, not addiction.

    Why This Matters

    Most platforms optimize for engagement.
    Investt optimizes for understanding.

    Design Principles

    Educational value over virality
    Fair exposure for creators
    No outrage or clickbait amplification
    No dark patterns

    This system creates an effortless but meaningful learning experience.

## Versioning & Iteration

    This repository contains V1 of the Investt AI system.
    Models are intentionally conservative
    Safety and correctness come first
    Each version improves incrementally
    Future versions may include:
    Better semantic understanding
    Improved ranking signals
    More explainability tools
    Progress is iterative, not rushed.

## Mission
    LET’S INCREASE FINANCIAL LITERACY

    Investt AI exists to:
        Educate users
        Protect minors
        Promote ethical AI design
        Help the next generation of builders

# Disclaimer

    Investt provides educational content only
    No financial or investment advice is given
    These are early versions (V1) and will continue to evolve
    Open-source contributions are welcome