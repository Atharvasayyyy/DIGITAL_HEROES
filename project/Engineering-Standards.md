# Engineering Standards

## Coding Style
- Use consistent camelCase naming.
- Keep functions small and focused.
- Prefer descriptive names over abbreviations.
- Avoid magic numbers and hard-coded values.

## Folder Conventions
- `routes/` for Express route definitions.
- `controllers/` for request handling.
- `services/` for business logic.
- `repositories/` for database access.
- `models/` for data schemas.
- `middleware/` for cross-cutting concerns.
- `utils/` for shared helpers.

## API Standards
- Use RESTful endpoints.
- Return consistent JSON error responses.
- Keep controllers thin; delegate to services.

## Testing Policy
- Add unit tests for services and utils.
- Add integration tests for API endpoints.
- Run tests in CI on every pull request.

## Definition of Done
- Code compiles and tests pass.
- Linting and formatting are applied.
- Documentation is updated.
- No sensitive data in the repository.

## PR Checklist
- [ ] Code reviewed by at least one teammate.
- [ ] Tests added for new features.
- [ ] No TODO comments left behind.
- [ ] Documentation updated.

## Branch Strategy
- `main` for production-ready code.
- `develop` for feature integration.
- feature branches for new work.

## Security Checklist
- Use environment variables for secrets.
- Validate and sanitize all inputs.
- Hash passwords and protect tokens.
- Use secure HTTP headers.

## Accessibility
- Use semantic HTML.
- Ensure keyboard navigability.
- Add visible focus indicators.
- Use sufficient color contrast.

## Performance
- Minimize bundle size.
- Use lazy loading where appropriate.
- Avoid unnecessary re-renders.

## Logging
- Log errors with context.
- Do not expose stack traces in production.

## Monitoring
- Add health endpoints.
- Document how to verify service status.

## Release Policy
- Tag releases semantically.
- Use automated deployment when possible.
- Roll back to the last known good version on failure.
