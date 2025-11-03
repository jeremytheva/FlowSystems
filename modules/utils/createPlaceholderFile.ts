const encoder = new TextEncoder();

export function createPlaceholderFile(
  filename: string,
  content: string,
  mimeType: string,
): File {
  if (typeof File !== "undefined") {
    return new File([content], filename, { type: mimeType });
  }

  const bytes = encoder.encode(content);

  const fallbackStream: ReadableStream<Uint8Array> =
    typeof ReadableStream !== "undefined"
      ? new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(bytes);
            controller.close();
          },
        })
      : ({
          async cancel() {
            return undefined;
          },
          getReader() {
            return {
              async cancel() {
                return undefined;
              },
              async read() {
                return { done: true, value: undefined } as const;
              },
              releaseLock() {
                return undefined;
              },
            };
          },
          locked: false,
          [Symbol.asyncIterator]: async function* () {
            yield bytes;
          },
        } as unknown as ReadableStream<Uint8Array>);

  return {
    name: filename,
    size: bytes.byteLength,
    type: mimeType,
    arrayBuffer: async () => bytes.buffer,
    slice: () => createPlaceholderFile(filename, content, mimeType),
    stream: () => fallbackStream,
    text: async () => content,
    lastModified: Date.now(),
    webkitRelativePath: "",
    [Symbol.toStringTag]: "File",
  } as unknown as File;
}
