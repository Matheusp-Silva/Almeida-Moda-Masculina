import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produtos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do Produto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Preço (R$)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sizes",
      title: "Tamanhos Disponíveis",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "P", value: "P" },
          { title: "M", value: "M" },
          { title: "G", value: "G" },
          { title: "GG", value: "GG" },
          { title: "XG", value: "XG" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Camiseta Casual", value: "casual" },
          { title: "Camisetas de Times", value: "time" },
          { title: "Oversize", value: "oversize" },
          { title: "Shorts", value: "shorts" },
          { title: "Cuecas", value: "cuecas" },
          { title: "Relógios", value: "relogios" },
          { title: "Meias", value: "meias" },
          { title: "Carteira", value: "carteira" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Foto do Produto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
    }),
    
  ],
});
