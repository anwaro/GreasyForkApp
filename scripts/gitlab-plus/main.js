// ==UserScript==
// @name         Gitlab plus
// @namespace    https://lukaszmical.pl/
// @version      2024-11-27
// @description  Gitlab utils
// @author       Łukasz Micał
// @match        https://gitlab.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&gitlab.com/
// ==/UserScript==

// css:apps/gitlab-plus/src/styles/create-related-issue.css
var create_related_issue_default =
  '.glp-create-related-issue-layer{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;display:none;background:rgba(0,0,0,0.6);justify-content:center;align-items:center;}.glp-create-related-issue-layer.glp-modal-visible{display:flex;}.glp-create-related-issue-layer .glp-create-related-issue-modal{width:700px;max-width:95vw;}';

// css:apps/gitlab-plus/src/styles/image-preview.css
var image_preview_default =
  '.glp-image-preview-modal{position:fixed;display:flex;justify-content:center;align-items:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);visibility:hidden;opacity:0;pointer-events:none;z-index:99999;}.glp-image-preview-modal.glp-modal-visible{visibility:visible;opacity:1;pointer-events:auto;}.glp-image-preview-modal .glp-modal-img{max-width:95%;max-height:95%;}.glp-image-preview-modal .glp-modal-close{position:absolute;z-index:2;top:20px;right:20px;color:black;width:40px;height:40px;display:flex;justify-content:center;align-items:center;background:white;border-radius:20px;cursor:pointer;}';

// css:apps/gitlab-plus/src/styles/issue-preview.css
var issue_preview_default =
  "@keyframes loader-animation{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}.glp-issue-preview-modal{position:fixed;display:flex;padding:0 15px;background-color:var(--gl-background-color-default,var(--gl-color-neutral-0,#fff));border:1px solid var(--gl-border-color-default);border-radius:.25rem;width:300px;min-height:300px;z-index:99999;visibility:hidden;top:0;left:0;opacity:0;pointer-events:none;transition:all .3s ease-out;transition-property:visibility,opacity,transform;}.glp-issue-preview-modal.glp-modal-visible{visibility:visible;opacity:1;}.glp-issue-preview-modal .glp-issue-modal-inner{display:flex;flex-direction:column;max-width:100%;}.glp-issue-preview-modal .glp-block{padding:.5rem 0 .5rem;border-bottom-style:solid;border-bottom-color:var(--gl-border-color-subtle,var(--gl-color-neutral-50,#ececef));border-bottom-width:1px;width:100%;}.glp-issue-preview-modal .assignee-grid{margin-top:4px;gap:4px}.glp-modal-loader{position:absolute;width:40px;height:40px;transform:translate(-50%,-50%);left:50%;top:50%;}.glp-modal-loader.glp-modal-loader-inner{position:absolute;width:40px;height:40px;background-color:var(--gl-background-color-subtle,var(--gl-color-neutral-10,#fbfafd));animation:linear 1s infinite loader-animation;border-radius:50%;}.glp-modal-loader.glp-modal-loader-inner::after{content:'';position:absolute;background-color:#fff;border-radius:50%;top:5px;left:50%;width:5px;height:5px;transform:translateX(-50%);}";

// libs/share/src/ui/GlobalStyle.ts
var GlobalStyle = class {
  static addStyle(key, styles) {
    const style =
      document.getElementById(key) ||
      (function () {
        const style2 = document.createElement('style');
        style2.id = key;
        document.head.appendChild(style2);
        return style2;
      })();
    style.textContent = styles;
  }
};

// apps/gitlab-plus/src/styles/index.ts
GlobalStyle.addStyle(
  'glp-style',
  [
    create_related_issue_default,
    image_preview_default,
    issue_preview_default,
  ].join('\n')
);

// libs/share/src/ui/SvgComponent.ts
var SvgComponent = class {
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
};

// libs/share/src/ui/Dom.ts
var svgTags = [
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'tspan',
  'use',
  'view',
];
var commonTags = ['a', 'script', 'style', 'title'];
var Dom = class _Dom {
  static appendChildren(element, children) {
    if (children) {
      element.append(
        ..._Dom.array(children).map((item) => {
          if (typeof item === 'string') {
            return document.createTextNode(item);
          }
          if (item instanceof HTMLElement || item instanceof SVGElement) {
            return item;
          }
          if (item instanceof Component || item instanceof SvgComponent) {
            return item.getElement();
          }
          if (_Dom.isSvgItem(item, element)) {
            return _Dom.createSvg(item);
          }
          return _Dom.create(item);
        })
      );
    }
  }

  static create(data) {
    const element = document.createElement(data.tag);
    _Dom.appendChildren(element, data.children);
    _Dom.applyClass(element, data.classes);
    _Dom.applyAttrs(element, data.attrs);
    _Dom.applyEvents(element, data.events);
    _Dom.applyStyles(element, data.styles);
    return element;
  }

  static element(tag, classes, children) {
    return _Dom.create({ tag, classes, children });
  }

  static createSvg(data) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      data.tag
    );
    _Dom.appendChildren(element, data.children);
    _Dom.applyClass(element, data.classes);
    _Dom.applyAttrs(element, data.attrs);
    _Dom.applyEvents(element, data.events);
    _Dom.applyStyles(element, data.styles);
    return element;
  }

  static array(element) {
    return Array.isArray(element) ? element : [element];
  }

  static elementSvg(tag, classes, children) {
    return _Dom.createSvg({ tag, classes, children });
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

  static applyStyles(element, styles) {
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        const name = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        element.style.setProperty(name, value);
      });
    }
  }

  static applyEvents(element, events) {
    if (events) {
      Object.entries(events).forEach(([name, callback]) => {
        element.addEventListener(name, callback);
      });
    }
  }

  static applyClass(element, classes) {
    if (classes) {
      element.classList.add(...classes.split(' ').filter(Boolean));
    }
  }

  static isSvgItem(item, parent) {
    if (commonTags.includes(item.tag)) {
      return parent instanceof SVGElement;
    }
    return svgTags.includes(item.tag);
  }
};

// libs/share/src/ui/Component.ts
var Component = class {
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
};

