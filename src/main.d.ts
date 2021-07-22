interface ImageFile extends Blob {
  compressedSize: number;
  fileExtension: string;
  name: string;
  originalSize: number;
  referenceName: string;
  wasCompressed?: boolean;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

declare module '*.jpg'