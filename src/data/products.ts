import { Product } from '@/types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Dragon Miniatura',
    price: 450,
    shortDescription: 'Detailně zpracovaná figurka draka pro D&D',
    fullDescription: 'Profesionálně vytištěná a detailně zpracovaná figurka draka ideální pro stolní hry typu Dungeons & Dragons. Výška 8 cm, vyrobeno z kvalitního PLA materiálu s vysokým rozlišením tisku. Figurka je dodávána nenatřená, ideální pro vlastní malování.\n\nMateriál: PLA\nVýška: 8 cm\nMěřítko: 28mm\nBarva: Šedá (připraveno k malování)',
    images: [
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=600',
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=700'
    ],
    category: 'miniatures'
  },
  {
    id: '2',
    name: 'Wizard Figurka',
    price: 280,
    shortDescription: 'Figurka kouzelníka s detailním hábětem',
    fullDescription: 'Vysoce detailní figurka kouzelníka s magickou hůlkou a plášťěm. Ideální pro hráče D&D, kteří hledají unikátní reprezentaci své postavy. Tisk s rozlišením 0.1mm zajišťuje zachování všech detailů.\n\nMateriál: Resin\nVýška: 6 cm\nMěřítko: 28mm\nVhodné pro: D&D, Pathfinder, Warhammer',
    images: [
      'https://images.unsplash.com/photo-1594912475149-7f64cd2cd61c?w=800',
      'https://images.unsplash.com/photo-1594912475149-7f64cd2cd61c?w=800&h=600'
    ],
    category: 'miniatures'
  },
  {
    id: '3',
    name: 'Warband Set',
    price: 890,
    shortDescription: 'Sada 6 bojovníků pro vaši party',
    fullDescription: 'Kompletní sada 6 figurek bojovníků různých tříd - bojovník, hraničář, klerik, mág, tulák a barbar. Každá figurka je unikátně navržena s vlastním vybavením a postojem. Perfektní starter set pro začínající hráče nebo rozšíření vaší sbírky.\n\nObsahuje: 6 figurek\nMateriál: PLA\nPrůměrná výška: 5-7 cm\nMěřítko: 28mm',
    images: [
      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800',
      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600',
      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=700'
    ],
    category: 'bestsellers'
  },
  {
    id: '4',
    name: 'Terrain Pack',
    price: 650,
    shortDescription: 'Sada terénních prvků pro herní stůl',
    fullDescription: 'Kompletní sada terénních prvků zahrnující stromy, kameny, bariéry a ruiny. Ideální pro vytvoření atmosférického herního prostředí. Všechny prvky jsou modulární a lze je různě kombinovat.\n\nObsahuje: 12 různých prvků\nMateriál: PLA\nBarva: Přirozené odstíny\nMěřítko: 28mm kompatibilní',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600'
    ],
    category: 'bestsellers'
  },
  {
    id: '5',
    name: 'Dice Tower',
    price: 380,
    shortDescription: 'Věž na kostky s fantasy designem',
    fullDescription: 'Funkční a esteticky působivá věž na kostky s fantasy motivem. Zajišťuje spravedlivé hody a zároveň je skvělou dekorací herního stolu. Design inspirovaný středověkými hrady.\n\nMateriál: PLA\nVýška: 15 cm\nBarva: Na výběr\nFunkce: Náhodné házení kostek',
    images: [
      'https://images.unsplash.com/photo-1570303363992-b8fc8d2c9089?w=800',
      'https://images.unsplash.com/photo-1570303363992-b8fc8d2c9089?w=800&h=600'
    ],
    category: 'new'
  },
  {
    id: '6',
    name: 'Custom Miniatura',
    price: 550,
    shortDescription: 'Vytvoříme figurku podle vašeho návrhu',
    fullDescription: 'Nabízíme službu vytvoření custom figurky přesně podle vašich představ. Stačí nám poskytnout popis postavy, inspirační obrázky nebo vlastní 3D model a my vytvoříme jedinečnou figurku.\n\nCena zahrnuje:\n- Konzultaci designu\n- 3D modelování (pokud je potřeba)\n- Tisk ve vysokém rozlišení\n- Jednu revizi designu\n\nDodací lhůta: 2-3 týdny',
    images: [
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=600',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=700'
    ],
    category: 'new'
  }
];
