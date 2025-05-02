let chunks:any = [];
let startTime:any;
let fileSize;
let chunkSize = 16000;
let currentChunk = 0;
let totalChunks:any;
let currentProgress = 0;
let prevProgress = 0;
let fileType = "application/octet-stream"; // Default MIME type

self.addEventListener("message", (event) => {
  if (event.data.status === "fileInfo") {
    fileSize = event.data.fileSize;
    // Save the file type if provided
    if (event.data.fileType) {
      fileType = event.data.fileType;
    }
    totalChunks = Math.ceil(fileSize / chunkSize);
    // Reset chunks array when starting a new file
    chunks = [];
    currentChunk = 0;
    startTime = null;
    prevProgress = 0;
  } else if (event.data === "download") {
    // Create blob with the correct MIME type
    const blob = new Blob(chunks, { type: fileType });
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    // Sending both the blob and the elapsed time to the main thread
    self.postMessage({
      blob: blob,
      timeTaken: elapsedTime,
    });

    // Reset chunks and currentChunk for future data chunks
    chunks = [];
    currentChunk = 0;
  } else {
    // If this is the first event, start the timer
    if (!startTime) {
      startTime = performance.now();
    }

    // Append data to the chunks array
    chunks.push(new Uint8Array(event.data));

    // Calculate progress and send it to the main thread
    currentChunk++;
    const progress = (currentChunk / totalChunks) * 100;

    // To reduce the frequency of progress updates, only send updates when there's a significant change
    const roundedProgress = Math.floor(progress);
    if (roundedProgress !== prevProgress) {
      prevProgress = roundedProgress;
      self.postMessage({
        progress: prevProgress,
      });
    }
  }
});
