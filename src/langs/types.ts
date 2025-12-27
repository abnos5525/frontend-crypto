export interface TranslationKeys {
  metadata: {
    title: string;
    description: string;
  };
  common: {
    home: string;
    about: string;
    contact: string;
    services: string;
    products: string;
    login: string;
    register: string;
    logout: string;
    profile: string;
    settings: string;
    search: string;
    submit: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  pages: {
    home: {
      title: string;
      welcome: string;
      description: string;
    };
    about: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
    offline: {
      title: string;
      message: string;
      backToHome: string;
    };
  };
  notifications: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

export type Language = "fa" | "en";

