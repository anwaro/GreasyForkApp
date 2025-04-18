import { ComponentChild, render } from 'preact';

import { GitlabLink } from './LinkParser';

type PlaceMode = 'after' | 'append' | 'before' | 'prepend';

type Renderer = (() => ComponentChild) | ComponentChild;

export class RendererHelper {
  static mountPoint(mountPoint: HTMLElement | string) {
    return mountPoint instanceof HTMLElement
      ? mountPoint
      : document.querySelector<HTMLElement>(mountPoint);
  }

  static pageLink<Link extends GitlabLink>(
    linkParser: (link: string) => Link | undefined
  ) {
    return linkParser(window.location.href);
  }

  static render(
    id: string,
    mountPoint: HTMLElement | string,
    renderer: Renderer,
    mode: PlaceMode = 'append'
  ) {
    const node = RendererHelper.mountPoint(mountPoint);
    if (!node) {
      return false;
    }

    return RendererHelper.renderInNode(
      RendererHelper.root(id, node, mode),
      renderer
    );
  }

  static renderInBody(id: string, renderer: Renderer) {
    return RendererHelper.renderInNode(
      RendererHelper.root(id, document.body),
      renderer
    );
  }

  static renderInNode(node: HTMLElement, renderer: Renderer) {
    render(renderer instanceof Function ? renderer() : renderer, node);
    return true;
  }

  static renderWithLink<Link extends GitlabLink>(
    id: string,
    mountPoint: HTMLElement | string,
    linkParser: (link: string) => Link | undefined,
    renderer: (link: Link) => ComponentChild,
    mode: PlaceMode = 'append'
  ) {
    const link = RendererHelper.pageLink(linkParser);

    if (!link) {
      return false;
    }

    return RendererHelper.render(id, mountPoint, () => renderer(link), mode);
  }

  static root(
    className: string,
    node?: HTMLElement,
    mode: PlaceMode = 'append'
  ) {
    const root = document.createElement('div');
    root.className = className;
    if (node) {
      node[mode](root);
    }
    return root;
  }
}
