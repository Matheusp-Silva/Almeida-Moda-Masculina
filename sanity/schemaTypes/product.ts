import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "product",
  title: "Produtos",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome do Produto",
      type: "string",
      validation: (Rule) => Rule.required().error("O nome do produto é obrigatório"),
    }),
    defineField({
      name: "price",
      title: "Preço (R$)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "sizes",
      title: "Tamanhos Disponíveis",
      description: "Selecione os tamanhos disponíveis para este produto",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          // Roupas
          { title: "P", value: "P" },
          { title: "M", value: "M" },
          { title: "G", value: "G" },
          { title: "GG", value: "GG" },
          { title: "XG", value: "XG" },
          { title: "G1", value: "G1" },
          // Calçados
          { title: "38", value: "38" },
          { title: "39", value: "39" },
          { title: "40", value: "40" },
          { title: "41", value: "41" },
          { title: "42", value: "42" },
          { title: "43", value: "43" },
          { title: "44", value: "44" },
          // Acessórios
          { title: "Único", value: "UNICO" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "category",
      title: "Categoria do Produto",
      description: "Isso define onde o produto aparecerá no menu do site",
      type: "string",
      options: {
        list: [
          // --- CALÇADOS ---
          { title: "Calçados: Tênis", value: "calcados-tenis" },
          { title: "Calçados: Casual", value: "calcados-casual" },
          { title: "Calçados: Skateboarding", value: "calcados-skateboarding" },

          // --- ROUPAS ---
          { title: "Roupas: Casual", value: "roupas-casual" },
          { title: "Roupas: Camisetas", value: "roupas-camisetas" },
          { title: "Roupas: Regatas", value: "roupas-regatas" },
          { title: "Roupas: Shorts", value: "roupas-shorts" },
          { title: "Roupas: Camisas de Times", value: "roupas-times" },
          { title: "Roupas: Jaquetas & Moletons", value: "roupas-jaquetas" },
          { title: "Roupas: Calças", value: "roupas-calcas" },
          { title: "Roupas: Polos", value: "roupas-polos" },
          { title: "Roupas: Oversize", value: "roupas-oversize" },

          // --- ACESSÓRIOS ---
          { title: "Acessórios: Bonés", value: "acessorios-bones" },
          { title: "Acessórios: Meias", value: "acessorios-meias" },
          { title: "Acessórios: Relógios", value: "acessorios-relogios" }, // Mantive pois estava na descrição original
          { title: "Acessórios: Carteiras", value: "acessorios-carteiras" }, // Mantive pois estava na descrição original

          // --- ÍNTIMO ---
          { title: "Íntimo: Cuecas", value: "intimo-cuecas" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto do Produto",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição Detalhada",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status de Estoque",
      type: "string",
      initialValue: "disponivel",
      options: {
        list: [
          { title: "Disponível", value: "disponivel" },
          { title: "Sob Encomenda", value: "encomenda" },
          { title: "Esgotado", value: "esgotado" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "isTrending",
      title: "Destaque na Home?",
      description: "Ative para aparecer na seção 'Em Alta Agora'",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
      price: "price",
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title: title,
        subtitle: `R$ ${price} - ${subtitle}`,
        media: media,
      };
    },
  },
});