export class BaseInput {
  readonly input: HTMLInputElement;

  constructor(parentNode: HTMLElement, styles: string[], placeholder: string, type: string) {
    this.input = document.createElement('input');
    this.input.setAttribute('type', type);
    this.input.placeholder = placeholder;
    this.input.classList.add(...styles);
    if (parentNode) parentNode.append(this.input);
  }

  getInputValue(): string {
    return this.input.value;
  }

  setDisableElement(value: string): void {
    this.input.setAttribute('disabled', value);
  }

  removeDisableElement(): void {
    this.input.removeAttribute('disabled');
  }
}