// apps/gitlab-plus/src/components/issue-preview/IssueLoader.ts
var IssueLoader = class extends Component {
  constructor() {
    super('div', {
      classes: 'glp-modal-loader',
      children: {
        tag: 'div',
        classes: 'glp-modal-loader-inner',
      },
    });
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueBlock.ts
var IssueBlock = class extends Component {
  constructor(title = '', content, classes = '') {
    super('div', {
      classes: 'glp-block',
      children: [
        {
          tag: 'div',
          classes:
            'gl-flex gl-items-center gl-font-bold gl-leading-20 gl-text-gray-900',
          children: title,
        },
        {
          tag: 'div',
          classes,
          children: content,
        },
      ],
    });
  }
};

// apps/gitlab-plus/src/components/common/IconComponent.ts
var buildId =
  '236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84';
var IconComponent = class extends SvgComponent {
  constructor(icon, size = 's12', ...cls) {
    const svgSprite =
      unsafeWindow.gon?.sprite_icons || `/assets/icons-${buildId}.svg`;
    super('svg', {
      classes: ['gl-icon gl-fill-current', size, ...cls].join(' '),
      children: {
        tag: 'use',
        attrs: {
          href: `${svgSprite}#${icon}`,
        },
      },
    });
  }
};

// apps/gitlab-plus/src/components/common/StatusComponent.ts
var StatusComponent = class extends Component {
  constructor(isOpen) {
    super('span', {
      classes: `gl-badge badge badge-pill ${
        isOpen ? 'badge-success' : 'badge-info'
      }`,
      children: [
        new IconComponent(isOpen ? 'issue-open-m' : 'issue-close', 's16'),
        {
          tag: 'span',
          classes: 'gl-badge-content',
          children: isOpen ? 'Open' : 'Closed',
        },
      ],
    });
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueTitle.ts
var IssueTitle = class extends IssueBlock {
  constructor(issue) {
    super(
      issue.title,
      Dom.element('div', '', [
        {
          tag: 'div',
          classes: 'gl-flex',
          children: [
            new IconComponent('issue-type-issue', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              classes: 'gl-text-sm gl-text-secondary gl-mr-4',
              children: `#${issue.iid}`,
            },
            new StatusComponent(issue.state === 'opened'),
          ],
        },
        {
          tag: 'div',
          styles: { maxHeight: '100px' },
          classes: 'gl-text-sm gl-text-gray-500, gl-truncate',
          children: issue.description,
        },
      ])
    );
  }
};

// apps/gitlab-plus/src/components/common/UserComponent.ts
var UserComponent = class extends Component {
  constructor(user, size = 's24') {
    super('div', {
      classes: 'gl-flex gl-w-full gl-items-center',
      children: [
        {
          tag: 'img',
          classes: `gl-avatar gl-avatar-circle gl-avatar-${size}`,
          attrs: {
            src: user.avatarUrl,
            alt: "${assignee.name}'s avatar",
          },
        },
        {
          tag: 'span',
          classes: 'gl-ml-3',
          children: user.name,
        },
      ],
    });
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueAssignee.ts
var IssueAssignee = class extends IssueBlock {
  constructor(issue) {
    super(
      'Assignee',
      issue.assignees.nodes.map((assignee) =>
        new UserComponent(assignee).getElement()
      ),
      'gl-flex gl-flex-col gl-gap-3'
    );
  }
};

// apps/gitlab-plus/src/components/common/LabelComponent.ts
var LabelComponent = class extends Component {
  constructor(label, onRemove) {
    super('span');
    this.setClasses(label);
    this.element.append(...this.html(label, onRemove));
  }

  html(label, onRemove) {
    const [scope, text] = label.title.split('::');
    const items = [
      {
        tag: 'span',
        classes: 'gl-label-text',
        children: scope,
      },
    ];
    if (text) {
      items.push({
        tag: 'span',
        classes: 'gl-label-text-scoped',
        children: text,
      });
    }
    const elements = [
      Dom.create({
        tag: 'span',
        classes: 'gl-link gl-label-link gl-label-link-underline',
        children: items,
      }),
    ];
    if (onRemove) {
      elements.push(
        Dom.create({
          tag: 'button',
          classes:
            'btn gl-label-close !gl-p-0 btn-reset btn-sm gl-button btn-reset-tertiary',
          attrs: {
            type: 'button',
          },
          events: { click: onRemove },
          children: {
            tag: 'span',
            classes: 'gl-button-text',
            children: new IconComponent('close-xs'),
          },
        })
      );
    }
    return elements;
  }

  setClasses(label) {
    this.addClassName(
      'gl-label',
      'hide-collapsed',
      label.textColor === '#FFFFFF'
        ? 'gl-label-text-light'
        : 'gl-label-text-dark'
    );
    if (label.title.includes('::')) {
      this.addClassName('gl-label-scoped');
    }
    this.element.style.setProperty('--label-background-color', label.color);
    this.element.style.setProperty(
      '--label-inset-border',
      `inset 0 0 0 2px ${label.color}`
    );
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueLabels.ts
var IssueLabels = class extends IssueBlock {
  constructor(issue) {
    super(
      'Labels',
      Dom.create({
        tag: 'div',
        classes: 'issuable-show-labels',
        children: issue.labels.nodes.map((label) => new LabelComponent(label)),
      })
    );
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueMilestone.ts
var IssueMilestone = class extends IssueBlock {
  constructor(issue) {
    super(
      'Milestone',
      issue.milestone
        ? [
            new IconComponent('milestone', 's16', 'gl-mr-2'),
            { tag: 'span', children: issue.milestone.title },
          ]
        : ''
    );
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueIteration.ts
var IssueIteration = class _IssueIteration extends IssueBlock {
  constructor(issue) {
    super(
      'Iteration',
      issue.iteration
        ? [
            new IconComponent('iteration', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              children: _IssueIteration.label(
                issue.iteration.iterationCadence.title,
                issue.iteration.startDate,
                issue.iteration.dueDate
              ),
            },
          ]
        : ''
    );
  }

  static label(title, start, end) {
    const date = (date2) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(date2));
    };
    return [title, ': ', date(start), ' - ', date(end)].join('');
  }
};

// apps/gitlab-plus/src/components/common/MergeRequestComponent.ts
var iconMap = {
  merged: 'merge',
  opened: 'merge-request',
  closed: 'merge-request-close',
  locked: 'search',
};
var MergeRequestComponent = class extends Component {
  constructor(mr) {
    super('div', {
      styles: {
        marginTop: '10px',
      },
      classes: `item-body `,
      children: [
        {
          tag: 'div',
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
          children: [
            new IconComponent(
              iconMap[mr.state] || 'empty',
              's16',
              'merge-request-status',
              mr.state
            ),
            {
              tag: 'span',
              classes: 'gl-text-gray-500',
              children: `!${mr.iid}`,
            },
            new UserComponent(mr.author, 's16'),
          ],
        },
        {
          tag: 'div',
          classes: 'item-title sortable-link',
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          children: mr.title,
        },
      ],
    });
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueMergeRequests.ts
var IssueMergeRequests = class extends IssueBlock {
  constructor(issue) {
    super(
      'Merge requests',
      issue.relatedMergeRequests.nodes.map((mr) =>
        new MergeRequestComponent(mr).getElement()
      )
    );
  }
};

// apps/gitlab-plus/src/components/issue-preview/IssueModalContent.ts
var IssueModalContent = class extends Component {
  constructor() {
    super('div', { classes: 'glp-issue-modal-inner' });
  }

  update(issue) {
    const components = [
      IssueTitle,
      IssueAssignee,
      IssueLabels,
      IssueMilestone,
      IssueIteration,
      IssueMergeRequests,
    ];
    this.element.replaceChildren(
      ...components.map((Component2) => new Component2(issue).getElement())
    );
  }
};

// apps/gitlab-plus/src/components/IssuePreviewModal.ts
var IssuePreviewModal = class extends Component {
  constructor() {
    super('div', { classes: 'glp-issue-preview-modal' });
    this.loader = new IssueLoader();
    this.content = new IssueModalContent();
    this.visibleClassName = 'glp-modal-visible';
    this.mount(document.body);
  }

  show(event) {
    this.element.appendChild(this.loader.getElement());
    Dom.applyStyles(this.element, {
      left: `${event.pageX + 10}px`,
      top: `${event.pageY + 10}px`,
      transform: 'translateY(0px)',
    });
    this.element.classList.add(this.visibleClassName);
  }

  fixPosition() {
    const { height, top } = this.element.getBoundingClientRect();
    const dY = height + top - window.innerHeight;
    if (dY > 0) {
      this.element.style.transform = `translateY(-${dY + 15}px)`;
    }
  }

  hide() {
    this.element.classList.remove(this.visibleClassName);
    this.element.replaceChildren();
  }

  updateContent(issue) {
    this.content.update(issue);
    this.element.replaceChildren(this.content.getElement());
  }
};

// apps/gitlab-plus/src/helpers/IssueLink.ts
var IssueLink = class _IssueLink {
  static parseLink(link) {
    if (!_IssueLink.validateLink(link)) {
      return void 0;
    }
    const [projectPath, issue] = new URL(link).pathname
      .replace(/^\//, '')
      .split('/-/issues/');
    const slashCount = (projectPath.match(/\//g) || []).length;
    const workspacePath =
      slashCount === 1 ? projectPath : projectPath.replace(/\/[^/]+$/, '');
    return {
      issue: issue.replace(/\D/g, ''),
      projectPath,
      workspacePath,
    };
  }

  static validateLink(link) {
    return Boolean(typeof link === 'string' && link.includes('/-/issues/'));
  }
};

// libs/share/src/store/Cache.ts
var Cache = class {
  constructor(prefix) {
    this.prefix = prefix;
  }

  isValid(item) {
    if (item) {
      return (
        item.expirationDate === 'lifetime' ||
        new Date(item.expirationDate) > /* @__PURE__ */ new Date()
      );
    }
    return false;
  }

  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      return void 0;
    }
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

  set(key, value, minutes) {
    localStorage.setItem(
      this.key(key),
      JSON.stringify({
        expirationDate: this.expirationDate(minutes),
        value,
      })
    );
  }

  expirationDate(minutes) {
    if (typeof minutes === 'string') {
      return minutes;
    }
    const time = /* @__PURE__ */ new Date();
    time.setMinutes(time.getMinutes() + minutes);
    return time;
  }

  key(key) {
    return `${this.prefix}${key}`;
  }

  clearInvalid() {
    for (const key in localStorage) {
      if (key.startsWith(this.prefix) && !this.isValid(this.getItem(key))) {
        localStorage.removeItem(key);
      }
    }
  }
};

// apps/gitlab-plus/src/providers/GitlabProvider.ts
var GitlabProvider = class {
  constructor() {
    this.cache = new Cache('gpl-');
    this.url = 'https://gitlab.com/api/v4/';
    this.graphqlApi = 'https://gitlab.com/api/graphql';
  }

  async post(path, body) {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers(),
    });
    return response.json();
  }

  async query(query, variables) {
    const response = await fetch(this.graphqlApi, {
      method: 'POST',
      body: JSON.stringify({ variables, query }),
      headers: this.headers(),
    });
    return response.json();
  }

  async queryCached(key, query, variables, minutes) {
    const cacheValue = this.cache.get(key);
    if (cacheValue) {
      return cacheValue;
    }
    const value = await this.query(query, variables);
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
};

// apps/gitlab-plus/src/providers/query/label.ts
var labelFragment = `
  fragment Label on Label {
    id
    title
    description
    color
    textColor
    __typename
  }
`;
var labelsQuery = `query projectLabels($fullPath: ID!, $searchTerm: String) {
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

// apps/gitlab-plus/src/providers/query/user.ts
var userFragment = `
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
var userQuery = `
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

// apps/gitlab-plus/src/providers/query/issue.ts
var issueQuery = `query issueEE($projectPath: ID!, $iid: String!) {
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
var issuesQuery = `query groupWorkItems($searchTerm: String, $fullPath: ID!, $types: [IssueType!], $in: [IssuableSearchableField!], $includeAncestors: Boolean = false, $includeDescendants: Boolean = false, $iid: String = null, $searchByIid: Boolean = false, $searchByText: Boolean = true, $searchEmpty: Boolean = true) {
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
var issueMutation = `
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

// apps/gitlab-plus/src/providers/IssueProvider.ts
var IssueProvider = class extends GitlabProvider {
  async getIssue(projectId, issueId) {
    return this.queryCached(
      `issue-${projectId}-${issueId}`,
      issueQuery,
      {
        projectPath: projectId,
        iid: issueId,
      },
      2
    );
  }

  async getIssues(projectId, search) {
    const searchById = !!search.match(/^\d+$/);
    return await this.query(issuesQuery, {
      iid: searchById ? search : null,
      searchByIid: searchById,
      searchEmpty: !search,
      searchByText: Boolean(search),
      fullPath: projectId,
      searchTerm: search,
      includeAncestors: true,
      includeDescendants: true,
      types: ['ISSUE'],
      in: 'TITLE',
    });
  }

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
};

// libs/share/src/ui/Events.ts
var Events = class {
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
          mouseleave.call(element, ev);
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
};

// apps/gitlab-plus/src/services/IssuePreview.ts
var IssuePreview = class {
  constructor() {
    this.modal = new IssuePreviewModal();
    this.issue = new IssueProvider();
  }

  init() {
    Events.intendHover(
      (element) => IssueLink.validateLink(element.href),
      this.onHover.bind(this),
      this.onLeave.bind(this)
    );
  }

  async onHover(event) {
    const anchor = event.target;
    const link = IssueLink.parseLink(anchor.href);
    if (link) {
      anchor.title = '';
      this.modal.show(event);
      const issue = await this.issue.getIssue(link.projectPath, link.issue);
      this.modal.updateContent(issue.data.project.issue);
      setTimeout(() => {
        this.modal.fixPosition();
      }, 200);
    }
  }

  onLeave() {
    this.modal.hide();
  }
};

// apps/gitlab-plus/src/components/ImagePreviewModal.ts
var ImagePreviewModal = class extends Component {
  constructor() {
    super('div', { classes: 'glp-image-preview-modal' });
    this.image = Dom.element('img', 'glp-modal-img');
    this.visibleClassName = 'glp-modal-visible';
    this.element.append(
      this.image,
      Dom.create({
        tag: 'div',
        classes: 'glp-modal-close',
        children: new IconComponent('close-xs', 's24'),
        events: {
          click: this.hide.bind(this),
        },
      })
    );
    this.mount(document.body);
  }

  show(src) {
    this.image.src = src;
    this.element.classList.add(this.visibleClassName);
  }

  hide() {
    this.element.classList.remove(this.visibleClassName);
    this.image.src = '';
  }
};

// apps/gitlab-plus/src/services/ImagePreview.ts
var ImagePreview = class {
  constructor() {
    this.modal = new ImagePreviewModal();
  }

  init() {
    document.body.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    const element = this.getAnchor(event.target);
    if (!element) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.modal.show(element.href);
    return false;
  }

  validate(element) {
    return (
      element.classList.contains('no-attachment-icon') &&
      /\.(png|jpg|jpeg|heic)$/.test(element.href.toLowerCase())
    );
  }

  getAnchor(element) {
    if (!element) {
      return void 0;
    }
    if (element instanceof HTMLAnchorElement) {
      return this.validate(element) ? element : void 0;
    }
    if (
      element instanceof HTMLImageElement &&
      element.parentElement instanceof HTMLAnchorElement
    ) {
      return this.validate(element.parentElement)
        ? element.parentElement
        : void 0;
    }
    return void 0;
  }
};

// apps/gitlab-plus/src/components/common/CloseButton.ts
var CloseButton = class extends Component {
  constructor(onClick, title = 'Close') {
    super('button', {
      classes:
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon',
      attrs: {
        type: 'button',
        title,
      },
      events: {
        click: onClick,
      },
      children: new IconComponent('close-xs', 's16'),
    });
  }
};

// apps/gitlab-plus/src/components/create-related-issue/CreateRelatedIssueModalHeader.ts
var CreateRelatedIssueModalHeader = class extends Component {
  constructor(onClose) {
    super('div', {
      classes:
        'crud-header gl-border-b gl-flex gl-flex-wrap gl-justify-between gl-gap-x-5 gl-gap-y-2 gl-rounded-t-form gl-border-section gl-bg-section gl-px-5 gl-py-4 gl-relative',
      children: [
        {
          tag: 'h2',
          classes:
            'gl-m-0 gl-inline-flex gl-items-center gl-gap-3 gl-text-form gl-font-bold gl-leading-normal',
          children: 'Create related issue',
        },
        new CloseButton(onClose),
      ],
    });
  }
};

// apps/gitlab-plus/src/components/common/form/Field.ts
var Field = class extends Component {
  constructor(title, input, hint = '') {
    super('fieldset', {
      classes: 'form-group gl-form-group gl-w-full is-valid',
      children: [
        {
          tag: 'legend',
          classes: 'bv-no-focus-ring col-form-label pt-0 col-form-label',
          children: title,
        },
        input,
        {
          tag: 'small',
          children: hint,
        },
      ],
    });
  }
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormTitle.ts
var FormTitle = class extends Field {
  constructor() {
    const input = Dom.create({
      tag: 'input',
      classes: 'gl-form-input gl-mb-3 form-control is-valid',
      attrs: { placeholder: 'Add a title' },
    });
    super('Title', input, 'Maximum of 255 characters');
    this.value = '';
    input.addEventListener('input', this.onChange.bind(this));
  }

  onChange(e) {
    this.value = e.target.value;
  }

  reset() {
    this.value = '';
  }
};

// libs/share/src/utils/debounce.ts
function debounce(callback, wait = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), wait);
  };
}

// apps/gitlab-plus/src/components/common/form/DropdownSearch.ts
var DropdownSearch = class extends Component {
  constructor(onChange) {
    super('div', {
      classes: 'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown',
    });
    this.onChange = onChange;
    this.input = this.getSearchInput();
    this.element.append(this.getSearch());
  }

  getSearch() {
    return Dom.create({
      tag: 'div',
      classes: 'gl-listbox-search gl-listbox-topmost',
      children: [
        new IconComponent('search', 's16', 'gl-search-box-by-type-search-icon'),
        this.input,
        {
          tag: 'div',
          classes: 'gl-search-box-by-type-right-icons',
          styles: { top: '0' },
          children: new CloseButton(() => {
            this.input.value = '';
            this.onChange('');
          }, 'Clear input'),
        },
      ],
    });
  }

  getSearchInput() {
    const search = debounce(this.onChange.bind(this));
    return Dom.create({
      tag: 'input',
      classes: 'gl-listbox-search-input',
      events: {
        input: () => search(this.input.value),
      },
    });
  }
};

// apps/gitlab-plus/src/components/common/form/DropdownList.ts
var DropdownList = class extends Component {
  constructor(renderItem, onClick, removeFromRecent = void 0) {
    super('div', {
      classes:
        'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents',
    });
    this.renderItem = renderItem;
    this.onClick = onClick;
    this.removeFromRecent = removeFromRecent;
    this.list = Dom.element('ul', 'gl-mb-0 gl-pl-0');
    this.element.append(this.list);
  }

  render(items, recently, selected) {
    this.list.replaceChildren();
    if (recently.length) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong',
          children: 'Recently used',
        })
      );
      this.list.append(
        ...recently.map((item) => this.listItem(item, selected, true))
      );
    }
    if (items.length) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong gl-border-t',
        })
      );
      this.list.append(...items.map((item) => this.listItem(item, selected)));
    }
    if (items.length + recently.length === 0) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes: 'gl-p-4',
          children: 'No options',
        })
      );
    }
  }

  listItem(item, selected, removeItem = false) {
    return Dom.create({
      tag: 'li',
      classes: 'gl-new-dropdown-item',
      events: {
        click: () => this.onClick(item),
      },
      children: {
        tag: 'span',
        classes: 'gl-new-dropdown-item-content',
        children: [
          this.renderCheck(item, selected),
          this.renderItem(item),
          ...(removeItem ? [this.renderRemove(item)] : []),
        ],
      },
    });
  }

  renderCheck(item, selected) {
    const selectedIds = selected.map((i) => i.id);
    return new IconComponent(
      selectedIds.includes(item.id) ? 'mobile-issue-close' : ''
    );
  }

  renderRemove(item) {
    return new CloseButton((e) => {
      e.preventDefault();
      e.stopPropagation();
      this.removeFromRecent && this.removeFromRecent(item);
    }, 'Remove from recently used');
  }
};

