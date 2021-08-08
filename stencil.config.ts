import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'myComponents',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    }
  ],
};
