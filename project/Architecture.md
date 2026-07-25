# Architecture

## Overview
This project follows a layered architecture designed for maintainability and testability.

## Layers

- **Routes**: Define API endpoints and routing logic.
- **Controllers**: Handle request/response interaction and delegate to services.
- **Services**: Implement business logic and orchestrate repository calls.
- **Repositories**: Encapsulate database operations.
- **Models**: Define data schema and validation.
- **Middleware**: Handle cross-cutting concerns like authentication and error handling.
- **Utils**: Shared helper functions.

## Flow
1. Client sends HTTP request.
2. Route resolves to controller.
3. Controller invokes service.
4. Service calls repository for data access.
5. Repository interacts with the database.
6. Response is returned through controller and middleware.