// apps/gitlab-plus/src/components/common/form/DropdownButton.ts
var DropdownButton = class extends Component {
  constructor(renderLabel, setVisible, reset) {
    super('button', {
      classes:
        'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle',
      attrs: {
        type: 'button',
      },
      events: {
        click: () => setVisible(true),
      },
    });
    this.renderLabel = renderLabel;
    this.reset = reset;
    this.buttonLabel = Dom.element('span', 'gl-new-dropdown-button-text');
    this.icon = Dom.create({
      tag: 'span',
      children: [new IconComponent('chevron-lg-down', 's16').getElement()],
    });
    document.body.addEventListener('click', (e) => {
      if (e.target !== this.element && !this.element.contains(e.target)) {
        setVisible(false);
      }
    });
    this.element.append(this.buttonInner());
  }

  render(items) {
    this.buttonLabel.replaceChildren(this.renderLabel(items));
    const icon = new IconComponent(
      items.length ? 'close-xs' : 'chevron-lg-down',
      's16'
    ).getElement();
    if (items.length) {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        this.reset();
      });
    }
    this.icon.replaceChildren(icon);
  }

  buttonInner() {
    return Dom.create({
      tag: 'span',
      classes: 'gl-button-text gl-w-full',
      children: [this.buttonLabel, this.icon],
    });
  }
};

