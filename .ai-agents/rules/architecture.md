# Clean Architecture Guidelines

## INTENT
To maintain clean architectural boundaries by separating concerns between AI/LLM components for natural-language understanding and deterministic code for side-effectful and rule-based work, ensuring optimal performance and maintainability.

## PRINCIPLES
- **Separation of Concerns**: AI for semantic operations, deterministic code for business logic
- **Performance Optimization**: Use appropriate tools for each type of operation
- **Maintainability**: Clear boundaries between different system components
- **Testability**: Deterministic components are easily testable

## ARCHITECTURAL BOUNDARIES

### AI/LLM Layer (Semantic Operations)
**Purpose**: Natural language understanding, content generation, semantic analysis

**Use Cases**:
- Text classification and sentiment analysis
- Content generation and summarization
- Natural language query processing
- Semantic search and matching
- Intent recognition and extraction

**Examples**:
```typescript
// Good: Use AI for semantic operations
const intent = await classifyUserIntent(userMessage);
const summary = await generateSummary(longText);
const sentiment = await analyzeSentiment(feedback);
```

### Deterministic Layer (Business Logic)
**Purpose**: Rule-based operations, data processing, system integrations

**Use Cases**:
- Database operations and data persistence
- API integrations and external service calls
- Business rule enforcement
- Data validation and transformation
- System orchestration and workflow management

**Examples**:
```typescript
// Good: Use deterministic code for business logic
const user = await userService.findById(userId);
const isValid = validateEmailFormat(email);
const result = await paymentService.processPayment(amount);
```

## INTEGRATION PATTERNS

### Token Management
**Pattern**: Centralized credential storage with service-specific access

```typescript
// Generic token management pattern
interface TokenService {
  saveTokens(serviceId: string, tokens: TokenData): Promise<void>;
  getTokens(serviceId: string): Promise<TokenData>;
  refreshTokens(serviceId: string): Promise<TokenData>;
}

// Service-specific implementations
class EmailTokenService extends TokenService {
  async saveEmailTokens(tokens: EmailTokens) {
    return this.saveTokens('email', tokens);
  }
}
```

### Service Architecture
**Pattern**: Service layer with clear interfaces and dependency injection

```typescript
// Generic service pattern
interface ServiceBase<T> {
  create(data: T): Promise<T>;
  findById(id: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// Specific service implementations
class UserService implements ServiceBase<User> {
  constructor(
    private database: DatabaseService,
    private logger: LoggerService
  ) {}
  
  async create(userData: User): Promise<User> {
    // Implementation with proper error handling
  }
}
```

## MULTI-TENANT ARCHITECTURE

### Tenant Isolation
**Pattern**: Context-aware services with tenant-specific data isolation

```typescript
// Tenant context pattern
interface TenantContext {
  tenantId: string;
  permissions: Permission[];
  metadata: Record<string, any>;
}

// Tenant-aware service base
abstract class TenantAwareService {
  constructor(protected context: TenantContext) {}
  
  protected validateTenantAccess(resourceId: string): boolean {
    // Implement tenant-specific access validation
  }
}
```

### Data Isolation Patterns
**Strategies for maintaining data separation**:

1. **Database Level**: Separate databases per tenant
2. **Schema Level**: Separate schemas with tenant prefix
3. **Row Level**: Tenant ID in every table with RLS policies
4. **Application Level**: Service-layer filtering

```typescript
// Row-level security pattern
class TenantAwareRepository<T> {
  async findByTenant(tenantId: string, filters: any): Promise<T[]> {
    return this.database.query(`
      SELECT * FROM ${this.tableName} 
      WHERE tenant_id = $1 AND ${this.buildFilters(filters)}
    `, [tenantId]);
  }
}
```

### Multi-Tenant Services
**Pattern**: Services that handle multiple tenants with proper isolation

```typescript
// Multi-tenant service pattern
class MultiTenantEmailService {
  async processEmailsForTenant(tenantId: string): Promise<void> {
    const tenantConfig = await this.getTenantConfig(tenantId);
    const emails = await this.getEmailsForTenant(tenantId);
    
    for (const email of emails) {
      await this.processEmail(email, tenantConfig);
    }
  }
  
  private async getTenantConfig(tenantId: string): Promise<TenantConfig> {
    // Retrieve tenant-specific configuration
  }
}
```

## ERROR HANDLING PATTERNS

### Structured Error Handling
**Pattern**: Consistent error types and handling across services

```typescript
// Error hierarchy
abstract class AppError extends Error {
  abstract statusCode: number;
  abstract isOperational: boolean;
}

class ValidationError extends AppError {
  statusCode = 400;
  isOperational = true;
}

class NotFoundError extends AppError {
  statusCode = 404;
  isOperational = true;
}

// Service error handling
class ServiceBase {
  protected handleError(error: unknown): never {
    if (error instanceof AppError) {
      throw error;
    }
    
    // Log unexpected errors
    this.logger.error('Unexpected error', error);
    throw new InternalServerError('An unexpected error occurred');
  }
}
```

