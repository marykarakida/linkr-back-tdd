import { createUserSchema } from '@/entities/user/userSchema';
import { SchemaMiddleware } from './schemaMiddleware';

const bodySchemas = { createUserSchema };
type BodySchemasTypes = keyof typeof bodySchemas;

const validateBody = new SchemaMiddleware<BodySchemasTypes>(bodySchemas);

export { validateBody };