// apps/gitlab-plus/src/components/common/form/DropdownModal.ts
var DropdownModal = class extends Component {
  constructor(search, list) {
    super('div', {
      classes: 'gl-new-dropdown-panel gl-absolute',
      styles: {
        top: '100%',
        left: '0',
        width: '100%',
        maxWidth: '800px',
      },
      events: {
        click: (e) => e.stopPropagation(),
      },
      children: {
        tag: 'div',
        classes: 'gl-new-dropdown-inner',
        children: [search, list],
      },
    });
  }

  setVisible(visible) {
    if (visible) {
      this.element.classList.add('!gl-block');
    } else {
      this.element.classList.remove('!gl-block');
    }
  }
};

// apps/gitlab-plus/src/providers/RecentProvider.ts
var RecentProvider = class {
  constructor(key) {
    this.cache = new Cache('glp-');
    this.key = `recent-${key}`;
  }

  get() {
    return this.cache.get(this.key) || [];
  }

  add(...items) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      [...items, ...this.get().filter((el) => !itemsId.includes(el.id))],
      'lifetime'
    );
  }

  remove(...items) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      this.get().filter((el) => !itemsId.includes(el.id)),
      'lifetime'
    );
  }
};

// apps/gitlab-plus/src/components/common/form/Dropdown.ts
var Dropdown = class extends Field {
  constructor(title, key, isMultiselect = false) {
    const container = Dom.element(
      'div',
      'gl-relative gl-w-full gl-new-dropdown !gl-block'
    );
    super(title, container);
    this.isMultiselect = isMultiselect;
    this.value = [];
    this.items = [];
    this.recently = [];
    this.extra = Dom.element('div');
    this.recent = new RecentProvider(key);
    this.search = new DropdownSearch(this.load.bind(this));
    this.list = new DropdownList(
      this.renderItem.bind(this),
      this.onSelect.bind(this),
      this.removeFromRecent.bind(this)
    );
    this.modal = new DropdownModal(
      this.search.getElement(),
      this.list.getElement()
    );
    this.button = new DropdownButton(
      this.renderLabel.bind(this),
      this.modal.setVisible.bind(this.modal),
      this.reset.bind(this)
    );
    container.append(
      this.extra,
      this.button.getElement(),
      this.modal.getElement()
    );
    this.button.render(this.value);
    this.list.render(this.items, this.recently, this.value);
  }

  updateItems(items, search = '') {
    this.searchTerm = search;
    this.items = items;
    this.render();
  }

  onSelect(item) {
    if (this.isMultiselect) {
      if (this.value.find((i) => i.id === item.id)) {
        this.value = this.value.filter((i) => i.id !== item.id);
      } else {
        this.value.push(item);
      }
    } else {
      this.value = [item];
      this.modal.setVisible(false);
    }
    this.button.render(this.value);
    this.render();
    this.onChange();
  }

  reset() {
    this.value = [];
    this.button.render(this.value);
    this.render();
    this.onChange();
  }

  persistRecent() {
    this.recent.add(...this.value);
    this.render();
  }

  removeFromRecent(item) {
    this.recent.remove(item);
    this.render();
  }

  getValue() {
    return this.value;
  }

  render() {
    const recent = this.recent.get();
    const recentlyIds = recent.map((i) => i.id);
    const itemsIds = this.items.map((i) => i.id);
    const itemsToRender = this.items.filter((i) => !recentlyIds.includes(i.id));
    const recentItemsToRender = this.searchTerm.length
      ? recent.filter((i) => itemsIds.includes(i.id))
      : recent;
    this.list.render(itemsToRender, recentItemsToRender, this.value);
  }
};

