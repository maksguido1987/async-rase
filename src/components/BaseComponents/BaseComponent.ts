export class BaseComponent {
  readonly node: HTMLElement;

  constructor(parentNode: HTMLElement, tag: string = 'div', styles: string[] = [], content = '') {
    this.node = document.createElement(tag);
    this.node.classList.add(...styles);
    this.node.innerHTML = content;
    if (parentNode) parentNode.append(this.node);
  }

  addAttribute(attr: string, value: string): void {
    this.node.setAttribute(attr, value);
  }

  hideElement(): void {
    this.node.classList.add('hide');
  }

  showElement(): void {
    this.node.classList.remove('hide');
  }
}
