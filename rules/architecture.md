# Architecture

## Core Principle
Maintain clean architectural boundaries by using BAML (or other LLM frameworks) for natural-language understanding and TypeScript/JavaScript for deterministic work.

## Key Architectural Boundaries

### LLM Layer (BAML)
- **Purpose**: Handle all natural language understanding and generation
- **Responsibilities**:
  - Intent detection
  - Entity extraction
  - Context understanding
  - Natural language generation
  - Reasoning under uncertainty
- **Implementation**: BAML models and prompts

### Application Layer (TypeScript/JavaScript)
- **Purpose**: Handle all deterministic logic and external integrations
- **Responsibilities**:
  - API integrations
  - Database operations
  - Business logic
  - Validation
  - Orchestration
- **Implementation**: TypeScript/JavaScript modules

### Interface Layer
- **Purpose**: Connect LLM and Application layers
- **Responsibilities**:
  - Type-safe data passing
  - Error handling
  - Logging
  - Metrics
- **Implementation**: Generated clients and TypeScript interfaces

## Architecture Principles

### Separation of Concerns
- LLM code should not contain business logic
- Application code should not attempt natural language understanding
- Each component should have a single responsibility

### Type Safety
- Use strong typing between all layers
- Define clear interfaces for all components
- Validate data at boundary crossings

### Testability
- Each component should be independently testable
- Mock dependencies for unit tests
- Use integration tests for boundary crossing
- Implement end-to-end tests for complete flows

### Observability
- Log all significant events
- Track metrics for performance and usage
- Implement tracing across component boundaries
- Provide debugging tools for each layer

## Implementation Guidelines

### BAML Implementation
- Organize BAML files by domain/feature
- Use consistent naming conventions
- Document prompt design decisions
- Implement comprehensive test cases

### TypeScript Implementation
- Follow object-oriented or functional paradigms consistently
- Use dependency injection for testability
- Implement error handling at all levels
- Document public APIs and interfaces

### Integration Points
- Use generated clients for type safety
- Implement retry logic for resilience
- Handle errors gracefully at boundaries
- Log context across boundaries for traceability