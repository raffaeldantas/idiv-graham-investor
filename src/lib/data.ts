
export interface StockData {
  papel: string;
  cotacao: number;
  lpa: number;
  vpa: number;
  valorIntrinseco: number;
  desconto: number;
  pl: number;
  divYield: number;
  empresa: string;
  setor: string;
}

// Mock data representing what we'd get from the Python script
export const idivStocks: StockData[] = [
  {
    papel: "TAEE11",
    cotacao: 38.12,
    lpa: 4.15,
    vpa: 22.57,
    valorIntrinseco: 45.89,
    desconto: 20.45,
    pl: 9.2,
    divYield: 8.5,
    empresa: "Taesa",
    setor: "Energia Elétrica"
  },
  {
    papel: "BBDC4",
    cotacao: 16.78,
    lpa: 2.85,
    vpa: 15.32,
    valorIntrinseco: 31.42,
    desconto: 87.25,
    pl: 5.89,
    divYield: 7.8,
    empresa: "Bradesco",
    setor: "Bancos"
  },
  {
    papel: "PETR4",
    cotacao: 34.95,
    lpa: 10.35,
    vpa: 43.21,
    valorIntrinseco: 100.18,
    desconto: 186.64,
    pl: 3.38,
    divYield: 12.3,
    empresa: "Petrobras",
    setor: "Petróleo e Gás"
  },
  {
    papel: "VALE3",
    cotacao: 67.82,
    lpa: 8.25,
    vpa: 32.57,
    valorIntrinseco: 77.65,
    desconto: 14.49,
    pl: 8.22,
    divYield: 9.7,
    empresa: "Vale",
    setor: "Mineração"
  },
  {
    papel: "ITSA4",
    cotacao: 9.12,
    lpa: 1.2,
    vpa: 9.45,
    valorIntrinseco: 15.95,
    desconto: 74.89,
    pl: 7.6,
    divYield: 8.2,
    empresa: "Itaúsa",
    setor: "Holdings"
  },
  {
    papel: "BBAS3",
    cotacao: 51.23,
    lpa: 7.85,
    vpa: 42.31,
    valorIntrinseco: 86.42,
    desconto: 68.69,
    pl: 6.53,
    divYield: 8.9,
    empresa: "Banco do Brasil",
    setor: "Bancos"
  },
  {
    papel: "CPLE6",
    cotacao: 7.45,
    lpa: 1.02,
    vpa: 9.85,
    valorIntrinseco: 15.04,
    desconto: 101.81,
    pl: 7.3,
    divYield: 9.8,
    empresa: "Copel",
    setor: "Energia Elétrica"
  },
  {
    papel: "WIZC3",
    cotacao: 8.72,
    lpa: 0.95,
    vpa: 4.28,
    valorIntrinseco: 9.57,
    desconto: 9.71,
    pl: 9.18,
    divYield: 5.2,
    empresa: "Wiz Soluções",
    setor: "Seguros"
  },
  {
    papel: "TRPL4",
    cotacao: 24.35,
    lpa: 2.75,
    vpa: 17.32,
    valorIntrinseco: 32.74,
    desconto: 34.44,
    pl: 8.85,
    divYield: 7.5,
    empresa: "Transmissão Paulista",
    setor: "Energia Elétrica"
  },
  {
    papel: "SANB11",
    cotacao: 39.27,
    lpa: 5.12,
    vpa: 28.97,
    valorIntrinseco: 57.69,
    desconto: 46.9,
    pl: 7.67,
    divYield: 6.8,
    empresa: "Santander",
    setor: "Bancos"
  },
  {
    papel: "VIVT3",
    cotacao: 44.89,
    lpa: 3.25,
    vpa: 38.72,
    valorIntrinseco: 53.26,
    desconto: 18.64,
    pl: 13.81,
    divYield: 6.2,
    empresa: "Telefônica Brasil",
    setor: "Telecomunicações"
  },
  {
    papel: "CMIG4",
    cotacao: 12.78,
    lpa: 2.15,
    vpa: 11.53,
    valorIntrinseco: 23.57,
    desconto: 84.42,
    pl: 5.94,
    divYield: 7.6,
    empresa: "Cemig",
    setor: "Energia Elétrica"
  }
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatDecimal = (value: number): string => {
  return value.toFixed(2);
};
