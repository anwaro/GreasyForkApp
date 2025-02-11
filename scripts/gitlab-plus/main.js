// ==UserScript==
// @name         Gitlab plus
// @namespace    https://lukaszmical.pl/
// @version      2025-02-11
// @description  Gitlab utils
// @author       Łukasz Micał
// @match        https://gitlab.com/*
// @require      https://cdn.jsdelivr.net/combine/npm/preact@10.25.4/dist/preact.min.umd.min.js,npm/preact@10.25.4/hooks/dist/hooks.umd.min.js,npm/preact@10.25.4/jsx-runtime/dist/jsxRuntime.umd.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitlab.com
// ==/UserScript==

// Vite helpers
const __defProp = Object.defineProperty;
const __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
const __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);

// App code
const { jsx, jsxs, Fragment } = this.jsxRuntime;
const { render } = this.preact;
const { useMemo, useRef, useEffect, useState, useCallback } = this.preactHooks;

// libs/share/src/ui/GlobalStyle.ts
class GlobalStyle {
  static addStyle(key, styles) {
    const style =
      document.getElementById(key) ||
      (function () {
        const style22 = document.createElement('style');
        style22.id = key;
        document.head.appendChild(style22);
        return style22;
      })();
    style.textContent = styles;
  }
}

const style1 =
  '.glp-create-related-issue-layer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99999;\n  display: none;\n  background: rgba(0, 0, 0, 0.6);\n  justify-content: center;\n  align-items: center;\n}\n\n.glp-create-related-issue-layer.glp-modal-visible {\n  display: flex;\n}\n\n.glp-create-related-issue-layer .glp-create-related-issue-modal {\n  width: 700px;\n  max-width: 95vw;\n}\n\n.gl-new-dropdown-item .glp-item-check {\n  opacity: 0;\n}\n\n.gl-new-dropdown-item.glp-active .gl-new-dropdown-item-content {\n  box-shadow: inset 0 0 0 2px var(--gl-focus-ring-outer-color), inset 0 0 0 3px var(--gl-focus-ring-inner-color), inset 0 0 0 1px var(--gl-focus-ring-inner-color);\n  background-color: var(--gl-dropdown-option-background-color-unselected-hover);\n  outline: none;\n}\n\n.gl-new-dropdown-item.glp-selected .glp-item-check {\n  opacity: 1;\n}\n\n';
const style2 =
  '.glp-image-preview-modal {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  visibility: hidden;\n  opacity: 0;\n  pointer-events: none;\n  z-index: 99999;\n}\n\n.glp-image-preview-modal.glp-modal-visible {\n  visibility: visible;\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.glp-image-preview-modal .glp-modal-img {\n  max-width: 95%;\n  max-height: 95%;\n}\n\n.glp-image-preview-modal .glp-modal-close {\n  position: absolute;\n  z-index: 2;\n  top: 20px;\n  right: 20px;\n  color: black;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: white;\n  border-radius: 20px;\n  cursor: pointer;\n}\n\n';
const style3 =
  '.glp-issue-preview-modal {\n  position: fixed;\n  display: flex;\n  padding: 0 15px;\n  background-color: var(--gl-background-color-default, var(--gl-color-neutral-0, #fff));\n  border: 1px solid var(--gl-border-color-default);\n  border-radius: .25rem;\n  width: 350px;\n  min-height: 200px;\n  z-index: 99999;\n  visibility: hidden;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  transition: all .2s ease-out;\n  transition-property: visibility, opacity, transform;\n}\n\n.glp-issue-preview-modal.glp-modal-visible {\n  visibility: visible;\n  opacity: 1;\n}\n\n.glp-issue-preview-modal .glp-issue-modal-inner {\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n}\n\n.glp-issue-preview-modal .glp-block {\n  padding: .5rem 0 .5rem;\n  border-bottom-style: solid;\n  border-bottom-color: var(--gl-border-color-subtle, var(--gl-color-neutral-50, #ececef));\n  border-bottom-width: 1px;\n  width: 100%;\n}\n\n\n.glp-issue-preview-modal * {\n  max-width: 100%;\n}\n';

// apps/gitlab-plus/src/styles/index.ts
GlobalStyle.addStyle('glp-style', [style1, style2, style3].join('\n'));

// libs/share/src/store/Cache.ts
class Cache {
  constructor(prefix) {
    this.prefix = prefix;
  }

  clearInvalid() {
    for (const key in localStorage) {
      if (key.startsWith(this.prefix) && !this.isValid(this.getItem(key))) {
        localStorage.removeItem(key);
      }
    }
  }

  expirationDate(minutes) {
    if (typeof minutes === 'string') {
      return minutes;
    }
    const time = new Date();
    time.setMinutes(time.getMinutes() + minutes);
    return time;
  }

  get(key) {
    try {
      const data = this.getItem(this.key(key));
      if (this.isValid(data)) {
        return data.value;
      }
    } catch (e) {
      return void 0;
    }
    return void 0;
  }

  key(key) {
    return `${this.prefix}${key}`;
  }

  set(key, value, minutes) {
    localStorage.setItem(
      this.key(key),
      JSON.stringify({
        expirationDate: this.expirationDate(minutes),
        value,
      })
    );
  }

  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      return void 0;
    }
  }

  isValid(item) {
    if (item) {
      return (
        item.expirationDate === 'lifetime' ||
        new Date(item.expirationDate) > new Date()
      );
    }
    return false;
  }
}

// apps/gitlab-plus/src/types/Service.ts
class Service {
  root(className, parent, usePrepend = false) {
    const root = document.createElement('div');
    root.classList.add(className);
    if (parent) {
      parent[usePrepend ? 'prepend' : 'append'](root);
    }
    return root;
  }

  rootBody(className) {
    return this.root(className, document.body);
  }
}

// apps/gitlab-plus/src/services/ClearCacheService.ts
class ClearCacheService extends Service {
  constructor() {
    super();
    __publicField(this, 'cache', new Cache('glp-'));
  }

  init() {
    this.cache.clearInvalid();
    window.setInterval(this.cache.clearInvalid.bind(this.cache), 60 * 1e3);
  }
}