// apps/gitlab-plus/src/providers/query/project.ts
var projectsQuery = `query boardsGetGroupProjects($fullPath: ID!, $search: String, $after: String) {
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
var ProjectsProvider = class extends GitlabProvider {
  async getProjects(projectId, search = '') {
    return this.queryCached(
      `projects-${projectId}-${search}`,
      projectsQuery,
      {
        fullPath: projectId,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormProject.ts
var FormProject = class extends Dropdown {
  constructor(link) {
    super('Project', 'projects');
    this.link = link;
    this.projects = new ProjectsProvider();
    this.load();
  }

  async load(search = '') {
    const projects = await this.projects.getProjects(
      this.link.workspacePath,
      search
    );
    this.updateItems(projects.data.group.projects.nodes, search);
  }

  renderItem(item) {
    const image = item.avatarUrl
      ? Dom.create({
          tag: 'img',
          attrs: {
            src: item.avatarUrl,
            alt: item.name,
          },
          classes: 'gl-mr-3 gl-avatar gl-avatar-s32',
        })
      : Dom.create({
          tag: 'div',
          classes:
            'gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s32 gl-avatar-identicon-bg1',
          children: item.name[0].toUpperCase(),
        });
    const label = Dom.create({
      tag: 'span',
      children: [
        { tag: 'span', classes: 'gl-mr-2 gl-block', children: item.name },
        {
          tag: 'span',
          classes: 'gl-block gl-text-secondary',
          children: item.nameWithNamespace,
        },
      ],
    });
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: [image, label],
        },
      ],
    });
  }

  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.nameWithNamespace : 'Select project',
    });
  }

  onChange() {}
};

// apps/gitlab-plus/src/providers/LabelsProvider.ts
var LabelsProvider = class extends GitlabProvider {
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
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormLabels.ts
var FormLabel = class extends Dropdown {
  constructor(link) {
    super('Labels', 'labels', true);
    this.link = link;
    this.labels = new LabelsProvider();
    this.extra.classList.add(
      'gl-mt-1',
      'gl-pb-2',
      'gl-flex',
      'gl-flex-wrap',
      'gl-gap-2'
    );
    this.load();
  }

  async load(search = '') {
    const labels = await this.labels.getLabels(this.link.projectPath, search);
    this.updateItems(labels.data.workspace.labels.nodes, search);
  }

  renderItem(item) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3',
      children: [
        {
          tag: 'span',
          classes: 'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0',
          styles: {
            backgroundColor: item.color,
          },
        },
        {
          tag: 'span',
          children: item.title,
        },
      ],
    });
  }

  renderLabel(items) {
    let label = 'Select label';
    if (items.length !== 0) {
      label = items
        .slice(0, 2)
        .map((i) => i.title)
        .join(', ');
    }
    if (items.length > 2) {
      label += `, ${items.length - 2}+`;
    }
    return Dom.create({
      tag: 'div',
      children: label,
    });
  }

  onChange() {
    this.extra.replaceChildren(
      ...this.value.map((item) =>
        new LabelComponent(item, () => this.onSelect(item)).getElement()
      )
    );
  }
};

// apps/gitlab-plus/src/providers/query/milestone.ts
var milestoneQuery = `query projectMilestones($fullPath: ID!, $title: String, $state: MilestoneStateEnum) {
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
var MilestonesProvider = class extends GitlabProvider {
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
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormMilestone.ts
var FormMilestone = class extends Dropdown {
  constructor(link) {
    super('Milestone', 'milestones');
    this.link = link;
    this.milestones = new MilestonesProvider();
    this.load();
  }

  async load(search = '') {
    const milestones = await this.milestones.getMilestones(
      this.link.projectPath,
      search
    );
    this.updateItems(milestones.data.workspace.attributes.nodes, search);
  }

  renderItem(item) {
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: {
            tag: 'span',
            classes: 'gl-mr-2 gl-block',
            children: item.title,
          },
        },
      ],
    });
  }

  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.title : 'Select milestone',
    });
  }

  onChange() {}
};

