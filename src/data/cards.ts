// Definição da interface para os cards
export interface Card {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
}

// Array de cards com dados fictícios
export const cards: Card[] = [
  {
    id: 1,
    slug: 'card-um',
    title: 'Card Um',
    description: 'Uma breve descrição do Card Um para exibição na listagem.',
    content: 'Este é o conteúdo detalhado do Card Um. Aqui você encontrará todas as informações relevantes sobre este item específico. Este conteúdo só é exibido na página de detalhes do card.',
    imageUrl: '/images/card1.png'
  },
  {
    id: 2,
    slug: 'card-dois',
    title: 'Card Dois',
    description: 'Uma breve descrição do Card Dois para exibição na listagem.',
    content: 'Este é o conteúdo detalhado do Card Dois. Aqui você encontrará todas as informações relevantes sobre este item específico. Este conteúdo só é exibido na página de detalhes do card.',
    imageUrl: '/images/card2.png'
  },
  {
    id: 3,
    slug: 'card-tres',
    title: 'Card Três',
    description: 'Uma breve descrição do Card Três para exibição na listagem.',
    content: 'Este é o conteúdo detalhado do Card Três. Aqui você encontrará todas as informações relevantes sobre este item específico. Este conteúdo só é exibido na página de detalhes do card.',
    imageUrl: '/images/card3.png'
  },
  {
    id: 4,
    slug: 'card-quatro',
    title: 'Card Quatro',
    description: 'Uma breve descrição do Card Quatro para exibição na listagem.',
    content: 'Este é o conteúdo detalhado do Card Quatro. Aqui você encontrará todas as informações relevantes sobre este item específico. Este conteúdo só é exibido na página de detalhes do card.',
    imageUrl: '/images/card4.png'
  },
  {
    id: 5,
    slug: 'card-cinco',
    title: 'Card Cinco',
    description: 'Uma breve descrição do Card Cinco para exibição na listagem.',
    content: 'Este é o conteúdo detalhado do Card Cinco. Aqui você encontrará todas as informações relevantes sobre este item específico. Este conteúdo só é exibido na página de detalhes do card.',
    imageUrl: '/images/card5.png'
  },
];

// Função para encontrar um card pelo slug
export function getCardBySlug(slug: string): Card | undefined {
  return cards.find(card => card.slug === slug);
}

// Função para obter todos os cards
export function getAllCards(): Card[] {
  return cards;
}