// libs/share/src/utils/clsx.ts
function clsx(...args) {
  return args
    .map((item) => {
      if (!item) {
        return '';
      }
      if (typeof item === 'string') {
        return item;
      }
      if (Array.isArray(item)) {
        return clsx(...item);
      }
      if (typeof item === 'object') {
        return clsx(
          Object.entries(item)
            .filter(([_, value]) => value)
            .map(([key]) => key)
        );
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}

// apps/gitlab-plus/src/components/common/GitlabIcon.tsx
const buildId =
  '236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84';
const iconUrl = (icon) => {
  let _a;
  const svgSprite =
    ((_a = unsafeWindow.gon) == null ? void 0 : _a.sprite_icons) ||
    `/assets/icons-${buildId}.svg`;
  return `${svgSprite}#${icon}`;
};

function GitlabIcon({ className, icon, size = 12, title }) {
  return jsx('svg', {
    className: clsx('gl-icon gl-fill-current', `s${size}`, className),
    title,
    children: jsx('use', { href: iconUrl(icon) }),
  });
}

// apps/gitlab-plus/src/components/common/GitlabLoader.tsx
function GitlabLoader({ size = 24 }) {
  return jsx('span', {
    class: 'gl-spinner-container',
    role: 'status',
    children: jsx('span', {
      class: 'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom',
      style: {
        width: size,
        height: size,
      },
    }),
  });
}

// apps/gitlab-plus/src/components/common/GitlabButton.tsx
const buttonVariantClass = {
  default: '',
  info: 'btn-confirm',
};

function GitlabButton({
  children,
  icon,
  iconSize = 12,
  isLoading,
  onClick,
  title,
  variant = 'default',
}) {
  const IconComponent = useMemo(() => {
    if (isLoading) {
      return jsx(GitlabLoader, { size: iconSize });
    }
    if (icon) {
      return jsx(GitlabIcon, { icon, size: iconSize });
    }
    return null;
  }, [icon, isLoading]);
  return jsxs('button', {
    class: clsx('btn btn-sm gl-button', buttonVariantClass[variant]),
    onClick,
    title,
    type: 'button',
    children: [
      children && jsx('span', { class: 'gl-button-text', children }),
      IconComponent,
    ],
  });
}

// apps/gitlab-plus/src/components/common/CloseButton.tsx
function CloseButton({ onClick, title = 'Close' }) {
  return jsx('button', {
    onClick,
    title,
    class:
      'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon',
    children: jsx(GitlabIcon, { icon: 'close-xs', size: 16 }),
  });
}

// apps/gitlab-plus/src/components/common/form/FormField.tsx
function FormField({ children, error, hint, title }) {
  return jsxs('fieldset', {
    class: clsx(
      'form-group gl-form-group gl-w-full',
      error && 'gl-show-field-errors'
    ),
    children: [
      jsx('legend', {
        class: 'bv-no-focus-ring col-form-label pt-0 col-form-label',
        children: title,
      }),
      children,
      Boolean(!error && hint) && jsx('small', { children: hint }),
      Boolean(error) &&
        jsx('small', { class: 'gl-field-error', children: error }),
    ],
  });
}

// apps/gitlab-plus/src/components/common/form/FormRow.tsx
function FormRow({ children }) {
  return jsx('div', { class: 'gl-flex gl-gap-x-3', children });
}

// libs/share/src/utils/camelizeKeys.ts
function camelizeKeys(data) {
  if (!data || ['string', 'number', 'boolean'].includes(typeof data)) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(camelizeKeys);
  }
  const camelize = (key) => {
    const _key = key.replace(/[-_\s]+(.)?/g, (_, chr) =>
      chr ? chr.toUpperCase() : ''
    );
    return _key.substring(0, 1).toLowerCase() + _key.substring(1);
  };
  return Object.entries(data).reduce(
    (result, [key, value]) => ({
      ...result,
      [camelize(key)]: camelizeKeys(value),
    }),
    {}
  );
}

// apps/gitlab-plus/src/providers/GitlabProvider.ts
class GitlabProvider {
  constructor(force = false) {
    __publicField(this, 'cache', new Cache('glp-'));
    __publicField(this, 'graphqlApi', 'https://gitlab.com/api/graphql');
    __publicField(this, 'url', 'https://gitlab.com/api/v4/');
    this.force = force;
  }

  async cached(key, getValue, minutes) {
    const cacheValue = this.cache.get(key);
    if (cacheValue && !this.force) {
      return cacheValue;
    }
    const value = await getValue();
    this.cache.set(key, value, minutes);
    return value;
  }

  csrf() {
    const token = document.querySelector('meta[name=csrf-token]');
    if (token) {
      return token.getAttribute('content');
    }
    return '';
  }

  async get(path) {
    const response = await fetch(`${this.url}${path}`, {
      headers: this.headers(),
      method: 'GET',
    });
    const data = await response.json();
    return camelizeKeys(data);
  }

  async getCached(key, path, minutes) {
    return this.cached(key, () => this.get(path), minutes);
  }

  headers() {
    const headers = {
      'content-type': 'application/json',
    };
    const csrf = this.csrf();
    if (csrf) {
      headers['X-CSRF-Token'] = csrf;
    }
    return headers;
  }

  async post(path, body) {
    const response = await fetch(`${this.url}${path}`, {
      body: JSON.stringify(body),
      headers: this.headers(),
      method: 'POST',
    });
    const data = await response.json();
    return camelizeKeys(data);
  }

  async query(query, variables) {
    const response = await fetch(this.graphqlApi, {
      body: JSON.stringify({ query, variables }),
      headers: this.headers(),
      method: 'POST',
    });
    return response.json();
  }

  async queryCached(key, query, variables, minutes) {
    return this.cached(key, () => this.query(query, variables), minutes);
  }
}

// apps/gitlab-plus/src/providers/query/user.ts
const userFragment = `
fragment User on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}
`;
const userQuery = `
query workspaceAutocompleteUsersSearch($search: String!, $fullPath: ID!, $isProject: Boolean = true) {
  groupWorkspace: group(fullPath: $fullPath) @skip(if: $isProject) {
    id
    users: autocompleteUsers(search: $search) {
      ...User
      ...UserAvailability
      __typename
    }
    __typename
  }
  workspace: project(fullPath: $fullPath) {
    id
    users: autocompleteUsers(search: $search) {
      ...User
      ...UserAvailability
      __typename
    }
    __typename
  }
}

${userFragment}
fragment UserAvailability on User {
  status {
    availability
    __typename
  }
  __typename
}
`;

// apps/gitlab-plus/src/providers/UsersProvider.ts
class UsersProvider extends GitlabProvider {
  async getUsers(projectId, search = '') {
    return this.queryCached(
      `users-${projectId}-${search}`,
      userQuery,
      {
        fullPath: projectId,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/common/form/autocomplete/useAsyncAutocompleteButton.ts
function useAsyncAutocompleteButton(hide) {
  const ref = useRef(null);
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (
        ref.current &&
        e.target !== ref.current &&
        !ref.current.contains(e.target)
      ) {
        hide();
      }
    });
  }, []);
  return ref;
}

// apps/gitlab-plus/src/components/common/form/autocomplete/AsyncAutocompleteButton.tsx
function AsyncAutocompleteButton({
  isOpen,
  renderLabel,
  reset,
  setIsOpen,
  value,
}) {
  const ref = useAsyncAutocompleteButton(() => setIsOpen(false));
  const icon = useMemo(() => {
    if (value.length) {
      return 'close-xs';
    }
    return isOpen ? 'chevron-lg-up' : 'chevron-lg-down';
  }, [isOpen, value]);
  return jsx('button', {
    ref,
    type: 'button',
    class: 'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle',
    onClick: (e) => {
      e.preventDefault();
      setIsOpen(true);
    },
    children: jsxs('span', {
      class: 'gl-button-text gl-w-full',
      children: [
        jsx('span', {
          class: 'gl-new-dropdown-button-text',
          children: renderLabel(value),
        }),
        jsx('span', {
          onClick: (e) => {
            if (value.length) {
              e.preventDefault();
              reset();
            }
          },
          children: jsx(GitlabIcon, { icon, size: 16 }),
        }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/common/form/autocomplete/AsyncAutocompleteOption.tsx
function AsyncAutocompleteOption({
  isActive,
  onClick,
  option,
  removeFromRecent,
  renderOption,
  selected,
}) {
  const selectedIds = selected.map((i) => i.id);
  const selectedClass = (id) =>
    selectedIds.includes(id) ? 'glp-selected' : '';
  return jsx('li', {
    onClick: () => onClick(option),
    class: clsx(
      'gl-new-dropdown-item',
      selectedClass(option.id),
      isActive && 'glp-active'
    ),
    children: jsxs('span', {
      class: 'gl-new-dropdown-item-content',
      children: [
        jsx(GitlabIcon, {
          className: 'glp-item-check gl-pr-2',
          icon: 'mobile-issue-close',
          size: 16,
        }),
        renderOption(option),
        removeFromRecent &&
          jsx(CloseButton, {
            title: 'Remove from recently used',
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromRecent(option);
            },
          }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/common/form/autocomplete/AsyncAutocompleteList.tsx
function AsyncAutocompleteList({
  activeIndex,
  onClick,
  options,
  recently,
  removeRecently,
  renderOption,
  value,
}) {
  return jsx('div', {
    onClick: (e) => e.stopPropagation(),
    class:
      'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents',
    style: {
      maxWidth: '800px',
      width: '100%',
      left: '0',
      top: '100%',
    },
    children: jsx('div', {
      class: 'gl-new-dropdown-inner',
      children: jsxs('ul', {
        class: 'gl-mb-0 gl-pl-0',
        children: [
          Boolean(recently.length) &&
            jsxs(Fragment, {
              children: [
                jsx('li', {
                  class:
                    'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong',
                  children: 'Recently used',
                }),
                recently.map((item, index) =>
                  jsx(
                    AsyncAutocompleteOption,
                    {
                      isActive: index === activeIndex,
                      onClick,
                      option: item,
                      removeFromRecent: removeRecently,
                      renderOption,
                      selected: value,
                    },
                    item.id
                  )
                ),
              ],
            }),
          Boolean(options.length) &&
            jsxs(Fragment, {
              children: [
                jsx('li', {
                  class:
                    'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong gl-border-t',
                }),
                options.map((item, index) =>
                  jsx(
                    AsyncAutocompleteOption,
                    {
                      isActive: recently.length + index === activeIndex,
                      onClick,
                      option: item,
                      renderOption,
                      selected: value,
                    },
                    item.id
                  )
                ),
              ],
            }),
          options.length + recently.length === 0 &&
            jsx('li', { class: 'gl-p-4', children: 'No options' }),
        ],
      }),
    }),
  });
}

// apps/gitlab-plus/src/components/common/form/autocomplete/AsyncAutocompleteSearch.tsx
function AsyncAutocompleteSearch({ navigate, setValue, value }) {
  return jsx('div', {
    class: 'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown',
    children: jsxs('div', {
      class: 'gl-listbox-search gl-listbox-topmost',
      children: [
        jsx(GitlabIcon, {
          className: 'gl-search-box-by-type-search-icon',
          icon: 'search',
          size: 16,
        }),
        jsx('input', {
          class: 'gl-listbox-search-input',
          onInput: (e) => setValue(e.target.value),
          onKeyDown: (e) => navigate(e.key),
          value,
          autofocus: true,
        }),
        Boolean(value) &&
          jsx('div', {
            class: 'gl-search-box-by-type-right-icons',
            style: { top: '0' },
            children: jsx(CloseButton, {
              onClick: () => setValue(''),
              title: 'Clear input',
            }),
          }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/common/form/autocomplete/useListNavigate.ts
function useListNavigate(options, recent, onClick, onClose) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = (key) => {
    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      const total = recent.length + options.length;
      const diff = key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((activeIndex + diff + total) % total);
    } else if (key === 'Enter') {
      const allItems = [...recent, ...options];
      if (-1 < activeIndex && activeIndex < allItems.length) {
        onClick(allItems[activeIndex]);
      }
    } else if (key === 'Escape') {
      onClose();
    }
  };
  return {
    activeIndex,
    navigate,
  };
}

// apps/gitlab-plus/src/components/common/form/autocomplete/AsyncAutocompleteDropdown.tsx
function AsyncAutocompleteDropdown({
  onClick,
  onClose,
  options,
  recently = [],
  removeRecently,
  renderOption,
  searchTerm,
  setSearchTerm,
  value,
}) {
  const { activeIndex, navigate } = useListNavigate(
    options,
    recently,
    onClick,
    onClose
  );
  return jsx('div', {
    class: clsx('gl-new-dropdown-panel gl-absolute !gl-block'),
    onClick: (e) => e.stopPropagation(),
    style: {
      maxWidth: '800px',
      width: '100%',
      left: 'auto',
      right: '0',
      top: '100%',
    },
    children: jsxs('div', {
      class: 'gl-new-dropdown-inner',
      children: [
        jsx(AsyncAutocompleteSearch, {
          navigate,
          setValue: setSearchTerm,
          value: searchTerm,
        }),
        jsx(AsyncAutocompleteList, {
          activeIndex,
          onClick,
          options,
          recently,
          removeRecently,
          renderOption,
          value,
        }),
      ],
    }),
  });
}

// libs/share/src/utils/useDebounce.ts
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// apps/gitlab-plus/src/components/common/form/autocomplete/useAsyncAutocompleteOptions.ts
function useAsyncAutocompleteOptions(searchTerm, getValues) {
  const [options, setOptions] = useState([]);
  const term = useDebounce(searchTerm);
  const loadOptions = useCallback(
    async (term2) => {
      const items = await getValues(term2);
      setOptions(items);
    },
    [getValues]
  );
  useEffect(() => {
    loadOptions(term);
  }, [term, loadOptions]);
  return options;
}

// apps/gitlab-plus/src/providers/RecentlyProvider.ts
class RecentlyProvider {
  constructor(key) {
    __publicField(this, 'cache', new Cache('glp-'));
    __publicField(this, 'key');
    __publicField(this, 'eventName');
    this.key = `recently-${key}`;
    this.eventName = `recently-${key}-change`;
  }

  add(...items) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      [...items, ...this.get().filter((el) => !itemsId.includes(el.id))],
      'lifetime'
    );
    this.triggerChange();
  }

  get() {
    return this.cache.get(this.key) || [];
  }

  onChange(callback) {
    document.addEventListener(this.eventName, callback);
  }

  remove(...items) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      this.get().filter((el) => !itemsId.includes(el.id)),
      'lifetime'
    );
    this.triggerChange();
  }

  triggerChange() {
    document.dispatchEvent(new CustomEvent(this.eventName));
  }
}

// apps/gitlab-plus/src/components/common/form/autocomplete/useAsyncAutocompleteRecently.ts
function useAsyncAutocompleteRecently(name2) {
  const store = useRef(new RecentlyProvider(name2));
  const [recently, setRecently] = useState(store.current.get());
  useEffect(() => {
    store.current.onChange(() => {
      setRecently(store.current.get());
    });
  }, []);
  return {
    add: store.current.add.bind(store.current),
    recently,
    remove: store.current.remove.bind(store.current),
  };
}

// apps/gitlab-plus/src/components/common/form/autocomplete/useAsyncAutocomplete.ts
function useAsyncAutocomplete(
  name2,
  value,
  getValues,
  onChange,
  isMultiselect
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { recently: allRecently, remove: removeRecently } =
    useAsyncAutocompleteRecently(name2);
  const options = useAsyncAutocompleteOptions(searchTerm, getValues);
  const onClick = (item) => {
    if (isMultiselect) {
      if (value.find((i) => i.id === item.id)) {
        onChange(value.filter((i) => i.id !== item.id));
      } else {
        onChange([...value, item]);
      }
    } else {
      onChange([item]);
      setIsOpen(false);
    }
  };
  const recently = useMemo(() => {
    const optionsIds = options.map((i) => i.id);
    return searchTerm.length
      ? allRecently.filter((i) => optionsIds.includes(i.id))
      : allRecently;
  }, [options, allRecently]);
  return {
    isOpen,
    onClick,
    options: useMemo(() => {
      const recentlyIds = recently.map((i) => i.id);
      return options.filter((i) => !recentlyIds.includes(i.id));
    }, [options, recently]),
    recently,
    removeRecently,
    searchTerm,
    setIsOpen,
    setSearchTerm,
  };
}

// apps/gitlab-plus/src/components/common/form/autocomplete/AsyncAutocomplete.tsx
function AsyncAutocomplete({
  getValues,
  isDisabled,
  isMultiselect = false,
  name: name2,
  onChange,
  renderLabel,
  renderOption,
  value,
}) {
  const {
    isOpen,
    onClick,
    options,
    recently,
    removeRecently,
    searchTerm,
    setIsOpen,
    setSearchTerm,
  } = useAsyncAutocomplete(name2, value, getValues, onChange, isMultiselect);
  return jsxs('div', {
    class: clsx(
      'gl-relative gl-w-full gl-new-dropdown !gl-block',
      isDisabled && 'gl-pointer-events-none gl-opacity-5'
    ),
    children: [
      jsx(AsyncAutocompleteButton, {
        isOpen,
        renderLabel,
        reset: () => onChange([]),
        setIsOpen,
        value,
      }),
      isOpen &&
        jsx(AsyncAutocompleteDropdown, {
          onClick,
          onClose: () => setIsOpen(false),
          options,
          recently,
          removeRecently,
          renderOption,
          searchTerm,
          setSearchTerm,
          value,
        }),
    ],
  });
}

// apps/gitlab-plus/src/components/common/GitlabUser.tsx
function GitlabUser({ showUsername, size = 24, smallText, user, withLink }) {
  const label = useMemo(() => {
    return jsxs(Fragment, {
      children: [
        jsx('span', {
          class: clsx('gl-mr-2 gl-block', smallText && '!gl-text-sm'),
          children: user.name,
        }),
        showUsername &&
          jsx('span', {
            class: 'gl-block gl-text-secondary !gl-text-sm',
            children: user.username,
          }),
      ],
    });
  }, [smallText, showUsername, user]);
  const iconClsx = [
    `gl-avatar gl-avatar-s${size}`,
    smallText ? 'gl-mr-1' : 'gl-mr-3',
  ];
  return jsxs('div', {
    class: 'gl-flex gl-items-center',
    children: [
      user.avatarUrl
        ? jsx('img', {
            alt: `${user.name}'s avatar`,
            class: clsx(...iconClsx, `gl-avatar-circle`),
            src: user.avatarUrl,
          })
        : jsx('div', {
            class: clsx(
              ...iconClsx,
              `gl-avatar-identicon gl-avatar-identicon-bg1`
            ),
            children: user.name[0].toUpperCase(),
          }),
      withLink
        ? jsx('a', { href: user.webUrl, children: label })
        : jsx('div', { children: label }),
    ],
  });
}

// apps/gitlab-plus/src/components/create-issue/fields/AssigneesField.tsx
function AssigneesField({ projectPath, setValue, value }) {
  const getUsers = useCallback(
    async (search) => {
      if (!projectPath) {
        return [];
      }
      const response = await new UsersProvider().getUsers(projectPath, search);
      return response.data.workspace.users;
    },
    [projectPath]
  );
  const renderLabel = useCallback((items) => {
    const label = items.map((i) => i.name).join(', ');
    return jsx('div', {
      title: label,
      children: items.length ? label : 'Select assignee',
    });
  }, []);
  const renderOption = useCallback((item) => {
    return jsx('span', {
      class: 'gl-new-dropdown-item-text-wrapper',
      children: jsx(GitlabUser, { user: item, showUsername: true }),
    });
  }, []);
  return jsx(AsyncAutocomplete, {
    getValues: getUsers,
    isDisabled: !projectPath,
    name: 'assignees',
    onChange: setValue,
    renderLabel,
    renderOption,
    value,
    isMultiselect: true,
  });
}

// apps/gitlab-plus/src/components/create-issue/fields/ButtonField.tsx
function ButtonField({ create, isLoading, reset }) {
  return jsxs(Fragment, {
    children: [
      jsxs('button', {
        class: 'btn btn-confirm btn-sm gl-button gl-gap-2',
        disabled: isLoading,
        onClick: create,
        type: 'button',
        children: [
          jsx('span', { class: 'gl-button-text', children: 'Add' }),
          isLoading
            ? jsx(GitlabLoader, { size: 12 })
            : jsx(GitlabIcon, { icon: 'plus', size: 12 }),
        ],
      }),
      jsx('button', {
        class: 'btn btn-sm gl-button',
        onClick: reset,
        type: 'button',
        children: jsx('span', { class: 'gl-button-text', children: 'Reset' }),
      }),
    ],
  });
}

// apps/gitlab-plus/src/providers/query/iteration.ts
const iterationFragment = `fragment IterationFragment on Iteration {
  id
  title
  startDate
  dueDate
  webUrl
  iterationCadence {
    id
    title
    __typename
  }
  __typename
}`;
const iterationQuery = `query issueIterationsAliased($fullPath: ID!, $title: String, $state: IterationState) {
  workspace: group(fullPath: $fullPath) {
    id
    attributes: iterations(
      search: $title
      in: [TITLE, CADENCE_TITLE]
      state: $state
    ) {
      nodes {
        ...IterationFragment
        state
        __typename
      }
      __typename
    }
    __typename
  }
}
${iterationFragment}
`;

// apps/gitlab-plus/src/providers/IterationsProvider.ts
class IterationsProvider extends GitlabProvider {
  async getIterations(projectId, title = '') {
    return this.queryCached(
      `iterations-${projectId}-search-${title}`,
      iterationQuery,
      {
        fullPath: projectId,
        state: 'opened',
        title,
      },
      title !== '' ? 0.5 : 20
    );
  }
}

// apps/gitlab-plus/src/components/create-issue/fields/IterationField.tsx
function iterationName(iteration) {
  const start = new Date(iteration.startDate).toLocaleDateString();
  const end = new Date(iteration.dueDate).toLocaleDateString();
  return `${iteration.iterationCadence.title}: ${start} - ${end}`;
}

function IterationField({ link, setValue, value }) {
  const getUsers = useCallback(
    async (search) => {
      const response = await new IterationsProvider().getIterations(
        link.workspacePath,
        search
      );
      return response.data.workspace.attributes.nodes
        .map((iteration) => ({
          ...iteration,
          name: iterationName(iteration),
        }))
        .toSorted((a, b) => a.name.localeCompare(b.name));
    },
    [link]
  );
  const renderLabel = useCallback(([item]) => {
    return item ? item.name : 'Select iteration';
  }, []);
  const renderOption = useCallback((item) => {
    return jsx('span', {
      class: 'gl-new-dropdown-item-text-wrapper',
      children: jsx('span', {
        class: 'gl-flex gl-w-full gl-items-center',
        children: jsx('span', {
          class: 'gl-mr-2 gl-block',
          children: item.name,
        }),
      }),
    });
  }, []);
  return jsx(AsyncAutocomplete, {
    getValues: getUsers,
    name: 'iterations',
    onChange: setValue,
    renderLabel,
    renderOption,
    value,
  });
}

// apps/gitlab-plus/src/providers/query/label.ts
const labelFragment = `
  fragment Label on Label {
    id
    title
    description
    color
    textColor
    __typename
  }
`;
const labelsQuery = `query projectLabels($fullPath: ID!, $searchTerm: String) {
  workspace: project(fullPath: $fullPath) {
    id
    labels(searchTerm: $searchTerm, includeAncestorGroups: true) {
      nodes {
        ...Label
        __typename
      }
      __typename
    }
    __typename
  }
}

${labelFragment}
`;

// apps/gitlab-plus/src/providers/LabelsProvider.ts
class LabelsProvider extends GitlabProvider {
  async getLabels(projectId, search = '') {
    return this.queryCached(
      `labels-${projectId}-${search}`,
      labelsQuery,
      {
        fullPath: projectId,
        searchTerm: search,
      },
      search === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/common/GitlabLabel.tsx
function GitlabLabel({ label, onRemove }) {
  const [scope, text] = label.title.split('::');
  const props = useMemo(() => {
    const className = [
      'gl-label',
      'hide-collapsed',
      label.textColor === '#FFFFFF'
        ? 'gl-label-text-light'
        : 'gl-label-text-dark',
    ];
    if (label.title.includes('::')) {
      className.push('gl-label-scoped');
    }
    return {
      class: clsx(className),
      style: {
        '--label-background-color': label.color,
        '--label-inset-border': `inset 0 0 0 2px ${label.color}`,
      },
    };
  }, [label]);
  return jsxs('span', {
    class: props.class,
    style: props.style,
    children: [
      jsxs('span', {
        class: 'gl-link gl-label-link gl-label-link-underline',
        children: [
          jsx('span', { class: 'gl-label-text', children: scope }),
          text &&
            jsx('span', { class: 'gl-label-text-scoped', children: text }),
        ],
      }),
      onRemove &&
        jsx('button', {
          onClick: onRemove,
          type: 'button',
          class:
            'btn gl-label-close !gl-p-0 btn-reset btn-sm gl-button btn-reset-tertiary',
          children: jsx('span', {
            class: 'gl-button-text',
            children: jsx(GitlabIcon, { icon: 'close-xs' }),
          }),
        }),
    ],
  });
}

// apps/gitlab-plus/src/components/create-issue/fields/LabelsField.tsx
function LabelField({ copyLabels, copyLoading, projectPath, setValue, value }) {
  const getLabels = useCallback(
    async (search) => {
      if (!projectPath) {
        return [];
      }
      const response = await new LabelsProvider().getLabels(
        projectPath,
        search
      );
      return response.data.workspace.labels.nodes;
    },
    [projectPath]
  );
  const renderLabel = useCallback((items) => {
    return items.length
      ? items.map((i) => i.title).join(', ')
      : 'Select labels';
  }, []);
  const renderOption = useCallback((item) => {
    return jsxs('div', {
      class: 'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3',
      children: [
        jsx('span', {
          class: 'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0',
          style: { backgroundColor: item.color },
        }),
        jsx('span', { children: item.title }),
      ],
    });
  }, []);
  return jsxs(Fragment, {
    children: [
      jsx('div', {
        class: 'gl-mt-1 gl-pb-2 gl-flex gl-flex-wrap gl-gap-2',
        children: value.map((label) =>
          jsx(
            GitlabLabel,
            {
              label,
              onRemove: () =>
                setValue(value.filter((item) => label.id !== item.id)),
            },
            label.id
          )
        ),
      }),
      jsxs('div', {
        className: 'gl-flex gl-gap-1 gl-relative gl-pr-7',
        children: [
          jsx(AsyncAutocomplete, {
            getValues: getLabels,
            isDisabled: !projectPath,
            name: 'labels',
            onChange: setValue,
            renderLabel,
            renderOption,
            value,
            isMultiselect: true,
          }),
          jsx('div', {
            className: 'gl-flex gl-absolute gl-h-full gl-right-0',
            children: jsx(GitlabButton, {
              icon: 'labels',
              isLoading: copyLoading,
              onClick: copyLabels,
              title: 'Copy labels from parent',
            }),
          }),
        ],
      }),
    ],
  });
}

// apps/gitlab-plus/src/providers/query/milestone.ts
const milestoneQuery = `query projectMilestones($fullPath: ID!, $title: String, $state: MilestoneStateEnum) {
  workspace: project(fullPath: $fullPath) {
    id
    attributes: milestones(
      searchTitle: $title
      state: $state
      sort: EXPIRED_LAST_DUE_DATE_ASC
      first: 20
      includeAncestors: true
    ) {
      nodes {
        ...MilestoneFragment
        state
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment MilestoneFragment on Milestone {
  id
  iid
  title
  webUrl: webPath
  dueDate
  expired
  __typename
}

`;

// apps/gitlab-plus/src/providers/MilestonesProvider.ts
class MilestonesProvider extends GitlabProvider {
  async getMilestones(projectId, title = '') {
    return this.queryCached(
      `milestones-${projectId}-${title}`,
      milestoneQuery,
      {
        fullPath: projectId,
        state: 'active',
        title,
      },
      title === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/create-issue/fields/MilestoneField.tsx
function MilestoneField({ projectPath, setValue, value }) {
  const getMilestones = useCallback(
    async (search) => {
      if (!projectPath) {
        return [];
      }
      const response = await new MilestonesProvider().getMilestones(
        projectPath,
        search
      );
      return response.data.workspace.attributes.nodes;
    },
    [projectPath]
  );
  const renderLabel = useCallback(([item]) => {
    return item ? item.title : 'Select milestone';
  }, []);
  const renderOption = useCallback((item) => {
    return jsx('span', {
      class: 'gl-new-dropdown-item-text-wrapper',
      children: jsx('span', {
        class: 'gl-flex gl-w-full gl-items-center',
        children: jsx('span', {
          class: 'gl-mr-2 gl-block',
          children: item.title,
        }),
      }),
    });
  }, []);
  return jsx(AsyncAutocomplete, {
    getValues: getMilestones,
    isDisabled: !projectPath,
    name: 'milestones',
    onChange: setValue,
    renderLabel,
    renderOption,
    value,
  });
}

// apps/gitlab-plus/src/providers/query/project.ts
const projectsQuery = `query boardsGetGroupProjects($fullPath: ID!, $search: String, $after: String) {
  group(fullPath: $fullPath) {
    id
    projects(search: $search, after: $after, first: 100, includeSubgroups: true) {
      nodes {
        id
        name
        avatarUrl
        fullPath
        nameWithNamespace
        archived
        __typename
      }
      pageInfo {
        ...PageInfo
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment PageInfo on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
  __typename
}

`;

// apps/gitlab-plus/src/providers/ProjectsProvider.ts
class ProjectsProvider extends GitlabProvider {
  async getProjects(workspacePath, search = '') {
    return this.queryCached(
      `projects-${workspacePath}-${search}`,
      projectsQuery,
      {
        fullPath: workspacePath,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/common/GitlabProject.tsx
function GitlabProject({ project, size = 32 }) {
  return jsxs('span', {
    class: 'gl-flex gl-w-full gl-items-center',
    children: [
      project.avatarUrl
        ? jsx('img', {
            alt: project.name,
            class: `gl-mr-3 gl-avatar gl-avatar-s${size}`,
            src: project.avatarUrl,
          })
        : jsx('div', {
            class: `gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s${size} gl-avatar-identicon-bg1`,
            children: project.name[0].toUpperCase(),
          }),
      jsxs('span', {
        children: [
          jsx('span', { class: 'gl-mr-2 gl-block', children: project.name }),
          jsx('span', {
            class: 'gl-block gl-text-secondary !gl-text-sm',
            children: project.nameWithNamespace,
          }),
        ],
      }),
    ],
  });
}

// apps/gitlab-plus/src/components/create-issue/fields/ProjectField.tsx
function ProjectField({ link, setValue, value }) {
  const getProjects = useCallback(
    async (search) => {
      const response = await new ProjectsProvider().getProjects(
        link.workspacePath,
        search
      );
      return response.data.group.projects.nodes;
    },
    [link]
  );
  const renderLabel = useCallback(([item]) => {
    return item ? item.nameWithNamespace : 'Select project';
  }, []);
  const renderOption = useCallback((item) => {
    return jsx('span', {
      class: 'gl-new-dropdown-item-text-wrapper',
      children: jsx(GitlabProject, { project: item }),
    });
  }, []);
  return jsx(AsyncAutocomplete, {
    getValues: getProjects,
    name: 'projects',
    onChange: setValue,
    renderLabel,
    renderOption,
    value,
  });
}

// apps/gitlab-plus/src/types/Issue.ts
const issueRelation = ['blocks', 'is_blocked_by', 'relates_to'];

// apps/gitlab-plus/src/components/create-issue/fields/RelationField.tsx
const labels = (relation) => {
  switch (relation) {
    case 'blocks':
      return 'blocks current issue';
    case 'is_blocked_by':
      return 'is blocked by current issue';
    case 'relates_to':
      return 'relates to current issue';
    default:
      return 'is not related to current issue';
  }
};

function RelationField({ setValue, value }) {
  return jsx('div', {
    class: 'linked-issue-type-radio',
    children: [...issueRelation, null].map((relation) =>
      jsxs(
        'div',
        {
          class: 'gl-form-radio custom-control custom-radio',
          children: [
            jsx('input', {
              id: `create-related-issue-relation-${relation}`,
              checked: value === relation,
              class: 'custom-control-input',
              name: 'linked-issue-type-radio',
              onChange: () => setValue(relation),
              type: 'radio',
              value: relation ?? '',
            }),
            jsx('label', {
              class: 'custom-control-label',
              for: `create-related-issue-relation-${relation}`,
              children: labels(relation),
            }),
          ],
        },
        relation
      )
    ),
  });
}

// apps/gitlab-plus/src/components/create-issue/fields/TitleField.tsx
function TitleField({ error, onChange, value }) {
  return jsx('input', {
    onInput: (e) => onChange(e.target.value),
    placeholder: 'Add a title',
    value,
    class: clsx(
      'gl-form-input form-control',
      error && 'gl-field-error-outline'
    ),
  });
}

// apps/gitlab-plus/src/helpers/LinkParser.ts
class LinkParser {
  static isEpicLink(link) {
    return link.epic !== void 0;
  }

  static isIssueLink(link) {
    return link.issue !== void 0;
  }

  static isMrLink(link) {
    return link.mr !== void 0;
  }

  static parseEpicLink(link) {
    if (LinkParser.validateEpicLink(link)) {
      return LinkParser.parseGitlabLink(
        link,
        /\/groups\/(?<workspacePath>.+)\/-\/epics\/(?<epic>\d+)/
      );
    }
    return void 0;
  }

  static parseGitlabLink(link, pattern) {
    const url = new URL(link);
    const result = url.pathname.match(pattern);
    if (result && result.groups) {
      return result.groups;
    }
    return void 0;
  }

  static parseIssueLink(link) {
    if (LinkParser.validateIssueLink(link)) {
      return LinkParser.parseGitlabLink(
        link,
        /\/(?<projectPath>(?<workspacePath>.+)\/[^/]+)\/-\/issues\/(?<issue>\d+)/
      );
    }
    return void 0;
  }

  static parseMrLink(link) {
    if (LinkParser.validateMrLink(link)) {
      return LinkParser.parseGitlabLink(
        link,
        /\/(?<projectPath>(?<workspacePath>.+)\/[^/]+)\/-\/merge_requests\/(?<mr>\d+)/
      );
    }
    return void 0;
  }

  static validateEpicLink(link) {
    return LinkParser.validateGitlabLink(link, 'epics');
  }

  static validateGitlabLink(link, type) {
    return Boolean(typeof link === 'string' && link.includes(`/-/${type}/`));
  }

  static validateIssueLink(link) {
    return LinkParser.validateGitlabLink(link, 'issues');
  }

  static validateMrLink(link) {
    return LinkParser.validateGitlabLink(link, 'merge_requests');
  }
}

// apps/gitlab-plus/src/providers/query/epic.ts
const epicQuery = `query namespaceWorkItem($fullPath: ID!, $iid: String!) {
  workspace: namespace(fullPath: $fullPath) {
    id
    workItem(iid: $iid) {
      ...WorkItem
      __typename
    }
    __typename
  }
}

fragment WorkItem on WorkItem {
  id
  iid
  archived
  title
  state
  description
  confidential
  createdAt
  closedAt
  webUrl
  reference(full: true)
  createNoteEmail
  project {
    id
    __typename
  }
  namespace {
    id
    fullPath
    name
    fullName
    __typename
  }
  author {
    ...Author
    __typename
  }

  workItemType {
    id
    name
    iconName
    __typename
  }
  userPermissions {
    deleteWorkItem
    updateWorkItem
    adminParentLink
    setWorkItemMetadata
    createNote
    adminWorkItemLink
    markNoteAsInternal
    reportSpam
    __typename
  }
  widgets {
    ...WorkItemWidgets
    __typename
  }
  __typename
}

fragment WorkItemWidgets on WorkItemWidget {
  type
    ... on WorkItemWidgetHierarchy {
    hasChildren
    children(first: 100) {
      count
      nodes {
        id
        iid
        title
        state
        webUrl
      }
    }
  }
  ... on WorkItemWidgetAssignees {
    assignees {
      nodes {
        ...User
      }
    }
  }
  ... on WorkItemWidgetLabels {
    labels {
      nodes {
        ...Label
      }
    }
  }
  ... on WorkItemWidgetStartAndDueDate {
    dueDate
    startDate
    rollUp
    isFixed
    __typename
  }
  ... on WorkItemWidgetProgress {
    progress
    updatedAt
    __typename
  }
  ... on WorkItemWidgetIteration {
    iteration {
      id
      title
      startDate
      dueDate
      webUrl
      iterationCadence {
        id
        title
      }
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetMilestone {
    milestone {
      ...MilestoneFragment
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetNotes {
    discussionLocked
    __typename
  }
  ... on WorkItemWidgetHealthStatus {
    healthStatus
    rolledUpHealthStatus {
      count
      healthStatus
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetNotifications {
    subscribed
    __typename
  }
  ... on WorkItemWidgetCurrentUserTodos {
    currentUserTodos(state: pending) {
      nodes {
        id
        __typename
      }
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetColor {
    color
    textColor
    __typename
  }
  ... on WorkItemWidgetLinkedItems {
    linkedItems {
      nodes {
        linkId
        linkType
        __typename
      }
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetCrmContacts {
    contacts {
      nodes {
        id
        email
        firstName
        lastName
        phone
        description
        organization {
          id
          name
          description
          defaultRate
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment User on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}

fragment MilestoneFragment on Milestone {
  expired
  id
  title
  state
  startDate
  dueDate
  webPath
  __typename
}

fragment Author on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}

${labelFragment}
`;

// apps/gitlab-plus/src/providers/EpicProvider.ts
class EpicProvider extends GitlabProvider {
  async getEpic(workspacePath, epicId) {
    return this.queryCached(
      `epic-${workspacePath}-${epicId}`,
      epicQuery,
      {
        iid: epicId,
        cursor: '',
        fullPath: workspacePath,
        pageSize: 50,
      },
      2
    );
  }
}

// apps/gitlab-plus/src/providers/query/issue.ts
const issueQuery = `query issueEE($projectPath: ID!, $iid: String!) {
  project(fullPath: $projectPath) {
    id
    issue(iid: $iid) {
      id
      iid
      title
      description
      createdAt
      state
      confidential
      dueDate
      milestone {
        id
        title
        startDate
        dueDate
        __typename
      }
      epic {
        iid
        title
      }
      iteration {
        id
        title
        startDate
        dueDate
        iterationCadence {
          id
          title
          __typename
        }
        __typename
      }
      labels {
        nodes {
          ...Label
        }
      }
      relatedMergeRequests {
        nodes {
          iid
          title
          state
          webUrl
          author {
            ...User
          }
        }
      }
      assignees {
        nodes {
          ...User
        }
      }
      author {
        ...User
      }
      weight
      type
      __typename
    }
    __typename
  }
}

${labelFragment}
${userFragment}
`;
const issuesQuery = `query groupWorkItems($searchTerm: String, $fullPath: ID!, $types: [IssueType!], $in: [IssuableSearchableField!], $includeAncestors: Boolean = false, $includeDescendants: Boolean = false, $iid: String = null, $searchByIid: Boolean = false, $searchByText: Boolean = true, $searchEmpty: Boolean = true) {
  workspace: group(fullPath: $fullPath) {
    id
    workItems(
      search: $searchTerm
      types: $types
      in: $in
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByText) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    workItemsByIid: workItems(
      iid: $iid
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByIid) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    workItemsEmpty: workItems(
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchEmpty) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`;
const issueMutation = `
mutation CreateIssue($input: CreateIssueInput!) {
  createIssuable: createIssue(input: $input) {
    issuable: issue {
      ...Issue
      __typename
    }
    errors
    __typename
  }
}

fragment Issue on Issue {
  ...IssueNode
  id
  weight
  blocked
  blockedByCount
  epic {
    id
    __typename
  }
  iteration {
    id
    title
    startDate
    dueDate
    iterationCadence {
      id
      title
      __typename
    }
    __typename
  }
  healthStatus
  __typename
}

fragment IssueNode on Issue {
  id
  iid
  title
  referencePath: reference(full: true)
  closedAt
  dueDate
  timeEstimate
  totalTimeSpent
  humanTimeEstimate
  humanTotalTimeSpent
  emailsDisabled
  confidential
  hidden
  webUrl
  relativePosition
  projectId
  type
  severity
  milestone {
    ...MilestoneFragment
    __typename
  }
  assignees {
    nodes {
      ...User
      __typename
    }
    __typename
  }
  labels {
    nodes {
      id
      title
      color
      description
      __typename
    }
    __typename
  }
  __typename
}

fragment MilestoneFragment on Milestone {
  expired
  id
  state
  title
  __typename
}

fragment User on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}
`;
const issueSetEpicMutation = `
mutation projectIssueUpdateParent($input: WorkItemUpdateInput!) {
  issuableSetAttribute: workItemUpdate(input: $input) {
    workItem {
      id
      widgets {
        ... on WorkItemWidgetHierarchy {
          type
          parent {
            id
            title
            webUrl
          }
        }
      }
    }
    errors
  }
}
`;
const issueSetLabelsMutation = `
mutation issueSetLabels($input: UpdateIssueInput!) {
  updateIssuableLabels: updateIssue(input: $input) {
    issuable: issue {
      id
      labels {
        nodes {
          ...Label
          __typename
        }
        __typename
      }
      __typename
    }
    errors
    __typename
  }
}

${labelFragment}
`;

// apps/gitlab-plus/src/providers/IssueProvider.ts
class IssueProvider extends GitlabProvider {
  async createIssue(input) {
    return await this.query(issueMutation, { input });
  }

  async createIssueRelation(input) {
    const path = [
      'projects/:PROJECT_ID',
      '/issues/:ISSUE_ID/links',
      '?target_project_id=:TARGET_PROJECT_ID',
      '&target_issue_iid=:TARGET_ISSUE_IID',
      '&link_type=:LINK_TYPE',
    ]
      .join('')
      .replace(':PROJECT_ID', `${input.projectId}`)
      .replace(':ISSUE_ID', `${input.issueId}`)
      .replace(':TARGET_PROJECT_ID', input.targetProjectId)
      .replace(':TARGET_ISSUE_IID', input.targetIssueIid)
      .replace(':LINK_TYPE', input.linkType);
    return await this.post(path, {});
  }

  async getIssue(projectId, issueId) {
    return this.queryCached(
      `issue-${projectId}-${issueId}`,
      issueQuery,
      {
        iid: issueId,
        projectPath: projectId,
      },
      2
    );
  }

  async getIssueLinks(projectId, issueId) {
    const path = 'projects/:PROJECT_ID/issues/:ISSUE_ID/links'
      .replace(':PROJECT_ID', projectId.replaceAll('/', '%2F'))
      .replace(':ISSUE_ID', `${issueId}`);
    return await this.getCached(`issue-${projectId}-${issueId}-links`, path, 2);
  }

  async getIssues(projectId, search) {
    const searchById = !!search.match(/^\d+$/);
    return await this.query(issuesQuery, {
      iid: searchById ? search : null,
      searchByIid: searchById,
      fullPath: projectId,
      in: 'TITLE',
      includeAncestors: true,
      includeDescendants: true,
      searchByText: Boolean(search),
      searchEmpty: !search,
      searchTerm: search,
      types: ['ISSUE'],
    });
  }

  async issueSetEpic(issueId, epicId) {
    return await this.query(issueSetEpicMutation, {
      input: {
        hierarchyWidget: {
          parentId: epicId,
        },
        id: issueId,
      },
    });
  }

  async issueSetLabels(input) {
    return await this.query(issueSetLabelsMutation, {
      input,
    });
  }
}

// apps/gitlab-plus/src/components/create-issue/useCreateIssueForm.ts
const initialState = () => ({
  assignees: [],
  iteration: null,
  labels: [],
  milestone: null,
  project: null,
  relation: null,
  title: '',
});
const initialError = () => ({
  assignees: void 0,
  iteration: void 0,
  labels: void 0,
  milestone: void 0,
  project: void 0,
  relation: void 0,
  title: void 0,
});

function useCreateIssueForm({ isVisible, link, onClose }) {
  let _a;
  const [copyLabelsLoading, setCopyLabelsLoading] = useState(false);
  const [values, setValues] = useState(initialState());
  const [errors, setErrors] = useState(initialError());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const reset = () => {
    setIsLoading(false);
    setValues(initialState());
    setErrors(initialError());
  };
  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);
  const createPayload = () => {
    const data = {
      projectPath: values.project.fullPath,
      title: values.title,
    };
    if (values.milestone) {
      data['milestoneId'] = values.milestone.id;
    }
    if (values.iteration) {
      data['iterationId'] = values.iteration.id;
      data['iterationCadenceId'] = values.iteration.iterationCadence.id;
    }
    if (values.assignees) {
      data['assigneeIds'] = values.assignees.map((a) => a.id);
    }
    data['labelIds'] = values.labels.map((label) => label.id);
    return data;
  };
  const persistRecently = () => {
    Object.entries({
      assignees: values.assignees,
      iterations: values.iteration ? [values.iteration] : [],
      labels: values.labels,
      milestones: values.milestone ? [values.milestone] : [],
      projects: values.project ? [values.project] : [],
    }).map(([key, values2]) => {
      new RecentlyProvider(key).add(...values2);
    });
  };
  const validate = () => {
    let isValid = true;
    const errors2 = {};
    if (values.title.length < 1) {
      errors2.title = 'Title is required';
      isValid = false;
    } else if (values.title.length > 255) {
      errors2.title = 'Title is too long';
      isValid = false;
    }
    if (!values.project) {
      errors2.project = 'Project must be selected';
      isValid = false;
    }
    setErrors((prev) => ({ ...prev, ...errors2 }));
    return isValid;
  };
  const createIssue = async (payload) => {
    return await new IssueProvider().createIssue(payload);
  };
  const createRelation = async (link2, issue, relation) => {
    await new IssueProvider().createIssueRelation({
      targetIssueIid: link2.issue,
      issueId: issue.iid,
      linkType: relation,
      projectId: issue.projectId,
      targetProjectId: link2.projectPath.replace(/\//g, '%2F'),
    });
  };
  const setIssueEpic = async (link2, issue) => {
    const epic = await new EpicProvider().getEpic(
      link2.workspacePath,
      link2.epic
    );
    await new IssueProvider().issueSetEpic(
      issue.id,
      epic.data.workspace.workItem.id
    );
  };
  const submit = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    try {
      const payload = createPayload();
      const response = await createIssue(payload);
      setMessage('Issue was created');
      persistRecently();
      if (values.relation && LinkParser.isIssueLink(link)) {
        await createRelation(
          link,
          response.data.createIssuable.issuable,
          values.relation
        );
      }
      if (LinkParser.isEpicLink(link)) {
        await setIssueEpic(link, response.data.createIssuable.issuable);
      }
      window.setTimeout(() => onClose(), 3e3);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };
  return {
    actions: {
      reset,
      submit,
    },
    error,
    form: {
      assignees: {
        errors: errors.assignees,
        onChange: (assignees) => setValues({ ...values, assignees }),
        value: values.assignees,
      },
      iteration: {
        errors: errors.iteration,
        onChange: ([iteration]) =>
          setValues({ ...values, iteration: iteration ?? null }),
        value: values.iteration ? [values.iteration] : [],
      },
      labels: {
        copy: async () => {
          setCopyLabelsLoading(true);
          try {
            if (LinkParser.isEpicLink(link)) {
              const epic = await new EpicProvider().getEpic(
                link.workspacePath,
                link.epic
              );
              const labelWidgets = epic.data.workspace.workItem.widgets.find(
                (w) => w.type === 'LABELS'
              );
              if (labelWidgets) {
                setValues({
                  ...values,
                  labels: labelWidgets.labels.nodes,
                });
              }
            }
            if (LinkParser.isIssueLink(link)) {
              const issue = await new IssueProvider().getIssue(
                link.projectPath,
                link.issue
              );
              setValues({
                ...values,
                labels: issue.data.project.issue.labels.nodes,
              });
            }
          } catch (e) {
            console.error(e);
          }
          setCopyLabelsLoading(false);
        },
        copyLoading: copyLabelsLoading,
        errors: errors.labels,
        onChange: (labels2) => setValues({ ...values, labels: labels2 }),
        value: values.labels,
      },
      milestone: {
        errors: errors.milestone,
        onChange: ([milestone]) =>
          setValues({ ...values, milestone: milestone ?? null }),
        value: values.milestone ? [values.milestone] : [],
      },
      project: {
        errors: errors.project,
        onChange: ([project]) =>
          setValues({ ...values, project: project ?? null }),
        value: values.project ? [values.project] : [],
      },
      relation: {
        errors: errors.relation,
        onChange: (relation) => setValues({ ...values, relation }),
        value: values.relation,
      },
      title: {
        copy: () => {
          const issueTitle =
            document.querySelector('[data-testid="issue-title"]') ||
            document.querySelector('[data-testid="work-item-title"]');
          if (issueTitle) {
            setValues({ ...values, title: issueTitle.textContent || '' });
          }
        },
        errors: errors.title,
        onChange: (title) => setValues({ ...values, title }),
        value: values.title,
      },
    },
    isLoading,
    message,
    projectPath: (_a = values.project) == null ? void 0 : _a.fullPath,
    showRelations: LinkParser.isIssueLink(link),
  };
}

// apps/gitlab-plus/src/components/create-issue/CreateIssueForm.tsx
function CreateIssueForm({ isVisible, link, onClose }) {
  const {
    actions,
    error,
    form,
    isLoading,
    message,
    projectPath,
    showRelations,
  } = useCreateIssueForm({ isVisible, link, onClose });
  return jsxs('form', {
    class: 'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form',
    children: [
      jsx(FormField, {
        error: form.title.errors,
        hint: 'Maximum of 255 characters',
        title: 'Title',
        children: jsxs('div', {
          className: 'gl-flex gl-gap-1',
          children: [
            jsx(TitleField, {
              error: form.title.errors,
              onChange: form.title.onChange,
              value: form.title.value,
            }),
            jsx(GitlabButton, {
              icon: 'title',
              onClick: form.title.copy,
              title: 'Copy from parent title',
            }),
          ],
        }),
      }),
      jsxs(FormRow, {
        children: [
          jsx(FormField, {
            error: form.project.errors,
            title: 'Project',
            children: jsx(ProjectField, {
              link,
              setValue: form.project.onChange,
              value: form.project.value,
            }),
          }),
          jsx(FormField, {
            error: form.assignees.errors,
            title: 'Assignees',
            children: jsx(AssigneesField, {
              projectPath,
              setValue: form.assignees.onChange,
              value: form.assignees.value,
            }),
          }),
        ],
      }),
      jsxs(FormRow, {
        children: [
          jsx(FormField, {
            error: form.iteration.errors,
            title: 'Iteration',
            children: jsx(IterationField, {
              link,
              setValue: form.iteration.onChange,
              value: form.iteration.value,
            }),
          }),
          jsx(FormField, {
            error: form.milestone.errors,
            title: 'Milestone',
            children: jsx(MilestoneField, {
              projectPath,
              setValue: form.milestone.onChange,
              value: form.milestone.value,
            }),
          }),
        ],
      }),
      jsx(FormField, {
        error: form.labels.errors,
        title: 'Labels',
        children: jsx(LabelField, {
          copyLabels: form.labels.copy,
          copyLoading: form.labels.copyLoading,
          projectPath,
          setValue: form.labels.onChange,
          value: form.labels.value,
        }),
      }),
      showRelations &&
        jsx(FormField, {
          error: form.relation.errors,
          title: 'New issue',
          children: jsx(RelationField, {
            setValue: form.relation.onChange,
            value: form.relation.value,
          }),
        }),
      jsx(FormField, {
        error,
        hint: message,
        title: '',
        children: jsx(FormRow, {
          children: jsx(ButtonField, {
            create: actions.submit,
            isLoading,
            reset: actions.reset,
          }),
        }),
      }),
    ],
  });
}

// apps/gitlab-plus/src/components/create-issue/events.ts
const showRelatedIssueModal = 'glp-show-create-issue-modal';
const showChildIssueModal = 'glp-show-create-child-issue-modal';
const ShowRelatedIssueModalEvent = new CustomEvent(showRelatedIssueModal);
const ShowChildIssueModalEvent = new CustomEvent(showChildIssueModal);

// apps/gitlab-plus/src/components/create-issue/CreateChildIssueModal.tsx
function CreateChildIssueModal({ link }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    document.addEventListener(showChildIssueModal, () => setIsVisible(true));
  }, []);
  return jsx('div', {
    class: clsx(
      'glp-create-related-issue-layer',
      isVisible && 'glp-modal-visible'
    ),
    children: jsxs('div', {
      className: clsx(
        'glp-create-related-issue-modal crud gl-border',
        'gl-rounded-form gl-border-section gl-bg-subtle gl-mt-5'
      ),
      children: [
        jsxs('div', {
          className: clsx(
            'crud-header gl-border-b gl-flex gl-flex-wrap',
            'gl-justify-between gl-gap-x-5 gl-gap-y-2 gl-rounded-t-form',
            'gl-border-section gl-bg-section gl-px-5 gl-py-4 gl-relative'
          ),
          children: [
            jsx('h2', {
              className: clsx(
                'gl-m-0 gl-inline-flex gl-items-center gl-gap-3',
                'gl-text-form gl-font-bold gl-leading-normal'
              ),
              children: 'Create child issue',
            }),
            jsx(CloseButton, { onClick: () => setIsVisible(false) }),
          ],
        }),
        jsx(CreateIssueForm, {
          isVisible,
          link,
          onClose: () => setIsVisible(false),
        }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/services/CreateChildIssue.tsx
class CreateChildIssue extends Service {
  constructor() {
    super();
    __publicField(this, 'isMounted', false);
  }

  init() {
    this.mount();
    setTimeout(this.mount.bind(this), 1e3);
    setTimeout(this.mount.bind(this), 3e3);
  }

  mount() {
    if (this.isMounted) {
      return;
    }
    const link = LinkParser.parseEpicLink(window.location.href);
    const parent = document.querySelector(
      '#childitems [data-testid="crud-actions"]'
    );
    if (!link || !parent) {
      return;
    }
    this.isMounted = true;
    render(
      jsx(GitlabButton, {
        onClick: () => document.dispatchEvent(ShowChildIssueModalEvent),
        children: 'Create child item',
      }),
      this.root('glp-child-issue-button', parent, true)
    );
    render(
      jsx(CreateChildIssueModal, { link }),
      this.rootBody('glp-child-issue-modal')
    );
  }
}

// apps/gitlab-plus/src/components/create-issue/CreateRelatedIssueModal.tsx
function CreateRelatedIssueModal({ link }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    document.addEventListener(showRelatedIssueModal, () => setIsVisible(true));
  }, []);
  return jsx('div', {
    class: clsx(
      'glp-create-related-issue-layer',
      isVisible && 'glp-modal-visible'
    ),
    children: jsxs('div', {
      className: clsx(
        'glp-create-related-issue-modal crud gl-border',
        'gl-rounded-form gl-border-section gl-bg-subtle gl-mt-5'
      ),
      children: [
        jsxs('div', {
          className: clsx(
            'crud-header gl-border-b gl-flex gl-flex-wrap',
            'gl-justify-between gl-gap-x-5 gl-gap-y-2 gl-rounded-t-form',
            'gl-border-section gl-bg-section gl-px-5 gl-py-4 gl-relative'
          ),
          children: [
            jsx('h2', {
              className: clsx(
                'gl-m-0 gl-inline-flex gl-items-center gl-gap-3',
                'gl-text-form gl-font-bold gl-leading-normal'
              ),
              children: 'Create related issue',
            }),
            jsx(CloseButton, { onClick: () => setIsVisible(false) }),
          ],
        }),
        jsx(CreateIssueForm, {
          isVisible,
          link,
          onClose: () => setIsVisible(false),
        }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/services/CreateRelatedIssue.tsx
class CreateRelatedIssue extends Service {
  constructor() {
    super();
    __publicField(this, 'isMounted', false);
  }

  init() {
    this.mount();
    setTimeout(this.mount.bind(this), 1e3);
    setTimeout(this.mount.bind(this), 3e3);
  }

  mount() {
    if (this.isMounted) {
      return;
    }
    const link = LinkParser.parseIssueLink(window.location.href);
    const parent = document.querySelector(
      '#related-issues [data-testid="crud-actions"]'
    );
    if (!link || !parent) {
      return;
    }
    this.isMounted = true;
    render(
      jsx(GitlabButton, {
        onClick: () => document.dispatchEvent(ShowRelatedIssueModalEvent),
        children: 'Create related issue',
      }),
      this.root('glp-related-issue-button', parent)
    );
    render(
      jsx(CreateRelatedIssueModal, { link }),
      this.rootBody('glp-related-issue-modal')
    );
  }
}

// libs/share/src/ui/Events.ts
class Events {
  static intendHover(validate, mouseover, mouseleave, timeout = 500) {
    let hover = false;
    let id = 0;
    const onHover = (event) => {
      if (!event.target || !validate(event.target)) {
        return;
      }
      const element = event.target;
      hover = true;
      element.addEventListener(
        'mouseleave',
        (ev) => {
          mouseleave == null ? void 0 : mouseleave.call(element, ev);
          clearTimeout(id);
          hover = false;
        },
        { once: true }
      );
      clearTimeout(id);
      id = window.setTimeout(() => {
        if (hover) {
          mouseover.call(element, event);
        }
      }, timeout);
    };
    document.body.addEventListener('mouseover', onHover);
  }
}

// apps/gitlab-plus/src/components/common/useOnLinkHover.ts
function useOnLinkHover(parser, validator) {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoverLink, setHoverLink] = useState();
  const hoverLinkRef = useRef(false);
  const onHover = (event) => {
    const anchor = event.target;
    const link = parser(anchor.href);
    if (!link) {
      return;
    }
    anchor.title = '';
    setHoverLink(link);
    setHoverPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };
  useEffect(() => {
    Events.intendHover(
      (element) => validator(element.href),
      onHover,
      () => {
        setTimeout(() => {
          if (!hoverLinkRef.current) {
            setHoverLink(void 0);
          }
        }, 50);
      }
    );
  }, []);
  return {
    hoverLink,
    hoverPosition,
    onLinkEnter: () => (hoverLinkRef.current = true),
    onLinkLeave: () => {
      hoverLinkRef.current = false;
      setHoverLink(void 0);
    },
  };
}

// apps/gitlab-plus/src/components/common/usePreviewModal.ts
function usePreviewModal(link, fetch2, reset, isLoading) {
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        const rect = ref.current.getBoundingClientRect();
        const dY = rect.height + rect.top - window.innerHeight;
        const dX = rect.width + rect.left - window.innerWidth;
        setOffset({
          x: dX > 0 ? dX + 15 : 0,
          y: dY > 0 ? dY + 15 : 0,
        });
      }, 300);
    }
  }, [isLoading]);
  useEffect(() => {
    if (!isVisible) {
      setOffset({ x: 0, y: 0 });
    }
  }, [isVisible]);
  useEffect(() => {
    if (link) {
      fetch2(link);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      reset();
    }
  }, [link]);
  return {
    isVisible,
    offset,
    ref,
  };
}

// apps/gitlab-plus/src/components/common/PreviewModal.tsx
function PreviewModal({
  validator,
  children,
  fetch: fetch2,
  isError,
  isLoading = false,
  parser,
  reset,
}) {
  const { hoverLink, hoverPosition, onLinkEnter, onLinkLeave } = useOnLinkHover(
    parser,
    validator
  );
  const { isVisible, offset, ref } = usePreviewModal(
    hoverLink,
    fetch2,
    reset,
    isLoading
  );
  const content = useMemo(() => {
    if (isLoading || !isVisible) {
      return jsx('div', {
        class: 'gl-flex gl-flex-1 gl-items-center gl-justify-center',
        children: jsx(GitlabLoader, { size: '3em' }),
      });
    }
    if (isError) {
      return jsx('div', {
        class: 'gl-flex gl-flex-1 gl-items-center gl-justify-center',
        children: jsx('span', { children: 'Error' }),
      });
    }
    return jsx('div', { className: 'gl-flex gl-w-full gl-flex-col', children });
  }, [isLoading, isError, isVisible, children]);
  return jsx('div', {
    onMouseEnter: onLinkEnter,
    onMouseLeave: onLinkLeave,
    ref,
    className: clsx(
      'glp-issue-preview-modal',
      isVisible && 'glp-modal-visible'
    ),
    style: {
      left: hoverPosition.x,
      top: hoverPosition.y,
      transform: `translate(-${offset.x}px, -${offset.y}px )`,
    },
    children: content,
  });
}

// apps/gitlab-plus/src/components/common/base/Row.tsx
function Row({ children, className, gap, items, justify }) {
  return jsx('div', {
    class: clsx(
      'gl-flex gl-flex-row',
      justify && `gl-justify-${justify}`,
      items && `gl-items-${items}`,
      gap && `gl-gap-${gap}`,
      className
    ),
    children,
  });
}

// apps/gitlab-plus/src/components/common/base/Text.tsx
function Text({ children, className, color, size, variant, weight }) {
  return jsx('span', {
    class: clsx(
      size && `gl-text-${size}`,
      weight && `gl-font-${weight}`,
      variant && `gl-text-${variant}`,
      color && `gl-text-${color}`,
      className
    ),
    children,
  });
}

// apps/gitlab-plus/src/components/common/bolck/InfoBlock.tsx
function InfoBlock({ children, className, rightTitle, title }) {
  const HeaderComponent = useMemo(() => {
    const titleComponent = jsx('span', {
      className: 'gl-font-bold gl-leading-20 gl-text-gray-900',
      dangerouslySetInnerHTML: { __html: title },
    });
    if (rightTitle) {
      return jsxs(Row, {
        items: 'center',
        justify: 'between',
        children: [titleComponent, rightTitle],
      });
    }
    return titleComponent;
  }, [title, rightTitle]);
  return jsxs('div', {
    class: 'glp-block',
    children: [HeaderComponent, jsx('div', { class: className, children })],
  });
}

// apps/gitlab-plus/src/components/common/bolck/HeadingBlock.tsx
function HeadingBlock({ author, badge, createdAt, entityId, icon, title }) {
  return jsxs(Fragment, {
    children: [
      jsxs(Row, {
        className: '-gl-mb-2 gl-mt-4',
        items: 'center',
        justify: 'between',
        children: [
          badge,
          jsxs(Text, {
            size: 'sm',
            variant: 'secondary',
            children: ['created at ', new Date(createdAt).toLocaleDateString()],
          }),
        ],
      }),
      jsx(InfoBlock, {
        title,
        children: jsxs(Row, {
          className: 'gl-mt-1',
          items: 'center',
          justify: 'between',
          children: [
            jsxs(Row, {
              items: 'center',
              children: [
                jsx(GitlabIcon, { icon, size: 16 }),
                jsx(Text, {
                  className: 'gl-ml-2',
                  size: 'sm',
                  variant: 'secondary',
                  children: entityId,
                }),
              ],
            }),
            jsxs(Row, {
              items: 'center',
              children: [
                jsx(Text, {
                  className: 'gl-mr-2',
                  size: 'sm',
                  variant: 'secondary',
                  children: 'created by',
                }),
                jsx(GitlabUser, {
                  size: 16,
                  user: author,
                  smallText: true,
                  withLink: true,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}

// apps/gitlab-plus/src/components/common/GitlabBadge.tsx
function GitlabBadge({ icon, label, title, variant }) {
  return jsxs('span', {
    className: `gl-badge badge badge-pill badge-${variant}`,
    title,
    children: [
      icon && jsx(GitlabIcon, { icon }),
      label && jsx('span', { className: 'gl-badge-content', children: label }),
    ],
  });
}

// apps/gitlab-plus/src/components/common/IssueStatus.tsx
function IssueStatus({ isOpen }) {
  return jsx(GitlabBadge, {
    icon: isOpen ? 'issue-open-m' : 'issue-close',
    label: isOpen ? 'Open' : 'Closed',
    variant: isOpen ? 'success' : 'info',
  });
}

// apps/gitlab-plus/src/components/epic-preview/blocks/EpicHeading.tsx
function EpicHeader({ epic }) {
  return jsx(HeadingBlock, {
    author: epic.author,
    badge: jsx(IssueStatus, { isOpen: epic.state === 'OPEN' }),
    createdAt: epic.createdAt,
    entityId: `&${epic.iid}`,
    icon: 'epic',
    title: epic.title,
  });
}

// apps/gitlab-plus/src/components/epic-preview/blocks/EpicLabels.tsx
function EpicLabels({ epic }) {
  const labels2 = useMemo(() => {
    const labelWidget = epic.widgets.find((widget) => widget.type === 'LABELS');
    if (labelWidget) {
      return labelWidget.labels.nodes;
    }
    return [];
  }, [epic]);
  if (!labels2.length) {
    return null;
  }
  return jsx(InfoBlock, {
    className: 'issuable-show-labels',
    title: 'Labels',
    children: labels2.map((label) => jsx(GitlabLabel, { label }, label.id)),
  });
}

// apps/gitlab-plus/src/components/common/base/Link.tsx
function Link({ blockHover, children, className, href, title }) {
  const onHover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };
  return jsx('a', {
    class: clsx('gl-block gl-link sortable-link', className),
    href,
    onMouseOver: blockHover ? onHover : void 0,
    target: '_blank',
    title,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    children,
  });
}

// apps/gitlab-plus/src/components/epic-preview/blocks/EpicRelatedIssues.tsx
function EpicRelatedIssues({ epic }) {
  const issues = useMemo(() => {
    const hierarchyWidget = epic.widgets.find(
      (widget) => widget.type === 'HIERARCHY'
    );
    if (!hierarchyWidget) {
      return [];
    }
    return hierarchyWidget.children.nodes;
  }, [epic]);
  if (!issues.length) {
    return null;
  }
  return jsx(InfoBlock, {
    title: `Child issues (${issues.length})`,
    children: issues.map((issue) =>
      jsxs(
        Link,
        {
          href: issue.webUrl,
          title: issue.title,
          children: ['#', issue.iid, ' ', issue.title],
        },
        issue.iid
      )
    ),
  });
}

// apps/gitlab-plus/src/components/epic-preview/useFetchEpic.ts
const initialEpicData = {
  epic: null,
  isLoading: false,
};
const initialRelatedEpicsData = {
  // epics: [],
  isLoading: false,
};
const epicProvider = new EpicProvider();

function useFetchEpic() {
  const [epic, setEpic] = useState(initialEpicData);
  const [relatedEpics, setRelatedEpics] = useState(initialRelatedEpicsData);
  const fetchEpic = async (link) => {
    setEpic({ ...initialEpicData, isLoading: true });
    const response = await epicProvider.getEpic(link.workspacePath, link.epic);
    setEpic({
      epic: response.data.workspace.workItem,
      isLoading: false,
    });
  };
  const fetch2 = async (link) => {
    fetchEpic(link);
  };
  const reset = () => {
    setEpic(initialEpicData);
    setRelatedEpics(initialRelatedEpicsData);
  };
  return {
    epic,
    fetch: fetch2,
    relatedEpics,
    reset,
  };
}

// apps/gitlab-plus/src/components/epic-preview/EpicPreviewModal.tsx
function EpicPreviewModal() {
  const { epic, fetch: fetch2, reset } = useFetchEpic();
  return jsx(PreviewModal, {
    validator: LinkParser.validateEpicLink,
    fetch: fetch2,
    isError: !epic,
    isLoading: epic.isLoading,
    parser: LinkParser.parseEpicLink,
    reset,
    children:
      epic.epic &&
      jsxs(Fragment, {
        children: [
          jsx(EpicHeader, { epic: epic.epic }),
          jsx(EpicLabels, { epic: epic.epic }),
          jsx(EpicRelatedIssues, { epic: epic.epic }),
        ],
      }),
  });
}

// apps/gitlab-plus/src/services/EpicPreview.tsx
class EpicPreview extends Service {
  init() {
    render(jsx(EpicPreviewModal, {}), this.rootBody('glp-epic-preview-root'));
  }
}

// apps/gitlab-plus/src/components/image-preview/useImagePreviewModal.ts
function useImagePreviewModal() {
  const [data, setData] = useState(false);
  const [src, setSrc] = useState('');
  const validate = (element) => {
    return (
      element.classList.contains('no-attachment-icon') &&
      /\.(png|jpg|jpeg|heic)$/.test(element.href.toLowerCase())
    );
  };
  const getAnchor = (element) => {
    if (!element) {
      return void 0;
    }
    if (element instanceof HTMLAnchorElement) {
      return validate(element) ? element : void 0;
    }
    if (
      element instanceof HTMLImageElement &&
      element.parentElement instanceof HTMLAnchorElement
    ) {
      return validate(element.parentElement) ? element.parentElement : void 0;
    }
    return void 0;
  };
  useEffect(() => {
    document.body.addEventListener('click', (ev) => {
      const anchor = getAnchor(ev.target);
      if (anchor) {
        setSrc(anchor.href);
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
    });
  }, []);
  useEffect(() => {
    setData(true);
  }, [data]);
  return {
    onClose: () => setSrc(''),
    src,
  };
}

// apps/gitlab-plus/src/components/image-preview/ImagePreviewModal.tsx
function ImagePreviewModal() {
  const { onClose, src } = useImagePreviewModal();
  return jsxs('div', {
    className: clsx(
      'glp-image-preview-modal',
      Boolean(src) && 'glp-modal-visible'
    ),
    children: [
      jsx('img', { alt: 'Image preview', className: 'glp-modal-img', src }),
      jsx('div', {
        className: 'glp-modal-close',
        onClick: onClose,
        children: jsx(GitlabIcon, { icon: 'close-xs', size: 24 }),
      }),
    ],
  });
}

// apps/gitlab-plus/src/services/ImagePreview.tsx
class ImagePreview extends Service {
  init() {
    render(jsx(ImagePreviewModal, {}), this.rootBody('glp-image-preview-root'));
  }
}

// apps/gitlab-plus/src/components/common/bolck/UsersBlock.tsx
function UsersBlock({ assignees, label, pluralLabel }) {
  if (!assignees || !assignees.length) {
    return null;
  }
  if (assignees.length === 1) {
    return jsx(InfoBlock, {
      className: 'gl-flex gl-flex-col gl-gap-3',
      rightTitle: jsx(GitlabUser, { user: assignees[0], withLink: true }),
      title: `${label}:`,
    });
  }
  return jsx(InfoBlock, {
    className: 'gl-flex gl-flex-col gl-gap-3',
    title: pluralLabel || `${label}s`,
    children: assignees.map((assignee) =>
      jsx(GitlabUser, { user: assignee, withLink: true }, assignee.id)
    ),
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueAssignee.tsx
function IssueAssignee({ issue }) {
  return jsx(UsersBlock, {
    assignees: issue.assignees.nodes,
    label: 'Assignee',
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueEpic.tsx
function IssueEpic({ issue }) {
  if (!issue.epic) {
    return null;
  }
  return jsxs(InfoBlock, {
    title: 'Epic',
    children: [
      jsx(GitlabIcon, { className: 'gl-mr-2', icon: 'epic', size: 16 }),
      jsx('span', { children: issue.epic.title }),
    ],
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueHeading.tsx
function IssueHeader({ issue }) {
  return jsx(HeadingBlock, {
    author: issue.author,
    badge: jsx(IssueStatus, { isOpen: issue.state === 'opened' }),
    createdAt: issue.createdAt,
    entityId: `#${issue.iid}`,
    icon: 'issue-type-issue',
    title: issue.title,
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueIteration.tsx
function IssueIteration({ issue }) {
  const label = useMemo(() => {
    let _a;
    const date = (date2) => {
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(date2));
    };
    if (!issue.iteration) {
      return '';
    }
    return [
      (_a = issue.iteration.iterationCadence) == null ? void 0 : _a.title,
      ': ',
      date(issue.iteration.startDate),
      ' - ',
      date(issue.iteration.dueDate),
    ].join('');
  }, [issue]);
  if (!issue.iteration) {
    return null;
  }
  return jsx(InfoBlock, {
    title: 'Iteration',
    rightTitle: jsxs(Row, {
      children: [
        jsx(GitlabIcon, { className: 'gl-mr-2', icon: 'iteration', size: 16 }),
        jsx('span', { children: label }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/common/bolck/LabelsBlockChangeStatus.tsx
function LabelsBlockChangeStatus({
  isLoading,
  name: name2,
  onChange,
  options,
}) {
  if (isLoading) {
    return jsx(GitlabLoader, {});
  }
  const getValues = useCallback(
    async (search) => {
      return options.filter((option) => option.title.includes(search));
    },
    [options]
  );
  const renderOption = useCallback((item) => {
    return jsxs('div', {
      class: 'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3',
      children: [
        jsx('span', {
          class: 'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0',
          style: { backgroundColor: item.color },
        }),
        jsx('span', { children: item.title }),
      ],
    });
  }, []);
  return jsx('div', {
    style: { width: 150 },
    children: jsx(AsyncAutocomplete, {
      getValues,
      name: name2,
      onChange: ([label]) => label && onChange(label),
      renderLabel: () => 'Change status',
      renderOption,
      value: [],
    }),
  });
}

// apps/gitlab-plus/src/components/common/bolck/useLabelBlock.ts
const name = 'status-labels';

function useLabelBlock(onStatusChange, projectPath) {
  const [isLoading, setIsLoading] = useState(false);
  const [statusLabels, setStatusLabels] = useState([]);
  const onSelectStatus = useCallback(async (label) => {
    setIsLoading(true);
    if (onStatusChange && projectPath) {
      await onStatusChange(projectPath, label);
      new RecentlyProvider(name).add(label);
    }
    setIsLoading(false);
  }, []);
  const fetchLabels = useCallback(async (projectPath2) => {
    const response = await new LabelsProvider().getLabels(
      projectPath2,
      'Status::'
    );
    setStatusLabels(response.data.workspace.labels.nodes);
  }, []);
  useEffect(() => {
    if (!projectPath) {
      return;
    }
    fetchLabels(projectPath);
  }, [projectPath]);
  return {
    isLoading,
    name,
    onSelectStatus,
    showChangeStatusComponent: Boolean(projectPath && onStatusChange),
    statusLabels,
  };
}

// apps/gitlab-plus/src/components/common/bolck/LabelsBlock.tsx
function LabelsBlock({ labels: labels2, onStatusChange, projectPath }) {
  const {
    isLoading,
    name: name2,
    onSelectStatus,
    showChangeStatusComponent,
    statusLabels,
  } = useLabelBlock(onStatusChange, projectPath);
  if (!labels2.length && !onStatusChange) {
    return null;
  }
  return jsx(InfoBlock, {
    className: 'issuable-show-labels',
    title: 'Labels',
    rightTitle:
      showChangeStatusComponent &&
      jsx(LabelsBlockChangeStatus, {
        isLoading,
        name: name2,
        onChange: onSelectStatus,
        options: statusLabels,
      }),
    children: labels2.map((label) => jsx(GitlabLabel, { label }, label.id)),
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueLabels.tsx
function IssueLabels({ issue, projectPath, refetch }) {
  if (!issue.labels.nodes.length) {
    return null;
  }
  const onStatusChange = useCallback(
    async (projectPath2, label) => {
      const statusLabel = issue.labels.nodes.find((l) =>
        l.title.includes('Status::')
      );
      const labels2 = statusLabel
        ? issue.labels.nodes.map((l) => (l.id === statusLabel.id ? label : l))
        : [...issue.labels.nodes, label];
      await new IssueProvider().issueSetLabels({
        iid: issue.iid,
        labelIds: labels2.map((l) => l.id),
        projectPath: projectPath2,
      });
      if (refetch) {
        await refetch();
      }
    },
    [projectPath, issue]
  );
  return jsx(LabelsBlock, {
    labels: issue.labels.nodes,
    onStatusChange,
    projectPath,
  });
}

// apps/gitlab-plus/src/components/common/MrStatus.tsx
const iconMap = {
  closed: 'merge-request-close',
  locked: 'search',
  merged: 'merge',
  opened: 'merge-request',
};
const classMap = {
  closed: 'danger',
  locked: 'warning',
  merged: 'info',
  opened: 'success',
};
const labelMap = {
  closed: 'Closed',
  locked: 'Locked',
  merged: 'Merged',
  opened: 'Opened',
};

function MrStatus({ state, withIcon, withLabel }) {
  return jsx(GitlabBadge, {
    icon: withIcon ? iconMap[state] : void 0,
    label: withLabel ? labelMap[state] : void 0,
    variant: classMap[state],
  });
}

// apps/gitlab-plus/src/components/common/GitlabMergeRequest.tsx
function GitlabMergeRequest({ mr }) {
  return jsxs('div', {
    style: { marginTop: 10 },
    children: [
      jsxs(Row, {
        gap: 2,
        children: [
          jsx(MrStatus, { state: mr.state, withIcon: true, withLabel: true }),
          jsxs(Text, {
            variant: 'secondary',
            children: ['!', mr.iid],
          }),
          jsx(GitlabUser, { size: 16, user: mr.author, withLink: true }),
        ],
      }),
      jsx(Link, { href: mr.webUrl, children: mr.title }),
    ],
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueMergeRequests.tsx
function IssueMergeRequests({ issue }) {
  if (!issue.relatedMergeRequests.nodes.length) {
    return null;
  }
  return jsx(InfoBlock, {
    title: 'Merge requests',
    children: issue.relatedMergeRequests.nodes.map((mr) =>
      jsx(GitlabMergeRequest, { mr }, mr.iid)
    ),
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueMilestone.tsx
function IssueMilestone({ issue }) {
  if (!issue.milestone) {
    return null;
  }
  return jsx(InfoBlock, {
    title: 'Milestone',
    rightTitle: jsxs(Row, {
      children: [
        jsx(GitlabIcon, { className: 'gl-mr-2', icon: 'milestone', size: 16 }),
        jsx('span', { children: issue.milestone.title }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/issue-preview/blocks/IssueRelatedIssue.tsx
const relationMap = {
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
  relates_to: 'Related to:',
};

function IssueRelatedIssue({ isLoading, relatedIssues }) {
  const groups = useMemo(() => {
    const initValue = {
      blocks: [],
      is_blocked_by: [],
      relates_to: [],
    };
    return Object.entries(
      relatedIssues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.linkType]: [...acc[issue.linkType], issue],
        }),
        initValue
      )
    ).filter(([_, issues]) => issues.length);
  }, [relatedIssues]);
  if (isLoading) {
    return jsx('div', {
      className: 'gl-flex gl-items-center gl-justify-center',
      children: jsx(GitlabLoader, {}),
    });
  }
  if (!relatedIssues.length) {
    return null;
  }
  return jsx(InfoBlock, {
    title: '',
    children: groups.map(([key, issues]) =>
      jsxs(
        'div',
        {
          style: { marginTop: 10 },
          children: [
            jsx('div', {
              class: 'item-title gl-flex gl-min-w-0 gl-gap-3',
              children: jsx('span', { children: relationMap[key] }),
            }),
            issues.map((issue) =>
              jsxs(
                Link,
                {
                  href: issue.webUrl,
                  blockHover: true,
                  children: ['#', issue.iid, ' ', issue.title],
                },
                issue.iid
              )
            ),
          ],
        },
        key
      )
    ),
  });
}

// apps/gitlab-plus/src/components/issue-preview/useFetchIssue.ts
const initialIssueData = {
  isLoading: false,
  issue: null,
  link: null,
};
const initialRelatedIssuesData = {
  isLoading: false,
  issues: [],
};

function useFetchIssue() {
  const [issue, setIssue] = useState(initialIssueData);
  const [relatedIssues, setRelatedIssues] = useState(initialRelatedIssuesData);
  const fetchIssue = async (link, force = false) => {
    setIssue({ ...initialIssueData, isLoading: true });
    const response = await new IssueProvider(force).getIssue(
      link.projectPath,
      link.issue
    );
    setIssue({
      isLoading: false,
      issue: response.data.project.issue,
      link,
    });
  };
  const fetchRelatedIssues = async (link, force = false) => {
    const relatedIssues2 = await new IssueProvider(force).getIssueLinks(
      link.projectPath,
      link.issue
    );
    setRelatedIssues({
      isLoading: false,
      issues: relatedIssues2,
    });
  };
  const fetch2 = async (link, force = false) => {
    fetchIssue(link, force);
    fetchRelatedIssues(link, force);
  };
  const refetch = async () => {
    if (issue.link) {
      fetch2(issue.link, true);
    }
  };
  const reset = () => {
    setIssue(initialIssueData);
    setRelatedIssues(initialRelatedIssuesData);
  };
  return {
    fetch: fetch2,
    issue,
    refetch,
    relatedIssues,
    reset,
  };
}

// apps/gitlab-plus/src/components/issue-preview/IssuePreviewModal.tsx
function IssuePreviewModal() {
  let _a;
  const {
    fetch: fetch2,
    issue,
    refetch,
    relatedIssues,
    reset,
  } = useFetchIssue();
  return jsxs(PreviewModal, {
    validator: LinkParser.validateIssueLink,
    fetch: fetch2,
    isError: !issue,
    isLoading: issue.isLoading,
    parser: LinkParser.parseIssueLink,
    reset,
    children: [
      issue.issue &&
        jsxs(Fragment, {
          children: [
            jsx(IssueHeader, { issue: issue.issue }),
            jsx(IssueAssignee, { issue: issue.issue }),
            jsx(IssueLabels, {
              issue: issue.issue,
              projectPath: (_a = issue.link) == null ? void 0 : _a.projectPath,
              refetch,
            }),
            jsx(IssueEpic, { issue: issue.issue }),
            jsx(IssueMilestone, { issue: issue.issue }),
            jsx(IssueIteration, { issue: issue.issue }),
            jsx(IssueMergeRequests, { issue: issue.issue }),
          ],
        }),
      jsx(IssueRelatedIssue, {
        isLoading: relatedIssues.isLoading,
        relatedIssues: relatedIssues.issues,
      }),
    ],
  });
}

// apps/gitlab-plus/src/services/IssuePreview.tsx
class IssuePreview extends Service {
  init() {
    render(jsx(IssuePreviewModal, {}), this.rootBody('glp-issue-preview-root'));
  }
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrApprovedBy.tsx
function MrApprovedBy({ mr }) {
  return jsx(UsersBlock, {
    assignees: mr.approvedBy.nodes,
    label: 'Approved by',
    pluralLabel: 'Approved by',
  });
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrAssignee.tsx
function MrAssignee({ mr }) {
  return jsx(UsersBlock, { assignees: mr.assignees.nodes, label: 'Assignee' });
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrBranch.tsx
function MrBranch({ mr }) {
  return jsx(InfoBlock, {
    title: 'Merge',
    children: jsxs('span', {
      children: [
        jsx(Text, { children: mr.sourceBranch }),
        jsx(Text, {
          className: 'gl-mx-2',
          variant: 'secondary',
          children: 'in to',
        }),
        jsx(Text, { children: mr.targetBranch }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrDiff.tsx
function MrDiff({ mr }) {
  const label = useMemo(() => {
    if (mr.diffStatsSummary.fileCount === 1) {
      return '1 file';
    }
    return `${mr.diffStatsSummary.fileCount} files`;
  }, [mr.diffStatsSummary.fileCount]);
  return jsx(InfoBlock, {
    title: `Commit: ${mr.commitCount}`,
    rightTitle: jsxs(Row, {
      gap: 2,
      items: 'center',
      children: [
        jsx(GitlabIcon, { icon: 'doc-code', size: 16 }),
        jsx(Text, { size: 'subtle', weight: 'bold', children: label }),
        jsxs(Text, {
          color: 'success',
          weight: 'bold',
          children: ['+', mr.diffStatsSummary.additions],
        }),
        jsxs(Text, {
          color: 'danger',
          weight: 'bold',
          children: ['-', mr.diffStatsSummary.deletions],
        }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrDiscussion.tsx
function MrDiscussion({ mr }) {
  if (!mr.resolvableDiscussionsCount) {
    return null;
  }
  const { label, title } = useMemo(() => {
    const plural = mr.resolvableDiscussionsCount !== 1 ? 's' : '';
    return {
      label: `${mr.resolvedDiscussionsCount} of ${mr.resolvableDiscussionsCount}`,
      title: `${mr.resolvedDiscussionsCount} of ${mr.resolvableDiscussionsCount} thread${plural} resolved`,
    };
  }, [mr]);
  return jsx(InfoBlock, {
    title: 'Discussion',
    rightTitle: jsx(GitlabBadge, {
      icon: 'comments',
      label,
      title,
      variant: 'muted',
    }),
  });
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrHeading.tsx
function MrHeader({ mr }) {
  return jsx(HeadingBlock, {
    author: mr.author,
    createdAt: mr.createdAt,
    entityId: `!${mr.iid}`,
    icon: 'merge-request',
    title: mr.titleHtml,
    badge: jsxs(Row, {
      className: 'gl-gap-2',
      items: 'center',
      children: [
        jsx(MrStatus, { state: mr.state, withIcon: true, withLabel: true }),
        Boolean(mr.approvedBy.nodes.length) &&
          jsx(GitlabBadge, {
            icon: 'check-circle',
            label: 'Approved',
            variant: 'success',
          }),
        mr.conflicts &&
          jsx(GitlabIcon, {
            icon: 'warning-solid',
            size: 16,
            title: 'Merge request can not be merged',
          }),
      ],
    }),
  });
}

// apps/gitlab-plus/src/components/mr-preview/blocks/MrLabels.tsx
function MrLabels({ mr }) {
  if (!mr.labels.nodes.length) {
    return null;
  }
  return jsx(InfoBlock, {
    className: 'issuable-show-labels',
    title: 'Labels',
    children: mr.labels.nodes.map((label) =>
      jsx(GitlabLabel, { label }, label.id)
    ),
  });
}

// apps/gitlab-plus/src/providers/query/mr.ts
const mrQuery = `query MergeRequestQuery($fullPath: ID!, $iid: String!) {
  workspace: project(fullPath: $fullPath) {
    mergeRequest(iid: $iid) {
      id
      iid
      assignees {
        nodes {
          ...User
        }
      }
      approvedBy {
        nodes {
          ...User
        }
      }
      author {
        ...User
      }
      commitCount
      conflicts
      createdAt
      title
      titleHtml
      diffStatsSummary {
        additions
        changes
        deletions
        fileCount
      }
      draft
      labels {
        nodes {
          ...Label
        }
      }
      mergeable
      resolvedDiscussionsCount
      resolvableDiscussionsCount
      reviewers {
        nodes {
          ...User
        }
      }
      shouldBeRebased
      sourceBranch
      targetBranch
      state
      webUrl
    }
  }
}

${userFragment}
${labelFragment}
`;

// apps/gitlab-plus/src/providers/MrProvider.ts
class MrProvider extends GitlabProvider {
  async getMr(projectPath, mrId) {
    return this.queryCached(
      `mr-${projectPath}-${mrId}`,
      mrQuery,
      {
        iid: mrId,
        fullPath: projectPath,
      },
      2
    );
  }
}

// apps/gitlab-plus/src/components/mr-preview/useFetchMr.ts
const initialMrData = {
  isLoading: false,
  mr: null,
};

function useFetchMr() {
  const [mr, setMr] = useState(initialMrData);
  const fetchMr = async (link) => {
    setMr({ ...initialMrData, isLoading: true });
    const response = await new MrProvider().getMr(link.projectPath, link.mr);
    setMr({
      isLoading: false,
      mr: response.data.workspace.mergeRequest,
    });
  };
  const fetch2 = async (link) => {
    fetchMr(link);
  };
  const reset = () => {
    setMr(initialMrData);
  };
  return {
    fetch: fetch2,
    mr,
    reset,
  };
}

// apps/gitlab-plus/src/components/mr-preview/MrPreviewModal.tsx
function MrPreviewModal() {
  const { fetch: fetch2, mr, reset } = useFetchMr();
  return jsx(PreviewModal, {
    validator: LinkParser.validateMrLink,
    fetch: fetch2,
    isError: !mr,
    isLoading: mr.isLoading,
    parser: LinkParser.parseMrLink,
    reset,
    children:
      mr.mr &&
      jsxs(Fragment, {
        children: [
          jsx(MrHeader, { mr: mr.mr }),
          jsx(MrBranch, { mr: mr.mr }),
          jsx(MrAssignee, { mr: mr.mr }),
          jsx(MrApprovedBy, { mr: mr.mr }),
          jsx(MrLabels, { mr: mr.mr }),
          jsx(MrDiff, { mr: mr.mr }),
          jsx(MrDiscussion, { mr: mr.mr }),
        ],
      }),
  });
}

// apps/gitlab-plus/src/services/MrPreview.tsx
class MrPreview extends Service {
  init() {
    render(jsx(MrPreviewModal, {}), this.rootBody('glp-mr-preview-root'));
  }
}

// apps/gitlab-plus/src/components/related-issue-autocomplete/useRelatedIssuesAutocompleteModal.ts
function useRelatedIssuesAutocompleteModal(link, input) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const searchIssues = useCallback(async (term) => {
    const response = await new IssueProvider().getIssues(
      link.workspacePath,
      term
    );
    return [
      response.data.workspace.workItems,
      response.data.workspace.workItemsByIid,
      response.data.workspace.workItemsEmpty,
    ].flatMap((item) => (item == null ? void 0 : item.nodes) || []);
  }, []);
  const options = useAsyncAutocompleteOptions(searchTerm, searchIssues);
  const onSelect = (item) => {
    input.value = `${item.project.fullPath}#${item.iid} `;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
  };
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (e.target !== input && !input.contains(e.target)) {
        setIsVisible(false);
      }
    });
    input.addEventListener('click', () => setIsVisible(true));
  }, []);
  return {
    isVisible,
    onClose: () => setIsVisible(false),
    onSelect,
    options,
    searchTerm,
    setSearchTerm,
  };
}

// apps/gitlab-plus/src/components/related-issue-autocomplete/RelatedIssuesAutocompleteModal.tsx
function RelatedIssuesAutocompleteModal({ input, link }) {
  const { isVisible, onClose, onSelect, options, searchTerm, setSearchTerm } =
    useRelatedIssuesAutocompleteModal(link, input);
  return isVisible
    ? jsx('div', {
        class: 'gl-relative gl-w-full gl-new-dropdown !gl-block',
        children: jsx(AsyncAutocompleteDropdown, {
          onClick: onSelect,
          onClose,
          options,
          searchTerm,
          setSearchTerm,
          value: [],
          renderOption: (item) =>
            jsxs('div', {
              class: 'gl-flex gl-gap-x-2 gl-py-2',
              children: [
                jsx(GitlabIcon, { icon: 'issue-type-issue', size: 16 }),
                jsx('small', { children: item.iid }),
                jsx('span', {
                  class: 'gl-flex gl-flex-wrap',
                  children: item.title,
                }),
              ],
            }),
        }),
      })
    : null;
}

// apps/gitlab-plus/src/services/RelatedIssueAutocomplete.tsx
class RelatedIssueAutocomplete extends Service {
  constructor() {
    super();
    __publicField(this, 'ready', false);
    __publicField(this, 'readyClass', 'glp-input-ready');
  }

  init() {
    this.initObserver();
    window.setTimeout(this.initObserver.bind(this), 1e3);
    window.setTimeout(this.initObserver.bind(this), 3e3);
    window.setTimeout(this.initObserver.bind(this), 5e3);
  }

  initAutocomplete(section) {
    const input = section.querySelector('#add-related-issues-form-input');
    const link = LinkParser.parseIssueLink(window.location.href);
    if (!input || this.isMounted(input) || !link) {
      return;
    }
    const container = input.closest('.add-issuable-form-input-wrapper');
    if (!container || document.querySelector('.related-issues-autocomplete')) {
      return;
    }
    const root = this.root('related-issues-autocomplete', container);
    render(jsx(RelatedIssuesAutocompleteModal, { input, link }), root);
  }

  initObserver() {
    const section = document.querySelector('#related-issues');
    if (this.ready || !section) {
      return;
    }
    this.ready = true;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.initAutocomplete(section);
        }
      });
    });
    observer.observe(section, {
      childList: true,
    });
  }

  isMounted(input) {
    return input.classList.contains(this.readyClass);
  }
}

// libs/share/src/ui/Component.ts
class Component {
  constructor(tag, props = {}) {
    this.element = Dom.create({ tag, ...props });
  }

  addClassName(...className) {
    this.element.classList.add(...className);
  }

  event(event, callback) {
    this.element.addEventListener(event, callback);
  }

  getElement() {
    return this.element;
  }

  mount(parent) {
    parent.appendChild(this.element);
  }
}

// libs/share/src/ui/SvgComponent.ts
class SvgComponent {
  constructor(tag, props = {}) {
    this.element = Dom.createSvg({ tag, ...props });
  }

  addClassName(...className) {
    this.element.classList.add(...className);
  }

  event(event, callback) {
    this.element.addEventListener(event, callback);
  }

  getElement() {
    return this.element;
  }

  mount(parent) {
    parent.appendChild(this.element);
  }
}

// libs/share/src/ui/Dom.ts
class Dom {
  static appendChildren(element, children, isSvgMode = false) {
    if (children) {
      element.append(
        ...Dom.array(children).map((item) => {
          if (typeof item === 'string') {
            return document.createTextNode(item);
          }
          if (item instanceof HTMLElement || item instanceof SVGElement) {
            return item;
          }
          if (item instanceof Component || item instanceof SvgComponent) {
            return item.getElement();
          }
          const isSvg =
            'svg' === item.tag
              ? true
              : 'foreignObject' === item.tag
              ? false
              : isSvgMode;
          if (isSvg) {
            return Dom.createSvg(item);
          }
          return Dom.create(item);
        })
      );
    }
  }

  static applyAttrs(element, attrs) {
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === void 0 || value === false) {
          element.removeAttribute(key);
        } else {
          element.setAttribute(key, `${value}`);
        }
      });
    }
  }

  static applyClass(element, classes) {
    if (classes) {
      element.classList.add(...classes.split(' ').filter(Boolean));
    }
  }

  static applyEvents(element, events) {
    if (events) {
      Object.entries(events).forEach(([name2, callback]) => {
        element.addEventListener(name2, callback);
      });
    }
  }

  static applyStyles(element, styles) {
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        const name2 = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        element.style.setProperty(name2, value);
      });
    }
  }

  static array(element) {
    return Array.isArray(element) ? element : [element];
  }

  static create(data) {
    const element = document.createElement(data.tag);
    Dom.appendChildren(element, data.children);
    Dom.applyClass(element, data.classes);
    Dom.applyAttrs(element, data.attrs);
    Dom.applyEvents(element, data.events);
    Dom.applyStyles(element, data.styles);
    return element;
  }

  static createSvg(data) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      data.tag
    );
    Dom.appendChildren(element, data.children, true);
    Dom.applyClass(element, data.classes);
    Dom.applyAttrs(element, data.attrs);
    Dom.applyEvents(element, data.events);
    Dom.applyStyles(element, data.styles);
    return element;
  }

  static element(tag, classes, children) {
    return Dom.create({ tag, children, classes });
  }

  static elementSvg(tag, classes, children) {
    return Dom.createSvg({ tag, children, classes });
  }
}

// libs/share/src/ui/Observer.ts
class Observer {
  start(element, callback, options) {
    this.stop();
    this.observer = new MutationObserver(callback);
    this.observer.observe(
      element,
      options || {
        attributeOldValue: true,
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true,
      }
    );
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// apps/gitlab-plus/src/services/SortIssue.ts
const sortWeight = {
  ['issue']: 4,
  ['label']: 0,
  ['ownIssue']: 10,
  ['ownUserStory']: 8,
  ['unknown']: 2,
  ['userStory']: 6,
};

class SortIssue extends Service {
  init() {
    const observer = new Observer();
    const userName = this.userName();
    const board = document.querySelector('.boards-list');
    if (!userName || !board) {
      return;
    }
    observer.start(board, () => this.run(userName));
  }

  childType(child, userName) {
    if (child instanceof HTMLDivElement) {
      return 'label';
    }
    const title = child.querySelector('[data-testid="board-card-title-link"]');
    if (!title) {
      return 'unknown';
    }
    const isOwn = [...child.querySelectorAll('.gl-avatar-link img')].some(
      (img) => img.alt.includes(userName)
    );
    const isUserStory = [...child.querySelectorAll('.gl-label')].some((span) =>
      span.innerText.includes('User Story')
    );
    if (isUserStory && isOwn) {
      return 'ownUserStory';
    }
    if (isOwn) {
      return 'ownIssue';
    }
    if (isUserStory) {
      return 'userStory';
    }
    return 'issue';
  }

  initBoard(board, userName) {
    Dom.applyClass(board, 'glp-ready');
    const observer = new Observer();
    observer.start(board, () => this.sortBoard(board, userName), {
      childList: true,
    });
  }

  run(userName) {
    [...document.querySelectorAll('.board-list:not(.glp-ready)')].forEach(
      (board) => this.initBoard(board, userName)
    );
  }

  shouldSort(items) {
    return items.some((item) => {
      return ['ownIssue', 'ownUserStory'].includes(item.type);
    });
  }

  sortBoard(board, userName) {
    Dom.applyStyles(board, {
      display: 'flex',
      flexDirection: 'column',
    });
    const children = [...board.children].map((element) => ({
      element,
      type: this.childType(element, userName),
    }));
    if (!this.shouldSort(children)) {
      return;
    }
    this.sortChildren(children).forEach(({ element }, index) => {
      const order =
        index !== children.length - 1 ? index + 1 : children.length + 100;
      element.style.order = `${order}`;
    });
  }

  sortChildren(items) {
    return items.toSorted((a, b) => {
      return Math.sign(sortWeight[b.type] - sortWeight[a.type]);
    });
  }

  userName() {
    const element = document.querySelector(
      '.user-bar-dropdown-toggle .gl-button-text .gl-sr-only'
    );
    const testText = ' user’s menu';
    if (element && element.innerText.includes(testText)) {
      return element.innerText.replace(testText, '');
    }
    return void 0;
  }
}

// apps/gitlab-plus/src/main.ts
[
  ClearCacheService,
  ImagePreview,
  MrPreview,
  EpicPreview,
  IssuePreview,
  CreateRelatedIssue,
  CreateChildIssue,
  RelatedIssueAutocomplete,
  SortIssue,
].forEach((Service2) => new Service2().init());
