export type DbxVisualSlide = {
  src: string
  alt: string
  eyebrow: string
  title: string
  description: string
}

export const dbxVisualSlides: DbxVisualSlide[] = [
  {
    src: "/DBX/interface-principal-1.png",
    alt: "Interface principal do DBX-V4",
    eyebrow: "Interface principal",
    title: "DBX-V4 em uma única tela operacional",
    description:
      "A interface concentra projeto, parâmetros, importação automática, furação, lista de peças e log de execução para dar mais clareza ao fluxo técnico.",
  },
  {
    src: "/DBX/desenho-peca-1.png",
    alt: "Desenho técnico de peça retangular com rasgos oblongos no DBX-V4",
    eyebrow: "Saída técnica plana",
    title: "Peças planas com cotas e furações organizadas",
    description:
      "O DBX-V4 gera desenhos técnicos prontos para corte com identificação da peça, dimensões principais, furações oblongas e informações de produção.",
  },
  {
    src: "/DBX/desenho-peca-2.png",
    alt: "Desenho técnico de peça retangular com múltiplos furos no DBX-V4",
    eyebrow: "Lote e repetibilidade",
    title: "Documentação para peças com diferentes padrões de furação",
    description:
      "A ferramenta mantém a leitura dimensional e a padronização do desenho mesmo em geometrias com múltiplos furos e diferentes quantidades por lote.",
  },
  {
    src: "/DBX/desenho-peca-3.png",
    alt: "Desenho técnico de perfil dobrado em U no DBX-V4",
    eyebrow: "Peças dobradas",
    title: "Perfis dobrados com vista frontal e blank desenvolvido",
    description:
      "Na V4, o DBX passa a suportar peças dobradas, exibindo o perfil final e o blank desenvolvido para apoiar fabricação, conferência e preparação.",
  },
  {
    src: "/DBX/desenho-peca-4.png",
    alt: "Desenho técnico de perfil dobrado tipo terça no DBX-V4",
    eyebrow: "Dobras mais complexas",
    title: "Perfis com abas, base e sequência de dobras",
    description:
      "O DBX-V4 amplia o escopo para perfis dobrados mais completos, detalhando abas, base e referências do blank para reduzir interpretação manual.",
  },
]