## TESTING PATTERNS

### Service Testing
**Pattern**: Unit tests for business logic, integration tests for external dependencies

```typescript
// Unit test pattern
describe('UserService', () => {
  let userService: UserService;
  let mockDatabase: jest.Mocked<DatabaseService>;
  
  beforeEach(() => {
    mockDatabase = createMockDatabase();
    userService = new UserService(mockDatabase, mockLogger);
  });
  
  it('should create user with valid data', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    mockDatabase.create.mockResolvedValue(userData);
    
    const result = await userService.create(userData);
    
    expect(result).toEqual(userData);
    expect(mockDatabase.create).toHaveBeenCalledWith(userData);
  });
});
```

### Integration Testing
**Pattern**: Test service interactions with real or containerized dependencies

```typescript
// Integration test pattern
describe('EmailService Integration', () => {
  let emailService: EmailService;
  let testDatabase: TestDatabase;
  
  beforeAll(async () => {
    testDatabase = await setupTestDatabase();
    emailService = new EmailService(testDatabase);
  });
  
  afterAll(async () => {
    await testDatabase.cleanup();
  });
  
  it('should process email workflow end-to-end', async () => {
    // Test complete workflow with real database
  });
});
```

## PERFORMANCE CONSIDERATIONS

### Caching Strategies
**Pattern**: Multi-level caching with appropriate TTL and invalidation

```typescript
// Caching service pattern
class CacheService {
  private memoryCache = new Map();
  private redisCache: RedisClient;
  
  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // Try Redis cache
    const cached = await this.redisCache.get(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      this.memoryCache.set(key, parsed);
      return parsed;
    }
    
    return null;
  }
}
```

### Database Optimization
**Pattern**: Efficient queries with proper indexing and connection pooling

```typescript
// Database service pattern
class DatabaseService {
  private pool: ConnectionPool;
  
  async query<T>(sql: string, params: any[]): Promise<T[]> {
    const startTime = Date.now();
    
    try {
      const result = await this.pool.query(sql, params);
      this.logQueryPerformance(sql, Date.now() - startTime);
      return result.rows;
    } catch (error) {
      this.logQueryError(sql, error);
      throw error;
    }
  }
  
  private logQueryPerformance(sql: string, duration: number): void {
    if (duration > 1000) { // Log slow queries
      this.logger.warn('Slow query detected', { sql, duration });
    }
  }
}
```

## SECURITY PATTERNS

### Authentication and Authorization
**Pattern**: JWT-based authentication with role-based access control

```typescript
// Auth service pattern
class AuthService {
  async authenticate(token: string): Promise<UserContext> {
    try {
      const payload = jwt.verify(token, this.jwtSecret);
      const user = await this.userService.findById(payload.userId);
      
      return {
        userId: user.id,
        tenantId: user.tenantId,
        roles: user.roles,
        permissions: await this.getPermissions(user.roles)
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid token');
    }
  }
  
  async authorize(context: UserContext, resource: string, action: string): Promise<boolean> {
    return context.permissions.some(p => 
      p.resource === resource && p.actions.includes(action)
    );
  }
}
```

### Input Validation
**Pattern**: Schema-based validation with sanitization

```typescript
// Validation service pattern
class ValidationService {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }
  
  static validateSchema<T>(data: unknown, schema: Schema<T>): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError('Invalid input', result.error);
    }
    return result.data;
  }
}
```

## MONITORING AND OBSERVABILITY

### Logging Pattern
**Pattern**: Structured logging with correlation IDs

```typescript
// Logger service pattern
class LoggerService {
  log(level: LogLevel, message: string, context?: Record<string, any>): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      correlationId: this.getCorrelationId(),
      ...context
    };
    
    console.log(JSON.stringify(logEntry));
  }
  
  private getCorrelationId(): string {
    // Get from async context or generate new one
    return AsyncLocalStorage.getStore()?.correlationId || generateId();
  }
}
```

### Metrics Collection
**Pattern**: Application metrics with business and technical indicators

```typescript
// Metrics service pattern
class MetricsService {
  private counters = new Map<string, number>();
  private histograms = new Map<string, number[]>();
  
  incrementCounter(name: string, tags?: Record<string, string>): void {
    const key = this.buildKey(name, tags);
    this.counters.set(key, (this.counters.get(key) || 0) + 1);
  }
  
  recordDuration(name: string, duration: number, tags?: Record<string, string>): void {
    const key = this.buildKey(name, tags);
    const values = this.histograms.get(key) || [];
    values.push(duration);
    this.histograms.set(key, values);
  }
}
```