// apps/gitlab-plus/src/providers/query/iteration.ts
var iterationFragment = `fragment IterationFragment on Iteration {
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
var iterationQuery = `query issueIterationsAliased($fullPath: ID!, $title: String, $state: IterationState) {
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
var IterationsProvider = class extends GitlabProvider {
  async getIterations(projectId, title = '') {
    return this.queryCached(
      `iterations-${projectId} `,
      iterationQuery,
      {
        fullPath: projectId,
        title,
        state: 'opened',
      },
      title !== '' ? 0.5 : 20
    );
  }
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormIteration.ts
var FormIteration = class extends Dropdown {
  constructor(link) {
    super('Iteration', 'iterations');
    this.link = link;
    this.iterations = new IterationsProvider();
    this.load();
  }

  async load(search = '') {
    const response = await this.iterations.getIterations(
      this.link.workspacePath,
      search
    );
    const iterationsNamed = response.data.workspace.attributes.nodes
      .map((iteration) => ({
        ...iteration,
        name: this.iterationName(iteration),
      }))
      .toSorted((a, b) => a.name.localeCompare(b.name));
    this.updateItems(iterationsNamed, search);
  }

  iterationName(iteration) {
    const start = new Date(iteration.startDate).toLocaleDateString();
    const end = new Date(iteration.dueDate).toLocaleDateString();
    return `${iteration.iterationCadence.title}: ${start} - ${end}`;
  }

  renderItem(item) {
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: {
            tag: 'span',
            classes: 'gl-mr-2 gl-block',
            children: item.name,
          },
        },
      ],
    });
  }

  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.name : 'Select iteration',
    });
  }

  onChange() {}
};

