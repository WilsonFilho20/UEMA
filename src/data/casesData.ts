import { EstudoDeCaso } from '../types';
import { ESTUDOS_CASO_UNIDADE_1 } from './casesUnidade1';
import { ESTUDOS_CASO_UNIDADE_2 } from './casesUnidade2';
import { ESTUDOS_CASO_UNIDADE_3 } from './casesUnidade3';
import { ESTUDOS_CASO_UNIDADE_4 } from './casesUnidade4';
import { ESTUDOS_CASO_UNIDADE_5 } from './casesUnidade5';

export const TODOS_ESTUDOS_DE_CASO: EstudoDeCaso[] = [
  ...ESTUDOS_CASO_UNIDADE_1,
  ...ESTUDOS_CASO_UNIDADE_2,
  ...ESTUDOS_CASO_UNIDADE_3,
  ...ESTUDOS_CASO_UNIDADE_4,
  ...ESTUDOS_CASO_UNIDADE_5
];

export const OBTER_CASOS_POR_UNIDADE = (unidade: number): EstudoDeCaso[] => {
  return TODOS_ESTUDOS_DE_CASO.filter((c) => c.unidadeNumero === unidade);
};

export const OBTER_CASO_POR_ID = (id: string): EstudoDeCaso | undefined => {
  return TODOS_ESTUDOS_DE_CASO.find((c) => c.id === id);
};
