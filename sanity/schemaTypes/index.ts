import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import homeSettings from './home'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, homeSettings],
}