// apps/gitlab-plus/src/providers/UsersProvider.ts
var UsersProvider = class extends GitlabProvider {
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
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormAssignees.ts
var FormAssignees = class extends Dropdown {
  constructor(link) {
    super('Assignees', 'assignees', true);
    this.link = link;
    this.assignees = new UsersProvider();
    this.load('');
  }

  async load(search) {
    const response = await this.assignees.getUsers(
      this.link.projectPath,
      search
    );
    this.updateItems(response.data.workspace.users, search);
  }

  renderItem(item) {
    const image = Dom.create({
      tag: 'img',
      classes: 'gl-avatar gl-avatar-circle gl-avatar-s32',
      attrs: { src: item.avatarUrl },
    });
    const label = Dom.create({
      tag: 'div',
      classes: 'gl-avatar-labeled-labels !gl-text-left',
      children: [
        {
          tag: 'div',
          classes:
            '-gl-mx-1 -gl-my-1 gl-flex gl-flex-wrap gl-items-center !gl-text-left',
          children: {
            tag: 'span',
            classes: 'gl-avatar-labeled-label',
            children: item.name,
          },
        },
        {
          tag: 'span',
          classes: 'gl-avatar-labeled-sublabel',
          children: item.username,
        },
      ],
    });
    return Dom.create({
      tag: 'span',
      classes:
        'gl-avatar-labeled sidebar-participant gl-relative gl-items-center gl-new-dropdown-item-text-wrapper',
      children: [image, label],
    });
  }

  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.name : 'Select assignee',
    });
  }

  onChange() {}
};

// apps/gitlab-plus/src/components/create-related-issue/form/FormRelation.ts
var FormRelation = class extends Field {
  constructor() {
    const container = Dom.element('div', 'linked-issue-type-radio');
    super('New issue', container);
    this.value = '';
    container.append(
      this.radio('blocks current issue', 'blocks'),
      this.radio('is blocked by current issue', 'is_blocked_by'),
      this.radio('relates to current issue', 'related')
    );
  }

  onChange(e) {
    this.value = e.target.value;
  }

  radio(label, value) {
    const id = `input-${Math.random()}`;
    return Dom.create({
      tag: 'div',
      classes: 'gl-form-radio custom-control custom-radio',
      children: [
        {
          tag: 'input',
          classes: 'custom-control-input',
          attrs: {
            id,
            name: 'linked-issue-type-radio',
            value,
            type: 'radio',
          },
          events: {
            change: this.onChange.bind(this),
          },
        },
        {
          tag: 'label',
          classes: 'custom-control-label',
          attrs: {
            for: id,
          },
          children: label,
        },
      ],
    });
  }

  reset() {
    this.value = '';
  }
};

// apps/gitlab-plus/src/components/create-related-issue/CreateRelatedIssueModalContent.ts
var CreateRelatedIssueModalContent = class extends Component {
  constructor(link, onClose) {
    super('form', {
      classes: 'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form',
    });
    this.link = link;
    this.onClose = onClose;
    this.issueProvider = new IssueProvider();
    this.title = new FormTitle();
    this.project = new FormProject(this.link);
    this.labels = new FormLabel(this.link);
    this.milestone = new FormMilestone(this.link);
    this.iteration = new FormIteration(this.link);
    this.assignees = new FormAssignees(this.link);
    this.relation = new FormRelation();
    this.element.append(
      this.title.getElement(),
      this.row([this.project, this.milestone]),
      this.row([this.iteration, this.assignees]),
      this.row(this.labels),
      this.row(this.relation),
      Dom.create({
        tag: 'button',
        classes: 'btn btn-confirm btn-sm gl-button',
        attrs: {
          type: 'button',
        },
        events: {
          click: this.createIssue.bind(this),
        },
        children: {
          tag: 'span',
          classes: 'gl-button-text',
          children: 'Add',
        },
      })
    );
  }

  row(items) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-gap-x-3',
      children: items,
    });
  }

  reset() {
    this.element.reset();
    this.title.reset();
    this.relation.reset();
    this.project.reset();
    this.milestone.reset();
    this.iteration.reset();
    this.assignees.reset();
    this.labels.reset();
  }

  async createIssue() {
    const data = this.getFormValue();
    const link = IssueLink.parseLink(window.location.href);
    if (!data || !link) {
      return;
    }
    const response = await this.issueProvider.createIssue(data);
    this.persistRecently();
    if (this.relation.value) {
      await this.issueProvider.createIssueRelation({
        issueId: response.data.createIssuable.issuable.iid,
        projectId: response.data.createIssuable.issuable.projectId,
        targetProjectId: link.projectPath.replace(/\//g, '%2F'),
        targetIssueIid: link.issue,
        linkType: this.relation.value,
      });
    }
    this.onClose();
    this.reset();
  }

  getFormValue() {
    const [project] = this.project.getValue();
    if (!project) {
      return;
    }
    const data = {
      title: this.title.value,
      projectPath: project.fullPath,
    };
    const [milestone] = this.milestone.getValue();
    if (milestone) {
      data['milestoneId'] = milestone.id;
    }
    const [iteration] = this.iteration.getValue();
    if (iteration) {
      data['iterationId'] = iteration.id;
      data['iterationCadenceId'] = iteration.iterationCadence.id;
    }
    const assignees = this.assignees.getValue();
    if (assignees) {
      data['assigneeIds'] = assignees.map((a) => a.id);
    }
    const labels = this.labels.getValue();
    data['labelIds'] = labels.map((label) => label.id);
    return data;
  }

  persistRecently() {
    this.project.persistRecent();
    this.milestone.persistRecent();
    this.iteration.persistRecent();
    this.assignees.persistRecent();
    this.labels.persistRecent();
  }
};

