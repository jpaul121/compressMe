interface ImageFile extends Blob {
  name: string;
  objectURL: string;
}

interface ImageFiles {
  [ fileName: string ]: ImageFile;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

declare module '*.jpg'