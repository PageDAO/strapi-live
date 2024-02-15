import type { Schema, Attribute } from '@strapi/strapi';

export interface KeyKeyValue extends Schema.Component {
  collectionName: 'components_key_key_values';
  info: {
    displayName: 'KeyValue';
  };
  attributes: {
    Value: Attribute.Text;
    Key: Attribute.String;
  };
}

export interface ModelModelOrComponent extends Schema.Component {
  collectionName: 'components_model_model_or_components';
  info: {
    displayName: 'Model or Component';
  };
  attributes: {};
}

export interface ModelStep extends Schema.Component {
  collectionName: 'components_model_steps';
  info: {
    displayName: 'Step';
    icon: 'arrowRight';
  };
  attributes: {
    Order: Attribute.Integer;
    Title: Attribute.String;
    Description: Attribute.Text;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    MetaTitle: Attribute.String;
    MetaDescription: Attribute.String;
    SocialMediaImage: Attribute.Media;
  };
}

export interface StackImageAndText extends Schema.Component {
  collectionName: 'components_stack_image_and_texts';
  info: {
    displayName: 'Image and Text';
    icon: 'layout';
  };
  attributes: {
    Headline: Attribute.String;
    Content: Attribute.Text;
    Image: Attribute.Media;
    Layout: Attribute.Enumeration<['Left', 'Right', 'Cover']>;
  };
}

export interface StackStack extends Schema.Component {
  collectionName: 'components_stack_stacks';
  info: {
    displayName: 'Stack';
  };
  attributes: {
    model: Attribute.Component<'model.model-or-component'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'key.key-value': KeyKeyValue;
      'model.model-or-component': ModelModelOrComponent;
      'model.step': ModelStep;
      'seo.seo': SeoSeo;
      'stack.image-and-text': StackImageAndText;
      'stack.stack': StackStack;
    }
  }
}
