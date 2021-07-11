interface CompressedImage extends Blob {
  name: string;
}

interface CompressedImages {
  [ fileName: string ]: CompressedImage;
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

declare module '*.jpg'