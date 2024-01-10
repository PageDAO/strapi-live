import type { Schema, Attribute } from '@strapi/strapi';

export interface FactFactBlock extends Schema.Component {
  collectionName: 'components_fact_fact_blocks';
  info: {
    displayName: 'FactBlock';
  };
  attributes: {
    MainInfo: Attribute.String;
    SecondaryInfo: Attribute.String;
  };
}

export interface FactFact extends Schema.Component {
  collectionName: 'components_fact_facts';
  info: {
    displayName: 'Fact';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'fact.fact-block': FactFactBlock;
      'fact.fact': FactFact;
    }
  }
}