// apps/gitlab-plus/src/components/CreateRelatedIssueModal.ts
var CreateRelatedIssueModal = class extends Component {
  constructor() {
    const container = Dom.create({
      tag: 'div',
      classes:
        'glp-create-related-issue-modal crud gl-border gl-rounded-form gl-border-section gl-bg-subtle gl-mt-5',
    });
    super('div', {
      classes: 'glp-create-related-issue-layer',
      children: container,
    });
    this.visibleClassName = 'glp-modal-visible';
    const link = IssueLink.parseLink(window.location.href);
    if (link) {
      const form = new CreateRelatedIssueModalContent(
        link,
        this.hide.bind(this)
      );
      container.append(
        new CreateRelatedIssueModalHeader(() => {
          this.hide();
          form.reset();
        }).getElement(),
        form.getElement()
      );
    }
  }

  init() {
    this.mount(document.body);
  }

  show() {
    this.element.classList.add(this.visibleClassName);
  }

  hide() {
    this.element.classList.remove(this.visibleClassName);
  }
};

// apps/gitlab-plus/src/components/create-related-issue/CreateButton.ts
var CreateButton = class extends Component {
  constructor() {
    super('button', {
      classes: 'btn btn-default btn-sm gl-button',
      attrs: {
        type: 'button',
      },
      children: {
        tag: 'span',
        classes: 'gl-button-text',
        children: 'Create related issue',
      },
    });
  }

  init() {
    const parent = document.querySelector(
      '#related-issues [data-testid="crud-actions"]'
    );
    if (parent && !this.element.parentNode) {
      this.mount(parent);
    }
  }
};

// apps/gitlab-plus/src/services/CreateRelatedIssue.ts
var CreateRelatedIssue = class {
  constructor() {
    this.modal = new CreateRelatedIssueModal();
    this.addButton = new CreateButton();
  }

  init() {
    this.modal.init();
    this.addButton.event('click', this.modal.show.bind(this.modal));
    this.mountButton();
  }

  mountButton() {
    setTimeout(this.addButton.init.bind(this.addButton), 1e3);
    setTimeout(this.addButton.init.bind(this.addButton), 3e3);
  }
};

// apps/gitlab-plus/src/components/related-issue-autocomplete/AutocompleteModal.ts
var AutocompleteModal = class extends Component {
  constructor(onSelect, renderItem, search) {
    super('div', {
      classes: 'gl-relative gl-w-full gl-new-dropdown !gl-block',
    });
    const modalSearch = new DropdownSearch(search);
    this.list = new DropdownList(renderItem, onSelect);
    this.modal = new DropdownModal(
      modalSearch.getElement(),
      this.list.getElement()
    );
    this.element.append(this.modal.getElement());
    this.updateItems([]);
  }

  updateItems(items) {
    this.list.render(items, [], []);
  }

  setVisible(visible) {
    this.modal.setVisible(visible);
  }
};

// apps/gitlab-plus/src/components/RelatedIssuesAutocompleteModal.ts
var RelatedIssuesAutocompleteModal = class {
  constructor() {
    this.readyClass = 'glp-input-ready';
    this.input = Dom.element('input');
    this.issueProvider = new IssueProvider();
    this.search = debounce(this.load.bind(this));
    this.link = IssueLink.parseLink(window.location.href);
    this.autocompleteModal = new AutocompleteModal(
      this.onSelect.bind(this),
      this.renderItem.bind(this),
      this.search.bind(this)
    );
    document.body.addEventListener('click', (e) => {
      if (e.target !== this.input && !this.input.contains(e.target)) {
        this.autocompleteModal.setVisible(false);
      }
    });
  }

  init(input) {
    if (this.isMounted(input)) {
      return;
    }
    const container = input.closest('.add-issuable-form-input-wrapper');
    if (!container) {
      return;
    }
    this.autocompleteModal.mount(container);
    this.input = input;
    this.input.classList.add(this.readyClass);
    this.input.addEventListener('focus', this.show.bind(this));
  }

  isMounted(input) {
    return input.classList.contains(this.readyClass);
  }

  show() {
    this.autocompleteModal.setVisible(true);
    this.search('');
  }

  async load(term = '') {
    if (!this.link) {
      return;
    }
    const response = await this.issueProvider.getIssues(
      this.link.workspacePath,
      term
    );
    this.autocompleteModal.updateItems([
      ...(response.data.workspace.workItems?.nodes || []),
      ...(response.data.workspace.workItemsByIid?.nodes || []),
      ...(response.data.workspace.workItemsEmpty?.nodes || []),
    ]);
  }

  onSelect(item) {
    this.input.value = `${item.project.fullPath}#${item.iid} `;
    this.input.dispatchEvent(new Event('input'));
    this.input.dispatchEvent(new Event('change'));
    this.autocompleteModal.setVisible(false);
  }

  renderItem(item) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-gap-x-2 gl-py-2',
      children: [
        new IconComponent('issue-type-issue', 's16'),
        { tag: 'small', children: item.iid },
        { tag: 'span', classes: 'gl-flex gl-flex-wrap', children: item.title },
      ],
    });
  }
};

// apps/gitlab-plus/src/services/RelatedIssueAutocomplete.ts
var RelatedIssueAutocomplete = class {
  constructor() {
    this.modal = new RelatedIssuesAutocompleteModal();
    this.ready = false;
  }

  init() {
    this.initObserver();
    window.setTimeout(this.initObserver.bind(this), 1e3);
    window.setTimeout(this.initObserver.bind(this), 3e3);
    window.setTimeout(this.initObserver.bind(this), 5e3);
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

  initAutocomplete(section) {
    const input = section.querySelector('#add-related-issues-form-input');
    if (input) {
      this.modal.init(input);
    }
  }
};

// apps/gitlab-plus/src/services/ClearCacheService.ts
var ClearCacheService = class {
  constructor() {
    this.cache = new Cache('glp-');
  }

  init() {
    this.cache.clearInvalid();
    window.setInterval(this.cache.clearInvalid.bind(this.cache), 60 * 1e3);
  }
};

// apps/gitlab-plus/src/main.ts
[
  ClearCacheService,
  ImagePreview,
  IssuePreview,
  CreateRelatedIssue,
  RelatedIssueAutocomplete,
  // SortIssue,
].forEach((Service) => new Service().init());
