import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeSettings',
  title: 'Configurações da Home',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerTitle',
      title: 'Título do Banner',
      type: 'string',
    }),
    // NOVO: Cor do Título
    defineField({
      name: 'titleColor',
      title: 'Cor do Título',
      type: 'string',
      options: {
        list: [
          { title: 'Branco', value: '#FFFFFF' },
          { title: 'Preto', value: '#000000' },
          { title: 'Vermelho', value: '#ED1C24' },
        ],
      },
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    // NOVO: Cor do Subtítulo
    defineField({
      name: 'subtitleColor',
      title: 'Cor do Subtítulo',
      type: 'string',
      options: {
        list: [
          { title: 'Branco', value: '#FFFFFF' },
          { title: 'Preto', value: '#000000' },
          { title: 'Cinza Claro', value: '#D1D5DB' },
        ],
      },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Imagem do Banner',
      type: 'image',
      options: { 
        hotspot: true
      },
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão',
      type: 'string',
    }),
  ],
})